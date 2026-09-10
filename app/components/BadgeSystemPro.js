export default function BadgeSystemPro() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
      <h3 className="font-black">Badge System Pro</h3>
      <div className="flex gap-2 mt-2 flex-wrap">
        <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs">Newbie</span>
        <span className="rounded-full border border-pink-500/30 bg-pink-500/20 px-2 py-1 text-xs">Gifter</span>
        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs">Whale</span>
        <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-2 py-1 text-xs">Legend</span>
      </div>
    </div>
  );
}
