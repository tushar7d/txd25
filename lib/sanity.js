import { client, serverClient, publicClient } from '@/sanity/lib/client'

// Export the appropriate client based on environment
// For server components, use serverClient
// For client components, use publicClient
export { client, serverClient, publicClient }
export default client
