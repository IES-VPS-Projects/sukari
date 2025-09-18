// RSS Service for fetching sugar industry and agricultural news
export interface RSSArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  link: string;
  pubDate: string;
  imageUrl?: string;
  category: string;
  source: string;
}

export interface RSSCategory {
  name: string;
  count: number;
  articles: RSSArticle[];
}

class RSSService {
  private readonly RSS_FEEDS = [
    {
      url: 'https://www.ussugar.com/feed/',
      source: 'US Sugar',
      category: 'Sugar Industry'
    },
    {
      url: 'https://www.dwmco.com/feed/',
      source: 'DWM Co',
      category: 'Sugar Industry'
    },
    {
      url: 'https://www.agweek.com/news/sugarbeet.rss',
      source: 'AgWeek',
      category: 'Sugar Industry'
    },
    {
      url: 'https://www.ragus.co.uk/feed/',
      source: 'Ragus',
      category: 'Sugar Processing'
    }
  ];

  private readonly SUGAR_KEYWORDS = [
    'sugar', 'sucrose', 'sugarbeet', 'sugar beet', 'cane', 'sugarcane',
    'sweetener', 'refinery', 'processing', 'milling', 'agriculture',
    'agricultural', 'farming', 'harvest', 'production', 'crop',
    'manufacturing', 'factory', 'mill', 'extraction', 'crystallization',
    'molasses', 'bagasse', 'plantation', 'cultivation', 'yield'
  ];

  // Mapping specific article titles to their corresponding images
  private readonly ARTICLE_IMAGE_MAPPING: { [key: string]: string } = {
    'Sugar Production Reaches Record High': '/images/sugar-production-high.jpg',
    'Sustainable Farming Practices in Sugar Industry': '/images/sustainable-farming.jpg',
    'Sugar Beet Harvest Shows Strong Yields': '/images/sugar-beet-harvest.jpg',
    'Advanced Processing Technology Improves Efficiency': '/images/processing-technology.jpg',
    'Market Trends in Global Sugar Trade': '/images/global-sugar-trade.jpg',
    'Environmental Impact of Sugar Manufacturing': '/images/environmental-impact.jpg',
    'Quality Standards in Sugar Production': '/images/quality-standards.jpg'
  };

  // Find matching image for article title (fuzzy matching)
  private findImageForArticle(title: string): string | null {
    // First try exact match
    if (this.ARTICLE_IMAGE_MAPPING[title]) {
      return this.ARTICLE_IMAGE_MAPPING[title];
    }

    // Try fuzzy matching for partial titles
    for (const [mappedTitle, imagePath] of Object.entries(this.ARTICLE_IMAGE_MAPPING)) {
      // Check if the article title contains key words from the mapped title
      const mappedWords = mappedTitle.toLowerCase().split(' ').filter(word => word.length > 3);
      const titleWords = title.toLowerCase();
      
      // If at least 60% of key words match, use this image
      const matchingWords = mappedWords.filter(word => titleWords.includes(word));
      if (matchingWords.length >= Math.ceil(mappedWords.length * 0.6)) {
        return imagePath;
      }
    }

    return null;
  }

