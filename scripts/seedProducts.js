const connectdb = require('../config/db');
const Product = require('../model/Product');
const dotenv = require('dotenv');

dotenv.config();

const seedProducts = async () => {
  try {
    await connectdb();

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log('Products already exist in DB. Skipping seed.');
      process.exit(0);
    }

    const products = [
      { name: 'Classic Coffee Mug', price: 100, description: 'A durable, ceramic mug perfect for your morning brew. Holds 12oz.', stock: 50, category: 'Home', image: '' },
      { name: 'Noise-Cancelling Headphones', price: 1299, description: 'Immersive audio experience with industry-leading noise cancellation. 30-hour battery life.', stock: 20, category: 'Electronics', image: '' },
      { name: 'Leather Wallet', price: 250, description: 'Slim profile wallet made from genuine, sustainable leather. Holds 6 cards.', stock: 100, category: 'Accessories', image: '' },
      { name: 'Gaming Chair', price: 15000, description: 'Full back support and adjustable lumbar pillow for maximum comfort during long gaming sessions.', stock: 10, category: 'Furniture', image: '' },
      { name: 'Dell inspiron 15', price: 53000, description: 'Good laptop for doing office tasks and a midrange gaming and editing!', stock: 5, category: 'Computers', image: '' },
    ];

    await Product.insertMany(products);
    console.log('✅ Seeded products successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seedProducts();
