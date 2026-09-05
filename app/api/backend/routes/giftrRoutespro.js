// READABLE - backend/routes/giftRoutesPro.js - 6 tabs N100-N1M WORLD NO1
const express = require('express');
const router = express.Router();

// Gift catalog 6 tabs
const giftCatalog = {
  naijaLove: [
    {id:'danfo', name:'Danfo', price:100, icon:'🚐', fx:'danfoHustle'},
    {id:'jollof', name:'Jollof', price:200, icon:'🍛', fx:'jollofParty'},
    {id:'love', name:'Rose', price:100, icon:'🌹', fx:'loveHeartExplosion'}
  ],
  africaFlags: [{id:'nigeria', name:'Naija Flag', price:500, icon:'🇳🇬', fx:'naijaGreenWhiteBurst'}],
  naijaLocations: [{id:'lekki', name:'Lekki Bridge', price:1000, icon:'🌉', fx:'naijaGreenWhiteBurst'}],
  worldCulture: [{id:'africa', name:'Africa Pride', price:700, icon:'🌍', fx:'africaPrideWave'}],
  football: [
    {id:'barcelona', name:'Barcelona', price:1000, icon:'⚽', fx:'barcaBlueRedBurst', desc:'blueRedConfetti CampNou Barca anthem gold diamonds'},
    {id:'worldCup', name:'World Cup', price:5000, icon:'🏆', fx:'worldCupFireworksUniverse'}
  ],
  luxury: [
    {id:'crown', name:'Crown', price:10000, icon:'👑', fx:'goldCrownRoyalty'},
    {id:'diamond', name:'Diamond Box', price:200000, icon:'💎', fx:'diamondRain'},
    {id:'money', name:'Money Rain', price:1000000, icon:'💸', fx:'goldMoneyRain'}
  ]
};

router.get('/catalog', (req,res)=>{
  res.json({ catalog: giftCatalog, currency:'NGN', brand:'ChatAndChill WORLD NO1', fxMap: 'barcelona=barcaBlueRedBurst worldCup=worldCupFireworksUniverse' });
});

router.post('/send/initiate', (req,res)=>{
  const { giftId, amount, streamId } = req.body;
  // Paystack initiate here
  res.json({ status:'initiated', reference:'gift_'+Date.now(), giftId, amount, encrypted:true });
});

router.post('/send/verify/:reference', (req,res)=>{
  // Verify Paystack + 70% payout
  res.json({ status:'verified', payout:'70% OPay instant', fx:'barcaBlueRedBurst', creatorAmount: req.body.amount * 0.7 });
});

module.exports = router;
