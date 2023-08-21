require('dotenv').config()
require('./database')

const Category = require('../models/category');
const { Item } = require('../models/item');

(async function() {

  await Category.deleteMany({})
  const categories = await Category.create([
    {name: 'Sandwiches', sortOrder: 10},
    {name: 'Seafood', sortOrder: 20},
    {name: 'Mexican', sortOrder: 30},
    {name: 'Italian', sortOrder: 40},
    {name: 'Sides', sortOrder: 50},
    {name: 'Desserts', sortOrder: 60},
    {name: 'Drinks', sortOrder: 70},
  ]);

  await Item.deleteMany({})

  const burgerDescription = 'Sink your teeth into a symphony of flavors with our Ultimate Gourmet Bacon-Stacked Burger, a culinary masterpiece that will tantalize your taste buds and leave you craving for more. Crafted to perfection, this burger is a true indulgence for burger aficionados seeking an extraordinary dining experience.'


  const items = await Item.create([
    {name: 'Burger', description: 'description here', emojiURL: 'https://i.imgur.com/Dqy1pob.jpg', category: categories[0], price: 5.95},
    {name: 'Turkey Sandwich', description: 'description here', emojiURL: 'https://i.imgur.com/EXSmypr.jpg', category: categories[0], price: 6.95},
    {name: 'Hot Dog', description: 'description here', emojiURL: 'https://i.imgur.com/gM4i2zx.jpg', category: categories[0], price: 3.95},
    {name: 'Crab Plate', description: 'description here', emojiURL: 'https://i.imgur.com/EKKvItD.jpg', category: categories[1], price: 14.95},
    {name: 'Fried Shrimp', description: 'description here', emojiURL: 'https://i.imgur.com/P2FUx9k.jpg', category: categories[1], price: 13.95},
    {name: 'Whole Lobster', description: 'description here', emojiURL: 'https://i.imgur.com/RMxvBpm.jpg', category: categories[1], price: 25.95},
    {name: 'Taco', description: 'description here', emojiURL: 'https://i.imgur.com/yaKpsm8.jpg', category: categories[2], price: 1.95},
    {name: 'Burrito', description: 'description here', emojiURL: 'https://i.imgur.com/Rj6swoZ.jpg', category: categories[2], price: 4.95},
    {name: 'Personal Pizza', description: 'description here', emojiURL: 'https://i.imgur.com/tDYOyvt.jpg', category: categories[3], price: 3.95},
    {name: 'Spaghetti', description: 'description here', emojiURL: 'https://i.imgur.com/mf42UMM.jpg', category: categories[3], price: 7.95},
    {name: 'Garlic Bread', description: 'description here', emojiURL: 'https://i.imgur.com/QHpiULB.jpg', category: categories[3], price: 1.95},
    {name: 'French Fries', description: 'description here', emojiURL: 'https://i.imgur.com/xSFJRPj.jpg', category: categories[4], price: 2.95},
    {name: 'Green Salad', description: 'description here', emojiURL: 'https://i.imgur.com/GnTEU1P.jpg', category: categories[4], price: 3.95},
    {name: 'Ice Cream', description: 'description here', emojiURL: 'https://i.imgur.com/IRKov1k.jpg', category: categories[5], price: 1.95},
    {name: 'Cup Cake', description: 'description here', emojiURL: 'https://i.imgur.com/3tmG1Mr.jpg', category: categories[5], price: 0.95},
    {name: 'Custard', description: 'description here', emojiURL: 'https://i.imgur.com/2txgorY.jpg', category: categories[5], price: 2.95},
    {name: 'Strawberry Shortcake', description: 'description here', emojiURL: 'https://i.imgur.com/QVcuX71.jpg', category: categories[5], price: 3.95},
    {name: 'Milk', description: 'description here', emojiURL: 'https://i.imgur.com/pUc7fjq.jpg', category: categories[6], price: 0.95},
    {name: 'Coffee', description: 'description here', emojiURL: 'https://i.imgur.com/etWtM3a.jpg', category: categories[6], price: 0.95},
    {name: 'Mai Tai', description: 'description here', emojiURL: 'https://i.imgur.com/XdntyaO.jpg', category: categories[6], price: 8.95},
    {name: 'Beer', description: 'description here', emojiURL: 'https://i.imgur.com/bDRrrT0.jpg', category: categories[6], price: 3.95},
    {name: 'Wine', description: 'description here', emojiURL: 'https://i.imgur.com/Ur457PM.jpg', category: categories[6], price: 7.95},
  ]);

  console.log(items)

  process.exit()

})()