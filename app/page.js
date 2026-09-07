'use client';

import AppLogoSystem from './components/AppLogoSystem';
import WorldNo1System from './components/WorldNo1System';
import LiveGiftSystemPro from './components/LiveGiftSystemPro';
import BadgeSystemPro from './components/BadgeSystemPro';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-start px-4 py-12 md:py-20">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w- h- bg-purple-600/20 rounded-full blur-" />
        <div className="absolute bottom-[-10%] right-[10%] w- h- bg-pink-600/20 rounded-full blur-" />
      </div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8 md:gap-12">

        {/* Logo System */}
        <div className="w-full flex justify-center">
          <AppLogoSystem />
        </div>

        {/* World No1 System */}
        <div className="w-full flex justify-center">
          <WorldNo1System />
        </div>

        {/* Live Gift System Pro */}
        <div className="w-full flex justify-center">
          <LiveGiftSystemPro />
        </div>

        {/* Badge System Pro */}
        <div className="w-full flex justify-center">
          <BadgeSystemPro />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Chat-and-Chill • 1000.0.0 Full Force • Built for Vercel
          </p>
          <p className="text-white/30 text-xs mt-2">
            Live Chat • Voice Passport • Gifts • Badges
          </p>
        </div>

      </div>
    </main>
  );
}
