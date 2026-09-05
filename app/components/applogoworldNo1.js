// READABLE - AppLogoWorldNo1.js + WowAppOpening + Home Header
// File: frontend/components/AppLogoWorldNo1.js

import React, { useState, useEffect } from 'react';

export const AppLogoWorldNo1 = ({ size=40 }) => (
  <div style={{width:size, height:size, borderRadius:12, background:'linear-gradient(135deg, #8B0000, #CC5500, #FFD700)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 20px #FFD700', fontWeight:900, color:'#fff'}}>C</div>
);

export const SplashScreenWorldNo1 = ({ onFinish }) => {
  const [step,setStep] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setStep(s=>{ if(s>=4){ clearInterval(id); onFinish&&onFinish(); return 4; } return s+1; }), 1200);
    return ()=> clearInterval(id);
  },[]);
  const texts = ['Connect.','Entertain.','Earn.','ChatAndChill','Connect. Entertain. Earn.'];
  const colors = ['#6B46C1','#00FF88','#FFD700','#FFFFFF','#FFD700'];
  return (
    <div style={{background:'#0A0A0F', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative'}}>
      <div style={{width:120, height:120, borderRadius:30, background:'linear-gradient(135deg,#8B0000,#FFD700)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, fontWeight:900, color:'#fff', boxShadow:'0 0 40px #FFD700', transform:`scale(${1+step*0.15}) rotate(${step*8}deg)`, transition:'1.2s'}}>C</div>
      <h1 style={{color:colors[step], fontSize:36, fontWeight:900, marginTop:24, textShadow:`0 0 20px ${colors[step]}`, transition:'0.8s'}}>{texts[step]}</h1>
      <div style={{marginTop:12, color:'#8B4513', fontSize:12, letterSpacing:2}}>WORLD NO1 MATURE AFRICAN GOLD DIAMONDS NEON 2G DAY/NIGHT</div>
      <div style={{position:'absolute', bottom:30, right:30, background:'#00FF88', color:'#000', padding:'6px 12px', borderRadius:20, fontSize:12, fontWeight:800}}>2G • DAY/NIGHT • WORLD NO1</div>
    </div>
  );
};

export const DayNightToggle = ({ isDay, setIsDay }) => (
  <button onClick={()=> setIsDay(!isDay)} style={{background: isDay ? '#FFFFFF' : '#0A0A0F', color: isDay ? '#000' : '#FFD700', border:'2px solid #FFD700', borderRadius:20, padding:'6px 12px', fontWeight:700}}>{isDay ? '☀️ Day' : '🌙 Night'}</button>
);

export const TwoGToggle = ({ is2G, setIs2G }) => (
  <button onClick={()=> setIs2G(!is2G)} style={{background: is2G ? '#00FF88' : '#333', color: is2G ? '#000' : '#fff', borderRadius:20, padding:'8px 14px', position:'fixed', bottom:20, right:20, zIndex:9999, fontWeight:800, boxShadow:'0 0 15px #00FF88'}}>{is2G ? '2G ON 80% Save' : '2G OFF HD'}</button>
);

// Home Header with 40px icon + neon gold + 2G + DayNight
export const HomeHeaderWorldNo1 = ({ isDay, setIsDay, is2G, setIs2G }) => (
  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background: isDay ? '#FFFFFF' : '#0A0A0F', borderBottom:`2px solid #FFD700`}}>
    <div style={{display:'flex', alignItems:'center', gap:12}}>
      <AppLogoWorldNo1 size={40} />
      <h1 style={{color:'#FFD700', fontWeight:900, fontSize:20, textShadow:'0 0 15px #FFD700', animation:'neonPulse 2s infinite'}}>Chat & Chill</h1>
    </div>
    <div style={{display:'flex', gap:8}}>
      <DayNightToggle isDay={isDay} setIsDay={setIsDay} />
    </div>
  </div>
);
