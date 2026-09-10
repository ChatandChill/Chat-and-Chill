"use client"
export default function Entertainment(){
  return(
    <div style={{background:'black', color:'white', minHeight:'100vh', padding:12}}>
      <h1 style={{color:'#facc15', fontWeight:900}}>🎬 ENTERTAINMENT — WORKING</h1>
      <div style={{marginTop:12, height:180, background:'#111', borderRadius:12, overflow:'hidden'}}>
        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
        <div style={{background:'#111', padding:20, borderRadius:12, border:'1px solid #222'}}>🎵 Afrobeats Live</div>
        <div style={{background:'#111', padding:20, borderRadius:12, border:'1px solid #222'}}>🎬 Nollywood</div>
        <div style={{background:'#111', padding:20, borderRadius:12, border:'1px solid #222'}}>😂 Comedy Night</div>
        <div style={{background:'#111', padding:20, borderRadius:12, border:'1px solid #222'}}>📻 Chill Radio</div>
      </div>
    </div>
  )
}
