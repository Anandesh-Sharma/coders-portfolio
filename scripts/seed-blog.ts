import { blogDb } from '../lib/database'
import { estimateReadingTime, generateSlug } from '../lib/mdx-utils'

const samplePosts = [
  {
    title: 'Building Modern Web Applications with Next.js 15',
    description:
      'A comprehensive guide to building scalable and performant web applications using Next.js 15 with the App Router, TypeScript, and modern development practices.',
    content: `# Building Modern Web Applications with Next.js 15

The web development landscape continues to evolve rapidly, and staying current with modern frameworks and best practices is crucial for building exceptional user experiences. In this post, I'll walk you through the key concepts and features that make Next.js 15 an excellent choice for modern web applications.

## Why Next.js 15?

Next.js 15 introduces several groundbreaking features that make it the go-to framework for React applications:

### App Router (Stable)

The App Router provides a new paradigm for organizing your application with enhanced routing capabilities:

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Server Components by Default

Server Components reduce the JavaScript bundle size and improve performance:

\`\`\`typescript
// This component runs on the server
async function BlogPosts() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

## Key Features and Best Practices

### 1. TypeScript Integration

TypeScript provides excellent developer experience with static type checking:

\`\`\`typescript
interface Post {
  id: string
  title: string
  content: string
  publishedAt: Date
  tags: string[]
}

async function getPost(id: string): Promise<Post | null> {
  // Implementation
}
\`\`\`

### 2. Automatic Optimizations

Next.js 15 includes automatic optimizations:

- **Image Optimization**: Automatic image resizing and format selection
- **Font Optimization**: Automatic font subsetting and preloading
- **Bundle Optimization**: Tree shaking and code splitting

### 3. Streaming and Suspense

Improve perceived performance with streaming:

\`\`\`typescript
import { Suspense } from 'react'

function Page() {
  return (
    <div>
      <h1>My Blog</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  )
}
\`\`\`

## Performance Optimization Strategies

### Code Splitting

Leverage dynamic imports for better code splitting:

\`\`\`typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
})
\`\`\`

### Caching Strategies

Implement effective caching with the new caching APIs:

\`\`\`typescript
import { cache } from 'react'

const getUser = cache(async (id: string) => {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
})
\`\`\`

## SEO and Accessibility

### Metadata API

The new Metadata API makes SEO configuration simple:

\`\`\`typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog Post',
  description: 'A detailed description of my blog post',
  openGraph: {
    title: 'My Blog Post',
    description: 'A detailed description of my blog post',
    images: ['https://example.com/og-image.jpg'],
  },
}
\`\`\`

### Accessibility Best Practices

Always ensure your applications are accessible:

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast

\`\`\`typescript
function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={props['aria-label']}
    >
      {children}
    </button>
  )
}
\`\`\`

## Testing Strategy

A comprehensive testing strategy includes:

### Unit Tests with Jest

\`\`\`typescript
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
\`\`\`

### End-to-End Tests with Playwright

\`\`\`typescript
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
})
\`\`\`

## Deployment and CI/CD

### Vercel Integration

Deploying Next.js applications to Vercel is seamless:

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy with automatic previews for pull requests

### GitHub Actions

Set up continuous integration:

\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

## Conclusion

Next.js 15 provides a robust foundation for building modern web applications. By leveraging its built-in optimizations, TypeScript integration, and new App Router, you can create fast, scalable, and maintainable applications.

The combination of Server Components, automatic optimizations, and excellent developer experience makes Next.js 15 an excellent choice for your next project.

---

*Want to learn more about modern web development? Check out my other posts on React patterns, TypeScript best practices, and performance optimization techniques.*`,
    featured: true,
    published: true,
    published_at: '2024-12-15T10:00:00Z',
    cover_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    tags: ['Next.js', 'React', 'TypeScript', 'Web Development'],
  },
  {
    title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
    description:
      'Dive deep into advanced TypeScript patterns, generics, conditional types, and best practices for building type-safe applications.',
    content: `# Mastering TypeScript: Advanced Patterns and Best Practices

TypeScript has revolutionized the way we write JavaScript, bringing static type checking and enhanced developer experience to our projects. In this comprehensive guide, we'll explore advanced TypeScript patterns that will help you write more robust and maintainable code.

## Advanced Type Patterns

### Generic Constraints

Generic constraints allow you to restrict the types that can be passed to a generic function or class:

\`\`\`typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// Works with arrays, strings, etc.
loggingIdentity([1, 2, 3])
loggingIdentity("hello")
\`\`\`

### Conditional Types

Conditional types enable type-level logic:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T

type ApiResponse<T> = T extends string 
  ? { message: T } 
  : T extends number 
    ? { code: T } 
    : { data: T }

type StringResponse = ApiResponse<string> // { message: string }
type NumberResponse = ApiResponse<number> // { code: number }
\`\`\`

### Mapped Types

Transform existing types into new ones:

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
\`\`\`

## Utility Types in Action

### Pick and Omit

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>
type UserInput = Omit<User, 'id' | 'createdAt'>
\`\`\`

### Record Type

\`\`\`typescript
type Theme = 'light' | 'dark'
type Colors = Record<Theme, string>

const colors: Colors = {
  light: '#ffffff',
  dark: '#000000'
}
\`\`\`

## Advanced Function Types

### Function Overloads

\`\`\`typescript
function processValue(value: string): string
function processValue(value: number): number
function processValue(value: boolean): boolean
function processValue(value: unknown): unknown {
  // Implementation
  return value
}
\`\`\`

### Higher-Order Function Types

\`\`\`typescript
type EventHandler<T> = (event: T) => void
type AsyncHandler<T, R> = (input: T) => Promise<R>

function createHandler<T>(
  handler: EventHandler<T>
): EventHandler<T> {
  return (event: T) => {
    console.log('Handling event:', event)
    handler(event)
  }
}
\`\`\`

## Type Guards and Assertions

### Custom Type Guards

\`\`\`typescript
interface Cat {
  meow(): void
}

interface Dog {
  bark(): void
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow() // TypeScript knows this is a Cat
  } else {
    animal.bark() // TypeScript knows this is a Dog
  }
}
\`\`\`

### Assertion Functions

\`\`\`typescript
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Not a number')
  }
}

function processNumber(value: unknown) {
  assertIsNumber(value)
  // TypeScript now knows value is a number
  return value.toFixed(2)
}
\`\`\`

## Module Patterns

### Namespace Organization

\`\`\`typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }

  export class EmailValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return /^[^@]+@[^@]+\.[^@]+$/.test(s)
    }
  }
}

const validator = new Validation.EmailValidator()
\`\`\`

### Declaration Merging

\`\`\`typescript
interface Window {
  customProperty: string
}

// Later in your code
window.customProperty = 'Hello, World!'
\`\`\`

## Best Practices

### 1. Use Strict Configuration

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

### 2. Prefer Type Annotations

\`\`\`typescript
// Good
const users: User[] = []
const config: Config = getConfig()

// Avoid
const users = [] as User[]
const config = getConfig() as Config
\`\`\`

### 3. Use Discriminated Unions

\`\`\`typescript
type LoadingState = {
  status: 'loading'
}

type SuccessState = {
  status: 'success'
  data: any[]
}

type ErrorState = {
  status: 'error'
  error: string
}

type State = LoadingState | SuccessState | ErrorState

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      // TypeScript knows state is LoadingState
      break
    case 'success':
      // TypeScript knows state is SuccessState
      console.log(state.data)
      break
    case 'error':
      // TypeScript knows state is ErrorState
      console.error(state.error)
      break
  }
}
\`\`\`

## Performance Considerations

### Avoid Deep Nesting

\`\`\`typescript
// Avoid
type DeepNested = {
  level1: {
    level2: {
      level3: {
        value: string
      }
    }
  }
}

// Prefer
type Level3 = { value: string }
type Level2 = { level3: Level3 }
type Level1 = { level2: Level2 }
type Nested = { level1: Level1 }
\`\`\`

### Use Type Aliases Wisely

\`\`\`typescript
// Good for complex types
type EventCallback<T> = (event: T) => void | Promise<void>

// Good for union types
type Status = 'pending' | 'fulfilled' | 'rejected'
\`\`\`

## Conclusion

Mastering these advanced TypeScript patterns will significantly improve your code quality and developer experience. The key is to start with the basics and gradually incorporate more advanced patterns as your projects grow in complexity.

Remember that TypeScript's type system is incredibly powerful, but it should enhance your development experience, not hinder it. Use these patterns judiciously and always prioritize code readability and maintainability.`,
    featured: false,
    published: true,
    published_at: '2024-12-10T14:30:00Z',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
  },
  {
    title: 'The Art of Code Review: Building Better Software Together',
    description:
      'Learn how to conduct effective code reviews that improve code quality, share knowledge, and build stronger development teams.',
    content: `# The Art of Code Review: Building Better Software Together

Code review is one of the most important practices in software development, yet it's often done poorly or skipped entirely. A well-executed code review process can dramatically improve code quality, catch bugs early, and foster team collaboration.

## Why Code Reviews Matter

### Quality Assurance
- Catch bugs before they reach production
- Ensure adherence to coding standards
- Identify potential security vulnerabilities
- Verify that requirements are properly implemented

### Knowledge Sharing
- Spread domain knowledge across the team
- Share best practices and techniques
- Onboard new team members effectively
- Cross-pollinate ideas between developers

### Team Building
- Foster collaboration and communication
- Build trust and mutual respect
- Create learning opportunities
- Establish shared ownership of the codebase

## Best Practices for Reviewers

### 1. Review Early and Often

\`\`\`typescript
// Instead of reviewing this massive PR...
class UserService {
  // 500 lines of complex logic
}

// Review smaller, focused changes
class UserService {
  validateUser(user: User): ValidationResult {
    // 20 lines of focused logic
  }
}
\`\`\`

### 2. Focus on the Important Things

**High Priority:**
- Logic errors and bugs
- Security vulnerabilities  
- Performance issues
- Architectural concerns

**Medium Priority:**
- Code style consistency
- Naming conventions
- Code organization

**Low Priority:**
- Formatting (use automated tools)
- Personal preferences

### 3. Be Constructive and Specific

\`\`\`typescript
// ❌ Poor feedback
"This is bad"

// ✅ Good feedback
"Consider extracting this logic into a separate function for better testability:

function validateEmail(email: string): boolean {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email)
}
"
\`\`\`

## Best Practices for Authors

### 1. Keep PRs Small and Focused

\`\`\`typescript
// ❌ Mixing concerns
// PR: "Add user authentication + refactor database layer + update UI"

// ✅ Single responsibility  
// PR: "Add email validation to user registration"
\`\`\`

### 2. Write Clear Descriptions

\`\`\`markdown
## What
Add email validation to user registration form

## Why  
Prevent invalid emails from being stored in the database

## How
- Added email regex validation
- Added unit tests for validation logic
- Updated error messages

## Testing
- ✅ Unit tests pass
- ✅ Manual testing completed
- ✅ No breaking changes
\`\`\`

### 3. Respond Constructively to Feedback

\`\`\`typescript
// ❌ Defensive response
"This works fine, why change it?"

// ✅ Collaborative response  
"Good point about testability. I'll extract this into a separate function. 
Thanks for the suggestion!"
\`\`\`

## Code Review Checklist

### Functionality
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled properly?
- [ ] Is error handling appropriate?
- [ ] Are there any obvious bugs?

### Design & Architecture  
- [ ] Is the code well-structured?
- [ ] Does it follow SOLID principles?
- [ ] Is the solution appropriately complex?
- [ ] Are abstractions well-chosen?

### Performance
- [ ] Are there any obvious performance issues?
- [ ] Is the algorithm appropriate?
- [ ] Are database queries optimized?
- [ ] Is caching used effectively?

### Security
- [ ] Is user input properly validated?
- [ ] Are authentication/authorization checks in place?
- [ ] Are secrets handled securely?
- [ ] Is data sanitized appropriately?

### Testing
- [ ] Are there appropriate tests?
- [ ] Do tests cover edge cases?
- [ ] Are tests maintainable?
- [ ] Is test coverage adequate?

### Documentation
- [ ] Is complex logic documented?
- [ ] Are public APIs documented?
- [ ] Is the README updated if needed?
- [ ] Are breaking changes noted?

## Common Anti-Patterns

### The Nitpicker
\`\`\`typescript
// ❌ Focusing on trivial issues
"Use single quotes instead of double quotes"
"Add a space here"
"This variable name could be shorter"

// ✅ Use automated tools for style
// Focus on logic and architecture
\`\`\`

### The Rubber Stamper
\`\`\`typescript
// ❌ Automatic approval
"LGTM" // without actually reviewing

// ✅ Thoughtful review
"The logic looks solid. I tested the edge case 
with empty arrays and it handles it correctly."
\`\`\`

### The Perfectionist
\`\`\`typescript
// ❌ Demanding perfection
"This entire module should be rewritten"
"We should use a different architecture"

// ✅ Pragmatic feedback
"This works well. For future iterations, 
consider extracting this pattern into a utility."
\`\`\`

## Tools and Automation

### Automated Checks
\`\`\`yaml
# GitHub Actions example
name: Code Review
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run ESLint
        run: npm run lint
      - name: Run Tests  
        run: npm test
      - name: Check Coverage
        run: npm run coverage
\`\`\`

### Review Templates
\`\`\`markdown
## Review Checklist
- [ ] Code compiles without warnings
- [ ] Tests pass
- [ ] Code follows style guide
- [ ] Logic is sound
- [ ] Performance is acceptable
- [ ] Security considerations addressed

## Questions/Concerns
<!-- List any questions or concerns -->

## Suggestions
<!-- Constructive suggestions for improvement -->
\`\`\`

## Building a Review Culture

### Set Clear Expectations
- Define what constitutes a good review
- Establish response time expectations
- Create guidelines for giving and receiving feedback
- Make reviews a required part of the process

### Lead by Example
- Senior developers should model good review behavior
- Take time to write thoughtful reviews
- Accept feedback gracefully
- Celebrate learning opportunities

### Measure and Improve
- Track review metrics (time to review, defect rate)
- Gather feedback on the review process
- Continuously refine guidelines
- Share success stories

## Conclusion

Effective code reviews are an art that requires practice, empathy, and clear communication. When done well, they become one of the most valuable practices in your development process.

Remember that the goal isn't to find fault, but to collaboratively build better software. Focus on learning, teaching, and improving together as a team.

The time invested in thoughtful code reviews pays dividends in code quality, team knowledge, and overall project success.`,
    featured: false,
    published: true,
    published_at: '2024-12-05T09:15:00Z',
    tags: [
      'Code Review',
      'Software Engineering',
      'Team Collaboration',
      'Best Practices',
    ],
  },
]

