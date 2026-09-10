export type GiftCategory = 'Naija' | 'Clubs' | 'Luxury' | 'Animals' | 'Adventure'

export type Gift = {
  id: string
  name: string
  emoji: string
  amount: number
  category: GiftCategory
  image: string
}

const pexels = (path: string) => `https://images.pexels.com/${path}?auto=compress&w=800`

export const giftCatalog: Gift[] = [
  { id: 'danfo', name: 'Danfo', emoji: '🚌', amount: 100, category: 'Naija', image: pexels('photos/2402638/pexels-photo-2402638.jpeg') },
  { id: 'jollof', name: 'Jollof', emoji: '🍛', amount: 200, category: 'Naija', image: pexels('photos/958545/pexels-photo-958545.jpeg') },
  { id: 'suya', name: 'Suya', emoji: '🍢', amount: 150, category: 'Naija', image: pexels('photos/2233729/pexels-photo-2233729.jpeg') },
  { id: 'puff-puff', name: 'Puff Puff', emoji: '🍩', amount: 100, category: 'Naija', image: pexels('photos/3026804/pexels-photo-3026804.jpeg') },
  { id: 'naija', name: 'Naija', emoji: '🇳🇬', amount: 500, category: 'Naija', image: pexels('photos/3185083/pexels-photo-3185083.jpeg') },
  { id: 'barcelona', name: 'Barcelona', emoji: '🔵🔴', amount: 1000, category: 'Clubs', image: pexels('photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg') },
  { id: 'real-madrid', name: 'Real Madrid', emoji: '⚪', amount: 1000, category: 'Clubs', image: pexels('photos/399187/pexels-photo-399187.jpeg') },
  { id: 'man-utd', name: 'Man Utd', emoji: '🔴', amount: 1000, category: 'Clubs', image: pexels('photos/3076516/pexels-photo-3076516.jpeg') },
  { id: 'man-city', name: 'Man City', emoji: '🩵', amount: 1000, category: 'Clubs', image: pexels('photos/399187/pexels-photo-399187.jpeg') },
  { id: 'liverpool', name: 'Liverpool', emoji: '🔴', amount: 1000, category: 'Clubs', image: pexels('photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg') },
  { id: 'chelsea', name: 'Chelsea', emoji: '🔵', amount: 1000, category: 'Clubs', image: pexels('photos/3076516/pexels-photo-3076516.jpeg') },
  { id: 'arsenal', name: 'Arsenal', emoji: '🔴⚪', amount: 1000, category: 'Clubs', image: pexels('photos/399187/pexels-photo-399187.jpeg') },
  { id: 'psg', name: 'PSG', emoji: '🔵🔴', amount: 1000, category: 'Clubs', image: pexels('photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg') },
  { id: 'bayern', name: 'Bayern', emoji: '🔴', amount: 1000, category: 'Clubs', image: pexels('photos/399187/pexels-photo-399187.jpeg') },
  { id: 'world-cup', name: 'World Cup', emoji: '🏆', amount: 5000, category: 'Clubs', image: pexels('photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg') },
  { id: 'crown', name: 'Crown', emoji: '👑', amount: 10000, category: 'Luxury', image: pexels('photos/1445238/pexels-photo-1445238.jpeg') },
  { id: 'diamond', name: 'Diamond', emoji: '💎', amount: 200000, category: 'Luxury', image: pexels('photos/1445238/pexels-photo-1445238.jpeg') },
  { id: 'money-rain', name: 'Money Rain', emoji: '💸', amount: 1000000, category: 'Luxury', image: pexels('photos/164527/pexels-photo-164527.jpeg') },
  { id: 'lion', name: 'Lion', emoji: '🦁', amount: 3000, category: 'Animals', image: pexels('photos/247615/pexels-photo-247615.jpeg') },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', amount: 2000, category: 'Animals', image: pexels('photos/1054655/pexels-photo-1054655.jpeg') },
  { id: 'gorilla', name: 'Gorilla', emoji: '🦍', amount: 3500, category: 'Animals', image: pexels('photos/1200489/pexels-photo-1200489.jpeg') },
  { id: 'cheetah', name: 'Cheetah', emoji: '🐆', amount: 3000, category: 'Animals', image: pexels('photos/33045/lion-wild-africa-african.jpg') },
  { id: 'eagle', name: 'Eagle', emoji: '🦅', amount: 2500, category: 'Animals', image: pexels('photos/133459/pexels-photo-133459.jpeg') },
  { id: 'tiger', name: 'Tiger', emoji: '🐅', amount: 3500, category: 'Animals', image: pexels('photos/247615/pexels-photo-247615.jpeg') },
  { id: 'wolf', name: 'Wolf', emoji: '🐺', amount: 2500, category: 'Animals', image: pexels('photos/1341452/pexels-photo-1341452.jpeg') },
  { id: 'bear', name: 'Bear', emoji: '🐻', amount: 3000, category: 'Animals', image: pexels('photos/158109/kodiak-brown-bear-adult-portrait-158109.jpeg') },
  { id: 'shark', name: 'Shark', emoji: '🦈', amount: 4000, category: 'Animals', image: pexels('photos/2570524/pexels-photo-2570524.jpeg') },
  { id: 'dragon', name: 'Dragon', emoji: '🐉', amount: 10000, category: 'Animals', image: pexels('photos/247615/pexels-photo-247615.jpeg') },
  { id: 'phoenix', name: 'Phoenix', emoji: '🔥', amount: 8000, category: 'Animals', image: pexels('photos/133459/pexels-photo-133459.jpeg') },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄', amount: 5000, category: 'Animals', image: pexels('photos/1996333/pexels-photo-1996333.jpeg') },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', amount: 5000, category: 'Adventure', image: pexels('photos/2159/flight-sky-earth-space.jpg') },
  { id: 'fire', name: 'Fire', emoji: '🔥', amount: 3000, category: 'Adventure', image: pexels('photos/207353/pexels-photo-207353.jpeg') },
  { id: 'star', name: 'Star', emoji: '⭐', amount: 2000, category: 'Adventure', image: pexels('photos/2150/sky-space-dark-galaxy.jpg') },
  { id: 'gold', name: 'Gold', emoji: '✨', amount: 25000, category: 'Luxury', image: pexels('photos/1453005/pexels-photo-1453005.jpeg') },
]
