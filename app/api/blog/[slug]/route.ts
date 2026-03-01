import { NextRequest } from 'next/server'
import { blogDb } from '@/lib/database'
import {
  validateAuth,
  createAuthResponse,
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/auth'
import { generateSlug, estimateReadingTime } from '@/lib/mdx-utils'
import { validateBlogPost } from '@/lib/validation'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// GET /api/blog/[slug] - Get a specific post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const post = await blogDb.getPostBySlug(slug)

    if (!post) {
      return createErrorResponse('Post not found', 404)
    }

    // If post is not published, require authentication
    if (!post.published && !validateAuth(request)) {
      return createAuthResponse()
    }

    return createSuccessResponse({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return createErrorResponse('Failed to fetch post', 500)
  }
}

// PUT /api/blog/[slug] - Update a specific post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!validateAuth(request)) {
    return createAuthResponse()
  }

  try {
    const { slug } = await params
    const body = await request.json()

    // Validate input
    const validation = validateBlogPost(body, true)
    if (!validation.valid) {
      return createErrorResponse(
        validation.errors.map(e => e.message).join('; ')
      )
    }

    // Check if post exists
    const existingPost = await blogDb.getPostBySlug(slug)
    if (!existingPost) {
      return createErrorResponse('Post not found', 404)
    }

    // Prepare update data
    const updateData: any = {}

    if (body.title !== undefined) {
      updateData.title = body.title
      // Update slug if title changed and no custom slug provided
      if (!body.slug && body.title !== existingPost.title) {
        updateData.slug = generateSlug(body.title)
      }
    }

    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.description !== undefined)
      updateData.description = body.description
    if (body.content !== undefined) {
      updateData.content = body.content
      updateData.reading_time = estimateReadingTime(body.content)
    }
    if (body.featured !== undefined) updateData.featured = body.featured
    if (body.published !== undefined) {
      updateData.published = body.published
      // Set published_at if publishing for the first time
      if (body.published && !existingPost.published_at) {
        updateData.published_at = new Date().toISOString()
      }
    }
    if (body.published_at !== undefined)
      updateData.published_at = body.published_at
    if (body.cover_image !== undefined)
      updateData.cover_image = body.cover_image
    if (body.author !== undefined) updateData.author = body.author
    if (body.tags !== undefined) updateData.tags = body.tags

    // Update the post
    await blogDb.updatePost(existingPost.id, updateData)

    // Get the updated post
    const finalSlug = updateData.slug || slug
    const updatedPost = await blogDb.getPostBySlug(finalSlug)

    return createSuccessResponse({
      message: 'Post updated successfully',
      post: updatedPost,
    })
  } catch (error) {
    console.error('Error updating post:', error)
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed')
    ) {
      return createErrorResponse('A post with this slug already exists')
    }
    return createErrorResponse('Failed to update post', 500)
  }
}

// DELETE /api/blog/[slug] - Delete a specific post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!validateAuth(request)) {
    return createAuthResponse()
  }

  try {
    const { slug } = await params

    // Check if post exists
    const existingPost = await blogDb.getPostBySlug(slug)
    if (!existingPost) {
      return createErrorResponse('Post not found', 404)
    }

    // Delete the post
    await blogDb.deletePost(existingPost.id)

    return createSuccessResponse({
      message: 'Post deleted successfully',
      deletedPost: {
        id: existingPost.id,
        slug: existingPost.slug,
        title: existingPost.title,
      },
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return createErrorResponse('Failed to delete post', 500)
  }
}
