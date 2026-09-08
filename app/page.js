import AppLogoSystem from './components/AppLogoSystem';
import BadgeSystemPro from './components/BadgeSystemPro';
import LiveGiftSystemPro from './components/LiveGiftSystemPro';
import WorldNo1System from './components/WorldNo1System';

export default function Home() {
  return (
    <main style={{background:'#0a0a0a', color:'white', minHeight:'100vh', padding:'20px', display:'flex', flexDirection:'column', gap:'20px', alignItems:'center'}}>
      <AppLogoSystem />
      <WorldNo1System />
      <LiveGiftSystemPro />
      <BadgeSystemPro />
    </main>
  );
}
