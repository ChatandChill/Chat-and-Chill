"use client";
import { useState } from 'react';

export function AppLogoWithText(){
  return <div style={{fontWeight:'bold', fontSize:'22px'}}>Chat & Chill 🌍</div>
}
export function DayNightToggle(){
  const [dark,setDark]=useState(true);
  return <button onClick={()=>setDark(!dark)} style={{padding:'6px 10px',borderRadius:8}}>{dark?'🌙':'☀️'}</button>
}
export function HostToggle(){
  return <div style={{padding:'6px 10px', background:'#222', borderRadius:8}}>🎙️ Host</div>
}
export function MemberVerification(){
  return <div style={{fontSize:'12px'}}>✅ Verified</div>
}
export function SplashScreenManager(){ return null }
export function SplashScreen(){ return null }

export default function AppLogoSystem(){
  return <AppLogoWithText />
}
