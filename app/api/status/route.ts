import { NextRequest } from 'next/server'
import { blogDb } from '@/lib/database'
import { validateAuth, createSuccessResponse } from '@/lib/auth'

// GET /api/status - Get API status and blog statistics
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = validateAuth(request)

    // Basic statistics
    const stats = {
      timestamp: new Date().toISOString(),
      authenticated: isAuthenticated,
      database: 'connected',
      blog: {
        totalPosts: 0,
        publishedPosts: 0,
        featuredPosts: 0,
        totalTags: 0,
      },
    }

    // Get blog statistics
    try {
      const allPosts = await blogDb.getAllPosts()
      const publishedPosts = await blogDb.getPublishedPosts()
      const featuredPosts = await blogDb.getFeaturedPosts()
      const allTags = await blogDb.getAllTags()

      stats.blog = {
        totalPosts: allPosts.length,
        publishedPosts: publishedPosts.length,
        featuredPosts: featuredPosts.length,
        totalTags: allTags.length,
      }
    } catch (error) {
      stats.database = 'error'
      console.error('Database error in status check:', error)
    }

    return createSuccessResponse(stats)
  } catch (error) {
    console.error('Error in status endpoint:', error)
    return createSuccessResponse(
      {
        timestamp: new Date().toISOString(),
        authenticated: false,
        database: 'error',
        error: 'Failed to get status',
      },
      500
    )
  }
}