  // Parse RSS XML to extract articles
  private parseRSS(xmlText: string, source: string, category: string): RSSArticle[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const articles: RSSArticle[] = [];

    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
      
      // Extract image from various sources
      let imageUrl = this.extractImageFromItem(item, description) || '/images/loading.gif';
      
      // Check for specific article image mapping first
      const mappedImage = this.findImageForArticle(this.cleanText(title));
      if (mappedImage) {
        imageUrl = mappedImage;
      }
      
      // Check if content is sugar/agriculture related
      if (this.isSugarContent(title, description)) {
        articles.push({
          id: `${source}-${index}-${Date.now()}`,
          title: this.cleanText(title),
          description: this.cleanText(description),
          content: this.cleanText(description), // Will be enhanced with full content
          link,
          pubDate,
          imageUrl,
          category,
          source
        });
      }
    });

    return articles;
  }

  // Enhanced image extraction from RSS item
  private extractImageFromItem(item: Element, description: string): string | null {
    // Try to get image from media:content or enclosure
    const mediaContent = item.querySelector('media\\:content, content');
    if (mediaContent) {
      const url = mediaContent.getAttribute('url');
      if (url && this.isValidImageUrl(url)) {
        return url;
      }
    }

    // Try enclosure for image
    const enclosure = item.querySelector('enclosure');
    if (enclosure) {
      const type = enclosure.getAttribute('type');
      const url = enclosure.getAttribute('url');
      if (type?.startsWith('image/') && url) {
        return url;
      }
    }

    // Try to extract from description HTML
    return this.extractImageFromDescription(description);
  }

  // Check if URL is a valid image
  private isValidImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowercaseUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowercaseUrl.includes(ext)) || 
           lowercaseUrl.includes('image') || 
           lowercaseUrl.includes('photo');
  }

  // Check if content is sugar/agriculture related
  private isSugarContent(title: string, description: string): boolean {
    const content = (title + ' ' + description).toLowerCase();
    return this.SUGAR_KEYWORDS.some(keyword => content.includes(keyword));
  }

  // Extract image URL from description HTML
  private extractImageFromDescription(description: string): string | null {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
    const match = description.match(imgRegex);
    return match ? match[1] : null;
  }

  // Clean HTML tags and decode entities
  private cleanText(text: string): string {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent || div.innerText || '';
  }

  // Fetch full article content from URL
  async fetchFullArticle(url: string): Promise<{ content: string; imageUrl?: string }> {
    try {
      const response = await fetch(`/api/article-proxy?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        content: data.content || 'Full article content not available.',
        imageUrl: data.imageUrl
      };
    } catch (error) {
      console.error('Failed to fetch full article:', error);
      return {
        content: 'Unable to load full article content. Please try the original link.',
        imageUrl: undefined
      };
    }
  }

  // Fetch articles from all RSS feeds
  async fetchAllArticles(): Promise<RSSCategory[]> {
    const categories: { [key: string]: RSSArticle[] } = {};

    try {
      const fetchPromises = this.RSS_FEEDS.map(async (feed) => {
        try {
          // Use our backend API to fetch RSS feeds (avoids CORS issues)
          const response = await fetch(`/api/rss-proxy?url=${encodeURIComponent(feed.url)}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const xmlText = await response.text();
          return this.parseRSS(xmlText, feed.source, feed.category);
        } catch (error) {
          console.error(`Failed to fetch from ${feed.source}:`, error);
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      const allArticles = results.flat();
      
      // If no articles were fetched, return mock data
      if (allArticles.length === 0) {
        console.log('No RSS articles fetched, using mock data');
        return this.getMockData();
      }
      
      // Group by category
      allArticles.forEach(article => {
        if (!categories[article.category]) {
          categories[article.category] = [];
        }
        categories[article.category].push(article);
      });

      // Convert to RSSCategory format
      const fetchedCategories = Object.entries(categories).map(([name, articles]) => ({
        name,
        count: articles.length,
        articles: articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      }));

      // If we have some data, return it, otherwise return mock data
      return fetchedCategories.length > 0 ? fetchedCategories : this.getMockData();

    } catch (error) {
      console.error('Failed to fetch RSS articles:', error);
      return this.getMockData(); // Fallback to mock data
    }
  }

  // Mock data for development/fallback - customized for sugar industry
  private getMockData(): RSSCategory[] {
    return [
      {
        name: 'Sugar Industry',
        count: 8,
        articles: [
          {
            id: 'mock-1',
            title: 'Sugar Production Reaches Record High in East Africa',
            description: 'Regional sugar mills report unprecedented production levels driven by improved farming techniques, favorable weather conditions, and modernized processing facilities.',
            content: 'Sugar production across East Africa has reached record-breaking levels this season, with multiple factors contributing to this remarkable achievement. Advanced agricultural practices, including precision farming and optimized irrigation systems, have significantly improved crop yields across major sugar-producing regions.\n\nModern processing facilities equipped with state-of-the-art extraction and refining technology have maximized sugar recovery rates, ensuring minimal waste and optimal product quality. The implementation of sustainable farming practices has also contributed to long-term soil health and productivity.\n\nMarket analysts project continued growth in the sector, supported by increasing domestic demand and expanding export opportunities. The success demonstrates the potential for agricultural excellence when traditional knowledge combines with modern technology.',
            link: '#',
            pubDate: new Date().toISOString(),
            imageUrl: '/images/sugar-production.jpg',
            category: 'Sugar Industry',
            source: 'Sugar Industry Weekly'
          },
          {
            id: 'mock-2',
            title: 'Sustainable Farming Practices Transform Sugar Industry',
            description: 'Leading sugar producers adopt environmentally friendly cultivation methods that reduce water usage while maintaining high yield standards.',
            content: 'The sugar industry is experiencing a transformation through the adoption of sustainable farming practices that prioritize environmental stewardship while maintaining production efficiency. Water conservation techniques, including drip irrigation and rainwater harvesting, have reduced consumption by up to 30% in participating farms.\n\nSoil health initiatives focus on organic matter enhancement and reduced chemical inputs, resulting in improved long-term productivity. Integrated pest management systems minimize environmental impact while protecting crops from damage.\n\nThese sustainable approaches are attracting premium market prices and opening new export opportunities with environmentally conscious buyers. The industry\'s commitment to sustainability positions it well for future growth in global markets.',
            link: '#',
            pubDate: new Date(Date.now() - 86400000).toISOString(),
            imageUrl: '/images/sustainable-farming.jpg',
            category: 'Sustainability',
            source: 'Agricultural Innovation'
          },
          {
            id: 'mock-3',
            title: 'Advanced Processing Technology Improves Sugar Quality',
            description: 'New crystallization and refining technologies enable production of premium-grade sugar products for specialized markets.',
            content: 'Revolutionary processing technologies are enabling sugar mills to produce high-quality products that meet the demanding specifications of premium markets. Advanced crystallization control systems ensure consistent crystal size and purity levels that exceed international standards.\n\nAutomated quality monitoring systems provide real-time feedback on sugar characteristics, allowing for immediate process adjustments to maintain optimal product specifications. These technological advances have opened opportunities in high-value market segments.\n\nThe investment in modern equipment demonstrates the industry\'s commitment to quality excellence and competitive positioning in global markets.',
            link: '#',
            pubDate: new Date(Date.now() - 172800000).toISOString(),
            imageUrl: '/images/processing-technology.jpg',
            category: 'Technology',
            source: 'Processing Technology Today'
          },
          {
            id: 'mock-4',
            title: 'Global Sugar Market Shows Strong Growth Potential',
            description: 'International trade analysis reveals expanding opportunities for African sugar producers in emerging markets.',
            content: 'Comprehensive market analysis indicates significant growth potential for African sugar producers in international markets. Emerging economies show increasing demand for high-quality sugar products, creating new export opportunities for regional producers.\n\nTrade agreements and improved logistics infrastructure are facilitating market access and reducing export costs. Quality certifications and compliance with international standards have enhanced the competitiveness of African sugar in global markets.\n\nIndustry experts predict continued expansion in export volumes, driven by competitive pricing and reliable supply capabilities.',
            link: '#',
            pubDate: new Date(Date.now() - 259200000).toISOString(),
            imageUrl: '/images/global-trade.jpg',
            category: 'Market Trends',
            source: 'Global Trade Analysis'
          }
        ]
      },
      {
        name: 'Market Trends',
        count: 2,
        articles: [
          {
            id: 'mock-5',
            title: 'Premium Sugar Products Command Higher Prices',
            description: 'Specialty sugar grades and organic products achieve premium pricing in international markets.',
            content: 'Premium sugar products, including organic and specialty grades, are commanding significantly higher prices in international markets. Consumer demand for natural and sustainably produced sweeteners continues to drive market growth in these segments. Quality certifications and traceability systems enhance product value and market acceptance.',
            link: '#',
            pubDate: new Date(Date.now() - 604800000).toISOString(),
            imageUrl: '/images/premium-sugar.jpg',
            category: 'Market Trends',
            source: 'Market Intelligence'
          },
          {
            id: 'mock-6',
            title: 'Sugar Industry Investment Opportunities Emerge',
            description: 'Financial analysts identify attractive investment prospects in sugar processing and infrastructure development.',
            content: 'Investment opportunities in the sugar industry are attracting significant interest from financial markets, with particular focus on processing facility upgrades and infrastructure development. Modern equipment and technology investments offer strong returns through improved efficiency and product quality. Strategic partnerships between producers and investors are facilitating industry modernization.',
            link: '#',
            pubDate: new Date(Date.now() - 691200000).toISOString(),
            imageUrl: '/images/investment.jpg',
            category: 'Investment',
            source: 'Financial Markets Weekly'
          }
        ]
      }
    ];
  }
}

export const rssService = new RSSService();
