"use client";
import { useState, useEffect, useRef } from 'react';
import { Room, RoomEvent, Track, RemoteParticipant, LocalVideoTrack } from 'livekit-client';

type Gift = { id: string; emoji: string; name: string; price: number };

const GIFTS: Gift[] = [
  { id: 'fire', emoji: '🔥', name: 'Fire', price: 1000 },
  { id: 'diamond', emoji: '💎', name: 'Diamond', price: 5000 },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', price: 10000 },
  { id: 'lion', emoji: '🦁', name: 'Lion', price: 25000 },
];

export default function LiveKitLivePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<Room | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [is2G, setIs2G] = useState(true);
  const [viewers, setViewers] = useState(0);
  const [balance, setBalance] = useState(51450);
  const [duration, setDuration] = useState(0);
  const [roomName] = useState(`room-${Math.random().toString(36).slice(2,7)}`);
  const [giftRain, setGiftRain] = useState<{id:number, emoji:string}[]>([]);
  const [chat, setChat] = useState<string[]>(["@sarah: You fine die 😍", "@chidi: Let's gooo 🔥"]);

  // Timer
  useEffect(() => {
    if (!isLive) return;
    const t = setInterval(() => setDuration(d => d+1), 1000);
    return () => clearInterval(t);
  }, [isLive]);

  const startLive = async () => {
    try {
      // 1. Get token from your API
      const resp = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, participantName: 'Host-Lagos', isHost: true })
      });
      const { token, wsUrl } = await resp.json();
      
      if (!token) throw new Error('No token - check LIVEKIT env vars');

      // 2. Connect to LiveKit
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: { resolution: is2G ? { width: 320, height: 240 } : { width: 720, height: 1280 } },
      });
      roomRef.current = room;

      room.on(RoomEvent.ParticipantConnected, () => setViewers(v => v+1));
      room.on(RoomEvent.ParticipantDisconnected, () => setViewers(v => Math.max(0, v-1)));
      room.on(RoomEvent.DataReceived, (payload) => {
        const msg = new TextDecoder().decode(payload);
        try {
          const data = JSON.parse(msg);
          if (data.type === 'gift') {
            const g = GIFTS.find(x => x.id === data.giftId);
            if (g) {
              setBalance(b => b + Math.floor(g.price * 0.7));
              setGiftRain(prev => [...prev, { id: Date.now()+Math.random(), emoji: g.emoji }]);
              setChat(c => [...c.slice(-4), `@${data.from} sent ${g.emoji} N${g.price.toLocaleString()}`]);
            }
          }
        } catch {}
      });

      await room.connect(wsUrl, token);

      // 3. Publish camera/mic - if 2G mode, publish audio only to save data
      await room.localParticipant.enableCameraAndMicrophone();
      if (is2G) {
        await room.localParticipant.setCameraEnabled(false); // audio only for 2G
      }

      const videoTrack = room.localParticipant.getTrackPublication(Track.Source.Camera)?.videoTrack as LocalVideoTrack | undefined;
      if (videoTrack && videoRef.current && !is2G) {
        videoTrack.attach(videoRef.current);
      }

      setIsLive(true);
      setViewers(1);
    } catch (err: any) {
      console.error(err);
      // Fallback to local getUserMedia if LiveKit not configured
      alert(`LiveKit not configured yet, falling back to local preview. Error: ${err.message}`);
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: !is2G, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          await videoRef.current.play();
        }
        setIsLive(true);
      } catch {}
    }
  };

  const endLive = () => {
    roomRef.current?.disconnect();
    roomRef.current = null;
    setIsLive(false);
    setDuration(0);
  };

  const sendGift = (gift: Gift) => {
    // In production, send via data channel
    const payload = JSON.stringify({ type: 'gift', giftId: gift.id, from: 'You' });
    roomRef.current?.localParticipant.publishData(new TextEncoder().encode(payload), { reliable: true });
    setBalance(b => b + Math.floor(gift.price * 0.7));
    setGiftRain(prev => [...prev, { id: Date.now(), emoji: gift.emoji }]);
    setTimeout(() => setGiftRain(prev => prev.slice(1)), 2500);
  };

  return (
    <div className="min-h-screen bg-black max-w-[430px] mx-auto relative overflow-hidden text-white">
      {!isLive ? (
        <div className="min-h-screen bg-[#FFFBF0] text-black p-6 flex flex-col">
          <h1 className="font-black text-xl">CHAT & CHILL • LIVEKIT PRO</h1>
          <h2 className="text-[40px] font-black leading-none mt-8 tracking-tighter">Go Live<br/>For Real<br/><span className="text-[#FF5A1F]">1,000 Viewers</span></h2>
          <div className="bg-white rounded-2xl p-4 mt-6 border shadow-sm">
            <p className="font-bold">✅ Vercel-safe • No timeout</p>
            <p className="text-sm text-gray-600 mt-1">LiveKit handles video SFU, Vercel only handles token. 2G mode = audio only (24kbps)</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setIs2G(!is2G)} className={`flex-1 h-12 rounded-full font-bold border ${is2G ? 'bg-black text-white' : 'bg-white'}`}>{is2G ? '2G AUDIO (24kbps)' : 'HD VIDEO (500kbps)'}</button>
          </div>
          <button onClick={startLive} className="mt-auto w-full h-14 bg-[#FF5A1F] rounded-full font-black text-lg text-white">Start Live Now • {roomName}</button>
          <p className="text-center text-xs text-gray-400 mt-2">Balance: N{balance.toLocaleString()}</p>
        </div>
      ) : (
        <div className="h-screen relative bg-[#111]">
          {is2G ? (
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-yellow-50 text-black">
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl">🎙️</div>
              <p className="font-black mt-3">LIVE Audio Only • 2G</p>
              <p className="text-sm opacity-70">{viewers} listening • {Math.floor(duration/60)}:{(duration%60).toString().padStart(2,'0')}</p>
              <button onClick={() => setIs2G(false)} className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm font-bold">Switch to Video</button>
            </div>
          ) : (
            <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
          )}

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
            <div className="flex gap-2">
              <div className="bg-red-600 px-3 py-1 rounded-full text-xs font-black">🔴 {Math.floor(duration/60)}:{(duration%60).toString().padStart(2,'0')}</div>
              <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">👁 {viewers}</div>
            </div>
            <div className="bg-black/60 px-3 py-1 rounded-full text-xs font-bold">N{balance.toLocaleString()}</div>
          </div>

          {/* Gift rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {giftRain.map(g => (
              <div key={g.id} className="absolute bottom-20 text-4xl animate-bounce" style={{ left: `${20+Math.random()*60}%` }}>{g.emoji}</div>
            ))}
          </div>

          {/* Chat */}
          <div className="absolute bottom-28 left-3 right-3 space-y-1">
            {chat.slice(-3).map((c,i) => (
              <div key={i} className="bg-black/50 backdrop-blur rounded-full px-3 py-1 text-xs w-fit">{c}</div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                <button onClick={endLive} className="px-5 h-12 bg-red-600 rounded-full font-black">End</button>
                <button onClick={() => setIs2G(!is2G)} className="px-4 h-12 bg-white/20 backdrop-blur rounded-full text-xs font-bold">{is2G ? '📹' : '📻'}</button>
              </div>
              <div className="flex gap-2">
                {GIFTS.map(g => (
                  <button key={g.id} onClick={() => sendGift(g)} className="w-12 h-12 bg-[#FF5A1F] rounded-full text-xl active:scale-90">{g.emoji}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
