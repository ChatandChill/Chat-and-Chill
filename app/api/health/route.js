import { getRuntimeStatus } from '@/lib/runtimeStatus'

export async function GET() {
  const status = getRuntimeStatus()

  return Response.json({
    status: 'ok',
    ...status
  }, {
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}
