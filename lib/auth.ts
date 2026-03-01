import { NextRequest } from 'next/server'

// Basic Auth configuration — env vars are required, no defaults
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

function isAuthConfigured(): boolean {
  return Boolean(
    ADMIN_USERNAME && ADMIN_PASSWORD && ADMIN_PASSWORD.length >= 12
  )
}

export function parseBasicAuth(
  authHeader: string
): { username: string; password: string } | null {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null
  }

  try {
    const base64Credentials = authHeader.slice(6) // Remove 'Basic ' prefix
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii'
    )
    const [username, password] = credentials.split(':')

    return { username, password }
  } catch (error) {
    return null
  }
}

export function validateAuth(request: NextRequest): boolean {
  if (!isAuthConfigured()) {
    return false
  }

  const authHeader = request.headers.get('Authorization')

  if (!authHeader) {
    return false
  }

  const credentials = parseBasicAuth(authHeader)

  if (!credentials) {
    return false
  }

  return (
    credentials.username === ADMIN_USERNAME &&
    credentials.password === ADMIN_PASSWORD
  )
}

export function createAuthResponse(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Blog Admin API"',
      'Content-Type': 'application/json',
    },
  })
}

export function createErrorResponse(
  message: string,
  status: number = 400
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function createSuccessResponse(
  data: any,
  status: number = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
