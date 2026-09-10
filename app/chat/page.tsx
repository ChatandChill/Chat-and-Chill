export default function ChatPage() {
  return (
    <div style={{background:'black', color:'white', minHeight:'100vh', padding:20}}>
      <h1 style={{color:'#facc15', fontSize:30, fontWeight:900}}>📥 INBOX — CHAT IS WORKING!</h1>
      <p>If you see this, /chat 404 is FIXED.</p>
      <div style={{marginTop:20}}>
        <div style={{padding:15, background:'#222', marginBottom:10, borderRadius:10}}>👤 okiki — Tap to chat</div>
        <div style={{padding:15, background:'#222', marginBottom:10, borderRadius:10}}>👤 john — Tap to chat</div>
        <div style={{padding:15, background:'#222', marginBottom:10, borderRadius:10}}>👤 sarah — Tap to chat</div>
      </div>
    </div>
  )
}