// Function to seed the database
export async function seedBlog() {
  console.log('🌱 Seeding blog database...')

  try {
    for (const post of samplePosts) {
      const slug = generateSlug(post.title)
      const readingTime = estimateReadingTime(post.content)

      console.log(`Creating post: ${post.title}`)

      const postId = blogDb.createPost({
        slug,
        title: post.title,
        description: post.description,
        content: post.content,
        featured: post.featured,
        published: post.published,
        published_at: post.published_at,
        reading_time: readingTime,
        cover_image: post.cover_image,
        author: 'Claude',
        tags: post.tags,
      })

      console.log(`✅ Created post with ID: ${postId}`)
    }

    console.log('🎉 Blog database seeded successfully!')

    // Print summary
    const allPosts = await blogDb.getAllPosts()
    const publishedPosts = await blogDb.getPublishedPosts()
    const featuredPosts = await blogDb.getFeaturedPosts()
    const allTags = await blogDb.getAllTags()

    console.log(`\n📊 Summary:`)
    console.log(`Total posts: ${allPosts.length}`)
    console.log(`Published posts: ${publishedPosts.length}`)
    console.log(`Featured posts: ${featuredPosts.length}`)
    console.log(`Total tags: ${allTags.length}`)
  } catch (error) {
    console.error('❌ Error seeding blog database:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  seedBlog()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
