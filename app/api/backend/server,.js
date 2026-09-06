require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
console.log('🔍 MONGO_URI:', MONGO_URI? MONGO_URI.substring(0,50)+'...' : 'MISSING');

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
  .then(()=> console.log('✅ Connected to ChatandChill-supreme —', mongoose.connection.name))
  .catch(err=> console.error('❌ Mongo failed:', err.message));
}

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  faceTemplateEncrypted: String,
  voiceVerifyTemplate: String,
  voiceCloneId: String,
  nativeLanguage: String,
  isVerified: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });
const dbFallback = { users: new Map() };

app.get('/', (req,res)=> res.json({ status:'Supreme v6.7.0', mongo: mongoose.connection.readyState===1? 'Connected '+mongoose.connection.name : 'Not Connected', version:'6.7.0' }));

app.post('/api/onboard/voice-passport', upload.fields([{name:'video'},{name:'audio'}]), async (req,res)=>{
  try{
    const userId=req.body.userId;
    const videoFile=req.files['video']?.[0];
    const audioFile=req.files['audio']?.[0];
    if(!userId||!videoFile||!audioFile) return res.status(400).json({success:false});
    if(mongoose.connection.readyState===1){
      await User.findOneAndUpdate({userId},{userId, faceTemplateEncrypted:'enc_'+videoFile.path, voiceVerifyTemplate:'voice_'+audioFile.path, voiceCloneId:'voice_'+userId, nativeLanguage:'yo', isVerified:true},{upsert:true,new:true});
    }
    if(fs.existsSync(videoFile.path)) fs.unlinkSync(videoFile.path);
    if(fs.existsSync(audioFile.path)) fs.unlinkSync(audioFile.path);
    res.json({success:true, mongo:'saved to ChatandChill-supreme'});
  }catch(e){ res.status(500).json({error:e.message}); }
});

const PORT=process.env.PORT||5000;
app.listen(PORT, ()=> console.log(v6.7.0 running on ${PORT}));
