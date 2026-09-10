'use client';

export default function AppLogoSystem() {
	return (
		<div className="flex items-center gap-2">
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-black">C</div>
			<span className="font-black tracking-tight">Chat-and-Chill <span className="text-purple-400">1000.0.0</span></span>
			<span className="ml-2 rounded-full border border-red-500/30 bg-red-500/20 px-2 py-0.5 text-xs text-red-300 animate-pulse">LIVE</span>
		</div>
	);
}
