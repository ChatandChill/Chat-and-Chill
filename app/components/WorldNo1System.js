"use client";
import { useState } from 'react';

export default function WorldNo1System() {
  const [ranking, setRanking] = useState("1000.0.0");
  
  return (
    <div onClick={() => alert(`Your Global Rank: ${ranking}\nKeep gifting to climb!`)} 
         className="cursor-pointer p-4 bg-white/10 rounded-xl hover:bg-white/20">
      <h2 className="text-xl font-bold">🔵 World No1 System</h2>
      <p className="text-sm opacity-70">Chat-and-Chill Global Ranking • {ranking}</p>
      <p className="text-xs mt-2 text-yellow-400">Tap to check rank 👆</p>
    </div>
  );
}
