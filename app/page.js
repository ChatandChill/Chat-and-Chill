import AppLogoSystem from './components/AppLogoSystem';
import BadgeSystemPro from './components/BadgeSystemPro';
import LiveGiftSystemPro from './components/LiveGiftSystemPro';
import WorldNo1System from './components/WorldNo1System';
import FundWalletSystemPro from './components/FundWalletSystemPro';

export default function Home() {
  return (
    <main style={{background:'#0a0a0a', color:'white', minHeight:'100vh'}}>
      <AppLogoSystem />
      <WorldNo1System />
      <FundWalletSystemPro />
      <LiveGiftSystemPro />
      <BadgeSystemPro />
    </main>
  );
}
