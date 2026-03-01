export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

const MAX_TITLE_LENGTH = 200
const MAX_SLUG_LENGTH = 200
const MAX_DESCRIPTION_LENGTH = 500
const MAX_CONTENT_LENGTH = 100_000
const MAX_AUTHOR_LENGTH = 100
const MAX_COVER_IMAGE_LENGTH = 2000
const MAX_TAG_NAME_LENGTH = 50
const MAX_TAG_DESCRIPTION_LENGTH = 200
const MAX_TAG_COLOR_LENGTH = 7
const MAX_TAGS_PER_POST = 20

export function validateBlogPost(
  body: Record<string, unknown>,
  isUpdate = false
): ValidationResult {
  const errors: ValidationError[] = []

  if (!isUpdate) {
    if (!body.title || typeof body.title !== 'string') {
      errors.push({
        field: 'title',
        message: 'Title is required and must be a string',
      })
    }
    if (!body.content || typeof body.content !== 'string') {
      errors.push({
        field: 'content',
        message: 'Content is required and must be a string',
      })
    }
  }

  if (body.title !== undefined) {
    if (typeof body.title !== 'string') {
      errors.push({ field: 'title', message: 'Title must be a string' })
    } else if (body.title.length > MAX_TITLE_LENGTH) {
      errors.push({
        field: 'title',
        message: `Title must be at most ${MAX_TITLE_LENGTH} characters`,
      })
    }
  }

  if (body.slug !== undefined) {
    if (typeof body.slug !== 'string') {
      errors.push({ field: 'slug', message: 'Slug must be a string' })
    } else if (body.slug.length > MAX_SLUG_LENGTH) {
      errors.push({
        field: 'slug',
        message: `Slug must be at most ${MAX_SLUG_LENGTH} characters`,
      })
    }
  }

  if (body.description !== undefined && body.description !== null) {
    if (typeof body.description !== 'string') {
      errors.push({
        field: 'description',
        message: 'Description must be a string',
      })
    } else if (body.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push({
        field: 'description',
        message: `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters`,
      })
    }
  }

  if (body.content !== undefined) {
    if (typeof body.content !== 'string') {
      errors.push({ field: 'content', message: 'Content must be a string' })
    } else if (body.content.length > MAX_CONTENT_LENGTH) {
      errors.push({
        field: 'content',
        message: `Content must be at most ${MAX_CONTENT_LENGTH} characters`,
      })
    }
  }

  if (body.author !== undefined && body.author !== null) {
    if (typeof body.author !== 'string') {
      errors.push({ field: 'author', message: 'Author must be a string' })
    } else if (body.author.length > MAX_AUTHOR_LENGTH) {
      errors.push({
        field: 'author',
        message: `Author must be at most ${MAX_AUTHOR_LENGTH} characters`,
      })
    }
  }

  if (body.cover_image !== undefined && body.cover_image !== null) {
    if (typeof body.cover_image !== 'string') {
      errors.push({
        field: 'cover_image',
        message: 'Cover image must be a string',
      })
    } else if (body.cover_image.length > MAX_COVER_IMAGE_LENGTH) {
      errors.push({
        field: 'cover_image',
        message: `Cover image URL must be at most ${MAX_COVER_IMAGE_LENGTH} characters`,
      })
    }
  }

  if (body.featured !== undefined && typeof body.featured !== 'boolean') {
    errors.push({ field: 'featured', message: 'Featured must be a boolean' })
  }

  if (body.published !== undefined && typeof body.published !== 'boolean') {
    errors.push({ field: 'published', message: 'Published must be a boolean' })
  }

  if (body.tags !== undefined) {
    if (!Array.isArray(body.tags)) {
      errors.push({ field: 'tags', message: 'Tags must be an array' })
    } else {
      if (body.tags.length > MAX_TAGS_PER_POST) {
        errors.push({
          field: 'tags',
          message: `At most ${MAX_TAGS_PER_POST} tags allowed`,
        })
      }
      for (const tag of body.tags) {
        if (typeof tag !== 'string' || tag.length > MAX_TAG_NAME_LENGTH) {
          errors.push({
            field: 'tags',
            message: `Each tag must be a string of at most ${MAX_TAG_NAME_LENGTH} characters`,
          })
          break
        }
      }
    }
  }

  return { valid: errors.length === 0, errors }
}

export function validateTagInput(
  body: Record<string, unknown>
): ValidationResult {
  const errors: ValidationError[] = []

  if (!body.name || typeof body.name !== 'string') {
    errors.push({
      field: 'name',
      message: 'Tag name is required and must be a string',
    })
  } else if (body.name.length > MAX_TAG_NAME_LENGTH) {
    errors.push({
      field: 'name',
      message: `Tag name must be at most ${MAX_TAG_NAME_LENGTH} characters`,
    })
  }

  if (body.description !== undefined && body.description !== null) {
    if (typeof body.description !== 'string') {
      errors.push({
        field: 'description',
        message: 'Description must be a string',
      })
    } else if (body.description.length > MAX_TAG_DESCRIPTION_LENGTH) {
      errors.push({
        field: 'description',
        message: `Description must be at most ${MAX_TAG_DESCRIPTION_LENGTH} characters`,
      })
    }
  }

  if (body.color !== undefined && body.color !== null) {
    if (typeof body.color !== 'string') {
      errors.push({ field: 'color', message: 'Color must be a string' })
    } else if (
      body.color.length > MAX_TAG_COLOR_LENGTH ||
      !/^#[0-9a-fA-F]{6}$/.test(body.color)
    ) {
      errors.push({
        field: 'color',
        message: 'Color must be a valid hex color (e.g. #06b6d4)',
      })
    }
  }

  return { valid: errors.length === 0, errors }
}
