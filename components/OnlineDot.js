export default function OnlineDot({ isOnline }) {
  return (
    <span
      aria-label={isOnline ? 'Online' : 'Offline'}
      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`}
    />
  )
}