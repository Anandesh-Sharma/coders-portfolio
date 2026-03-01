import { NextRequest } from 'next/server'
import { blogDb } from '@/lib/database'
import {
  validateAuth,
  createAuthResponse,
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/auth'
import { validateTagInput } from '@/lib/validation'

// GET /api/blog/tags - Get all tags
export async function GET() {
  try {
    const tags = await blogDb.getAllTags()
    return createSuccessResponse({ tags })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return createErrorResponse('Failed to fetch tags', 500)
  }
}

// POST /api/blog/tags - Create a new tag
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return createAuthResponse()
  }

  try {
    const body = await request.json()

    // Validate input
    const validation = validateTagInput(body)
    if (!validation.valid) {
      return createErrorResponse(
        validation.errors.map(e => e.message).join('; ')
      )
    }

    const { name, description, color } = body

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Create the tag
    const tagId = await blogDb.createTag(name, slug, description, color)

    return createSuccessResponse(
      {
        message: 'Tag created successfully',
        tag: { id: tagId, name, slug, description, color: color || '#06b6d4' },
      },
      201
    )
  } catch (error) {
    console.error('Error creating tag:', error)
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed')
    ) {
      return createErrorResponse('A tag with this name already exists')
    }
    return createErrorResponse('Failed to create tag', 500)
  }
}
