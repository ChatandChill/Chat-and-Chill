import { redirect } from 'next/navigation'

export default async function UserChatPage({ params }) {
  const { user } = await params
  redirect(`/chat?user=${encodeURIComponent(user)}`)
}