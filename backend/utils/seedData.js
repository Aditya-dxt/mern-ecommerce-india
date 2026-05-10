const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const sneakers = [
  {
    name: 'Air Max Pulse',
    brand: 'Nike',
    description: 'The Air Max Pulse draws inspiration from the energy of London\'s music scene, bringing an iconic look with cutting-edge cushioning. Features visible Air units and a sleek, modern silhouette.',
    price: 149.99,
    compareAtPrice: 179.99,
    images: [
      '/images/sneakers/nike-air-max-pulse.png',
      '/images/sneakers/angles/nike-air-max-pulse-front.png',
      '/images/sneakers/angles/nike-air-max-pulse-back.png',
      '/images/sneakers/angles/nike-air-max-pulse-top.png'
    ],
    category: 'Running',
    sizes: [
      { size: '7', stock: 10 }, { size: '8', stock: 15 }, { size: '9', stock: 20 },
      { size: '10', stock: 18 }, { size: '11', stock: 12 }, { size: '12', stock: 8 }
    ],
    colors: ['Black/White', 'Pure Platinum'],
    featured: true,
    tags: ['running', 'air max', 'cushioned', 'bestseller']
  },
  {
    name: 'Ultraboost Light',
    brand: 'Adidas',
    description: 'Experience epic energy with the new Ultraboost Light. Our lightest Ultraboost ever features Light BOOST cushioning and a Continental rubber outsole.',
    price: 189.99,
    compareAtPrice: 219.99,
    images: [
      '/images/sneakers/adidas-ultraboost.png',
      '/images/sneakers/angles/adidas-ultraboost-front.png',
      '/images/sneakers/angles/adidas-ultraboost-back.png',
      '/images/sneakers/angles/adidas-ultraboost-top.png'
    ],
    category: 'Running',
    sizes: [
      { size: '7', stock: 8 }, { size: '8', stock: 14 }, { size: '9', stock: 16 },
      { size: '10', stock: 20 }, { size: '11', stock: 10 }, { size: '12', stock: 6 }
    ],
    colors: ['Core Black', 'Cloud White'],
    featured: true,
    tags: ['running', 'boost', 'lightweight', 'premium']
  },
  {
    name: 'Retro High OG Chicago',
    brand: 'Jordan',
    description: 'The Air Jordan 1 Retro High OG brings back the iconic Chicago colorway. Premium leather construction with the legendary Wings logo.',
    price: 179.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/jordan-1-chicago.png',
      '/images/sneakers/angles/jordan-1-chicago-front.png',
      '/images/sneakers/angles/jordan-1-chicago-back.png',
      '/images/sneakers/angles/jordan-1-chicago-top.png'
    ],
    category: 'Limited Edition',
    sizes: [
      { size: '8', stock: 5 }, { size: '9', stock: 8 }, { size: '10', stock: 6 },
      { size: '11', stock: 4 }, { size: '12', stock: 3 }
    ],
    colors: ['Varsity Red/White/Black'],
    featured: true,
    tags: ['jordan', 'retro', 'chicago', 'iconic', 'limited']
  },
  {
    name: '574 Core',
    brand: 'New Balance',
    description: 'The 574 is the quintessential New Balance sneaker. With its clean, classic design and ENCAP midsole cushioning, it delivers style and comfort.',
    price: 89.99,
    compareAtPrice: 99.99,
    images: [
      '/images/sneakers/nb-574.png',
      '/images/sneakers/angles/nb-574-front.png',
      '/images/sneakers/angles/nb-574-back.png',
      '/images/sneakers/angles/nb-574-top.png'
    ],
    category: 'Casual',
    sizes: [
      { size: '7', stock: 20 }, { size: '8', stock: 25 }, { size: '9', stock: 30 },
      { size: '10', stock: 25 }, { size: '11', stock: 15 }, { size: '12', stock: 10 }
    ],
    colors: ['Grey/Navy', 'Black/White'],
    featured: false,
    tags: ['casual', 'classic', 'comfortable', 'everyday']
  },
  {
    name: 'RS-X Reinvention',
    brand: 'Puma',
    description: 'Bold, bulky, and unapologetically retro. The RS-X Reinvention takes the chunky sneaker trend to new heights with its oversized design and vibrant colors.',
    price: 109.99,
    compareAtPrice: 129.99,
    images: [
      '/images/sneakers/puma-rsx.png',
      '/images/sneakers/angles/puma-rsx-front.png',
      '/images/sneakers/angles/puma-rsx-back.png',
      '/images/sneakers/angles/puma-rsx-top.png'
    ],
    category: 'Casual',
    sizes: [
      { size: '7', stock: 12 }, { size: '8', stock: 18 }, { size: '9', stock: 22 },
      { size: '10', stock: 16 }, { size: '11', stock: 10 }, { size: '12', stock: 8 }
    ],
    colors: ['White/Royal Blue', 'Black/High Risk Red'],
    featured: false,
    tags: ['casual', 'retro', 'chunky', 'colorful']
  },
  {
    name: 'Dunk Low Retro',
    brand: 'Nike',
    description: 'Created for the hardwood but taken to the streets. The Nike Dunk Low Retro returns with crisp overlays and original team colors.',
    price: 109.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/nike-dunk-low.png',
      '/images/sneakers/angles/nike-dunk-low-front.png',
      '/images/sneakers/angles/nike-dunk-low-back.png',
      '/images/sneakers/angles/nike-dunk-low-top.png'
    ],
    category: 'Casual',
    sizes: [
      { size: '7', stock: 15 }, { size: '8', stock: 20 }, { size: '9', stock: 25 },
      { size: '10', stock: 22 }, { size: '11', stock: 14 }, { size: '12', stock: 10 }
    ],
    colors: ['Panda', 'Grey Fog'],
    featured: true,
    tags: ['dunk', 'retro', 'streetwear', 'trending']
  },
  {
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    description: 'The Yeezy Boost 350 V2 features a Primeknit upper with a lateral stripe and full-length Boost cushioning. Iconic silhouette designed by Kanye West.',
    price: 229.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/yeezy-350.png',
      '/images/sneakers/angles/yeezy-350-front.png',
      '/images/sneakers/angles/yeezy-350-back.png',
      '/images/sneakers/angles/yeezy-350-top.png'
    ],
    category: 'Limited Edition',
    sizes: [
      { size: '8', stock: 4 }, { size: '9', stock: 6 }, { size: '10', stock: 5 },
      { size: '11', stock: 3 }, { size: '12', stock: 2 }
    ],
    colors: ['Onyx', 'Bone'],
    featured: true,
    tags: ['yeezy', 'boost', 'limited', 'hype', 'premium']
  },
  {
    name: 'Zoom Pegasus 41',
    brand: 'Nike',
    description: 'A responsive satisfying ride for everyday runs. The Pegasus 41 features ReactX foam and Zoom Air units for springy, cushioned comfort.',
    price: 139.99,
    compareAtPrice: 159.99,
    images: [
      '/images/sneakers/nike-pegasus.png',
      '/images/sneakers/angles/nike-pegasus-front.png',
      '/images/sneakers/angles/nike-pegasus-back.png',
      '/images/sneakers/angles/nike-pegasus-top.png'
    ],
    category: 'Running',
    sizes: [
      { size: '7', stock: 18 }, { size: '8', stock: 22 }, { size: '9', stock: 28 },
      { size: '10', stock: 24 }, { size: '11', stock: 16 }, { size: '12', stock: 12 }
    ],
    colors: ['Black/White', 'Volt/Barely Volt'],
    featured: false,
    tags: ['running', 'pegasus', 'daily trainer', 'cushioned']
  },
  {
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    description: 'The icon that started it all. The Chuck Taylor All Star has been a cultural staple since 1917, featuring its signature canvas upper and vulcanized rubber sole.',
    price: 64.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/converse-chuck.png',
      '/images/sneakers/angles/converse-chuck-front.png',
      '/images/sneakers/angles/converse-chuck-back.png',
      '/images/sneakers/angles/converse-chuck-top.png'
    ],
    category: 'Casual',
    sizes: [
      { size: '6', stock: 30 }, { size: '7', stock: 35 }, { size: '8', stock: 40 },
      { size: '9', stock: 35 }, { size: '10', stock: 30 }, { size: '11', stock: 20 },
      { size: '12', stock: 15 }
    ],
    colors: ['Black', 'White', 'Red'],
    featured: false,
    tags: ['classic', 'canvas', 'iconic', 'casual']
  },
  {
    name: 'LeBron XXI',
    brand: 'Nike',
    description: 'Built for the king of the court. The LeBron XXI features Zoom Air cushioning and a supportive midfoot strap for explosive performance.',
    price: 199.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/nike-lebron.png',
      '/images/sneakers/angles/nike-lebron-front.png',
      '/images/sneakers/angles/nike-lebron-back.png',
      '/images/sneakers/angles/nike-lebron-top.png'
    ],
    category: 'Sports',
    sizes: [
      { size: '8', stock: 10 }, { size: '9', stock: 14 }, { size: '10', stock: 16 },
      { size: '11', stock: 12 }, { size: '12', stock: 8 }, { size: '13', stock: 5 }
    ],
    colors: ['Violet Dust', 'Black/Metallic Gold'],
    featured: true,
    tags: ['basketball', 'lebron', 'performance', 'premium']
  },
  {
    name: 'Old Skool',
    brand: 'Vans',
    description: 'The Vans Old Skool is the brand\'s classic skate shoe featuring the iconic side stripe. Durable canvas and suede upper with padded collars.',
    price: 69.99,
    compareAtPrice: 0,
    images: [
      '/images/sneakers/vans-old-skool.png',
      '/images/sneakers/angles/vans-old-skool-front.png',
      '/images/sneakers/angles/vans-old-skool-back.png',
      '/images/sneakers/angles/vans-old-skool-top.png'
    ],
    category: 'Casual',
    sizes: [
      { size: '6', stock: 25 }, { size: '7', stock: 30 }, { size: '8', stock: 35 },
      { size: '9', stock: 30 }, { size: '10', stock: 25 }, { size: '11', stock: 18 },
      { size: '12', stock: 12 }
    ],
    colors: ['Black/White', 'Navy/White'],
    featured: false,
    tags: ['skate', 'classic', 'casual', 'streetwear']
  },
  {
    name: 'Gel-Kayano 30',
    brand: 'Other',
    description: 'ASICS Gel-Kayano 30 delivers maximum stability with FF BLAST PLUS cushioning. The engineered mesh upper provides breathable support for long-distance runs.',
    price: 159.99,
    compareAtPrice: 189.99,
    images: [
      '/images/sneakers/asics-kayano.png',
      '/images/sneakers/angles/asics-kayano-front.png',
      '/images/sneakers/angles/asics-kayano-back.png',
      '/images/sneakers/angles/asics-kayano-top.png'
    ],
    category: 'Running',
    sizes: [
      { size: '7', stock: 12 }, { size: '8', stock: 16 }, { size: '9', stock: 20 },
      { size: '10', stock: 18 }, { size: '11', stock: 10 }, { size: '12', stock: 8 }
    ],
    colors: ['Black/White', 'French Blue'],
    featured: false,
    tags: ['running', 'stability', 'cushioned', 'marathon']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@sneakervault.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create demo user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user'
    });

    // Insert products
    await Product.insertMany(sneakers);

    console.log('✅ Database seeded successfully!');
    console.log('   Admin: admin@sneakervault.com / admin123');
    console.log('   User: john@example.com / user123');
    console.log(`   Products: ${sneakers.length} sneakers added`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
