import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Validate URL to prevent SSRF attacks
    const targetUrl = new URL(url)
    const allowedHosts = [
      'www.ussugar.com',
      'www.dwmco.com', 
      'www.agweek.com',
      'www.ragus.co.uk',
      'feeds.feedburner.com',
      'rss.cnn.com'
    ]

    if (!allowedHosts.some(host => targetUrl.hostname === host || targetUrl.hostname.endsWith('.' + host))) {
      return NextResponse.json({ error: 'URL not allowed' }, { status: 403 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'KSB-NewsReader/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const xmlText = await response.text()
    
    return new NextResponse(xmlText, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('RSS Proxy Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch RSS feed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
