import PocketBase from 'pocketbase'

// Initialize PocketBase client
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090')

// Disable auto cancellation
pb.autoCancellation(false)

export default pb