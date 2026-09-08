import AppLogoSystem from './components/AppLogoSystem';
import WorldNo1System from './components/WorldNo1System';
import BadgeSystemPro from './components/BadgeSystemPro';

export default function Home() {
  return (
    <main style={{background:'#0a0a0a', color:'white', minHeight:'100vh', padding:'20px'}}>
      <AppLogoSystem />
      <WorldNo1System />
      <BadgeSystemPro />
      <h1 style={{textAlign:'center', marginTop:'50px'}}>Site is back - testing fund</h1>
    </main>
  );
}
