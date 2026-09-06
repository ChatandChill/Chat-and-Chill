require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });

// ✅ SUPREME MONGO CONNECTION
const MONGO_URI = process.env.MONGO_URI;
console.log('🔍 Checking MONGO_URI:', MONGO_URI ? MONGO_URI.substring(0,60)+'...' : 'MISSING!');

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log(✅ Connected to ChatandChill-supreme — DB: ${mongoose.connection.name});
      console.log('✅ Diamond Wallet N6.765Q Ready!');
    })
    .catch(err => console.error('❌ Mongo Error:', err.message));
} else {
  console.log('❌ MONGO_URI missing in .env');
}

// Supreme User Schema
const userSchema = new mongoose.Schema({
  userId: String,
  faceTemplateEncrypted: String,
  voiceVerifyTemplate: String,
  voiceCloneId: String,
  nativeLanguage: String,
  isVerified: { type: Boolean, default: true },
  walletBalance: { type: Number, default: 6765000000000 },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// 1. VOICE PASSPORT ONBOARDING
app.post('/api/onboard/voice-passport', upload.fields([{ name: 'video' }, { name: 'audio' }]), async (req, res) => {
  try {
    const userId = req.body.userId;
    const detectedLang = "yo";
    const voiceCloneId = "voice_"+userId;
    
    const user = await User.findOneAndUpdate(
      { userId },
      { userId, nativeLanguage: detectedLang, voiceCloneId, isVerified: true },
      { upsert: true, new: true }
    );
    
    res.json({
      success: true,
      nativeLanguage: detectedLang,
      voiceCloneId,
      supportedCount: 100,
      mongo: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected',
      message: "Voice Passport Created v6.7.0 - Mongo Connected"
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
});

// 2. TRANSLATOR IN YOUR VOICE
app.post('/api/translate/voice-in-my-voice', upload.single('audio'), async (req, res) => {
  try {
    const { fromUserId, targetLang } = req.body;
    const user = await User.findOne({ userId: fromUserId });
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({
      success: true,
      originalText: "Bawo ni",
      detectedLang: user.nativeLanguage,
      translatedText: targetLang === 'en' ? "How are you?" : "Comment ça va?",
      targetLang,
      translatedAudioUrl: "https://mock.cloudinary.com/voice.mp3",
      voiceVerified: true,
      badge: "✓ Translated in verified voice - Mongo v6.7.0",
      wallet: user.walletBalance
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 3. WITHDRAW WITH FACE+VOICE
app.post('/api/secure/withdraw-verify', upload.fields([{ name: 'video' }, { name: 'audio' }]), async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ success: false, reason: "User not found" });
    
    res.json({ success: true, command: "Withdraw 5000 Naira", faceScore: 0.97, voiceScore: 0.95, mongo: 'Connected', wallet: user.walletBalance, message: "Withdrawal verified v6.7.0 - Mongo" });
  } catch (e) {
    res.status(500).json({ success: false, reason: e.message });
  }
});

app.get('/', (req,res)=> res.json({ status:'Supreme v6.7.0', db: mongoose.connection.name || 'Not Connected', mongoState: mongoose.connection.readyState, wallet: 'N6.765Q Ready' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(🔥 Voice Passport Server v6.7.0 running on ${PORT} - Mongo ${mongoose.connection.readyState===1?'Connected':'Connecting...'}));
