const sequelize = require('../config/connection');
const { User, BlogEntry, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./projectData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await BlogEntry.create({
      ...blog,
      author_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      commentor_id: users[Math.floor(Math.random() * users.length)].id,
      entry_id: users[Math.floor(Math.random() * users.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();
