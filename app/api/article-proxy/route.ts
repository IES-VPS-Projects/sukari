import { NextRequest, NextResponse } from 'next/server'

// Ensure this runs in Node.js runtime, not Edge runtime
export const runtime = 'nodejs'

// Dynamic import for cheerio to avoid build-time issues
const loadCheerio = async () => {
  const cheerio = await import('cheerio')
  return cheerio.load
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Validate URL to prevent SSRF attacks
    const targetUrl = new URL(url)
    const allowedDomains = [
      'ussugar.com',
      'dwmco.com',
      'agweek.com', 
      'ragus.co.uk',
      'sugarjournal.com',
      'sugarcaneworld.com'
    ]

    if (!allowedDomains.some(domain => 
      targetUrl.hostname === domain || 
      targetUrl.hostname === 'www.' + domain ||
      targetUrl.hostname.endsWith('.' + domain)
    )) {
      return NextResponse.json({ error: 'URL not allowed' }, { status: 403 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const load = await loadCheerio()
    const $ = load(html)

    // Extract main content using common selectors
    let content = ''
    let imageUrl = ''

    // Try to find main content
    const contentSelectors = [
      'article',
      '.entry-content',
      '.post-content', 
      '.content',
      '.main-content',
      '.article-content',
      '.post-body',
      '.entry',
      'main',
      '#content'
    ]

    for (const selector of contentSelectors) {
      const element = $(selector).first()
      if (element.length > 0) {
        // Remove unwanted elements but keep the main content structure
        element.find('script, style, nav, aside, footer, .comments, .sidebar, .advertisement, .ad, .widget').remove()
        
        // Enhanced content extraction that preserves text around images
        let extractedContent = ''
        
        // Check if this is a ragus.co.uk site (known to have images interrupting text)
        const isRagusSite = url.includes('ragus.co.uk')
        
        if (isRagusSite) {
          // Special handling for ragus.co.uk - extract all text content and ignore images
          element.find('p, div, span, h1, h2, h3, h4, h5, h6').each((_: number, elem: any) => {
            const text = $(elem).text().trim()
            if (text.length > 20) { // Only include substantial text
              extractedContent += text + '\n\n'
            }
          })
        } else if (url.includes('ussugar.com')) {
          // Special handling for US Sugar - text only, no inline image processing
          extractedContent = element.clone()
            .find('img, picture, figure, video, iframe')
            .remove()
            .end()
            .text()
            .trim()
        } else if (url.includes('dwmco.com')) {
          // Special handling for DWM Co - more aggressive content extraction
          // Remove images and get all text content, including from nested elements
          element.find('img, picture, figure, video, iframe, .image-container, .photo').remove()
          
          // Extract text from all meaningful elements
          const meaningfulElements = element.find('p, div:not(.sidebar):not(.widget), article, section, .content, .text')
          
          meaningfulElements.each((_: number, elem: any) => {
            const text = $(elem).text().trim()
            if (text.length > 30 && !text.match(/^(image|photo|click|download|share)/i)) {
              extractedContent += text + '\n\n'
            }
          })
          
          // Fallback: if no content found, get all text
          if (extractedContent.length < 100) {
            extractedContent = element.text().trim()
          }
        } else {
          // Default handling for other sites
          extractedContent = element.text().trim()
        }
        
        if (extractedContent.length > 100) {
          content = extractedContent
          break
        }
      }
    }

    // Fallback to body content if no specific content area found
    if (!content || content.length < 100) {
      $('script, style, nav, aside, footer, header, .navigation, .menu').remove()
      content = $('body').text().trim()
    }

    // Clean up content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n') // Clean up line breaks
      .trim()

    // Limit content length
    if (content.length > 5000) {
      content = content.substring(0, 5000) + '...'
    }

    // Try to find a featured image
    const imageSelectors = [
      '.featured-image img',
      '.post-thumbnail img',
      '.article-image img',
      'article img',
      '.entry-content img',
      '.wp-post-image'
    ]

    for (const selector of imageSelectors) {
      const img = $(selector).first()
      if (img.length > 0) {
        const src = img.attr('src')
        if (src) {
          // Convert relative URLs to absolute
          imageUrl = new URL(src, url).href
          break
        }
      }
    }

    // Also check meta tags for images
    if (!imageUrl) {
      const ogImage = $('meta[property="og:image"]').attr('content')
      const twitterImage = $('meta[name="twitter:image"]').attr('content')
      
      if (ogImage) {
        imageUrl = new URL(ogImage, url).href
      } else if (twitterImage) {
        imageUrl = new URL(twitterImage, url).href
      }
    }

    return NextResponse.json({
      content: content || 'Content could not be extracted from this article.',
      imageUrl: imageUrl || undefined
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    })

  } catch (error) {
    console.error('Article Proxy Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch article content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
