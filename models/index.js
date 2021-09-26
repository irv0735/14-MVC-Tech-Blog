const User = require('./User');
const BlogEntry = require('./BlogEntry');
const Comment = require('./Comment');

User.hasMany(BlogEntry, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'commentor_id',
  onDelete: 'CASCADE'
});

BlogEntry.belongsTo(User, {
  foreignKey: 'author_id'
});

BlogEntry.hasMany(Comment, {
  foreignKey: 'commentor_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(BlogEntry, {
  foreignKey: 'entry_id'
});

Comment.belongsTo(User, {
  foreignKey: 'commentor_id'
});

module.exports = { User, Comment, BlogEntry };
