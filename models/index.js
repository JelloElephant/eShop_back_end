// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, { foreingKey: 'category_id', onDelete: 'CASCADE' })
// Categories have many Products
Category.hasMany(Product, { foreingKey: 'category_id', onDelete: 'CASCADE'})
// Products belongToMany Tags (through ProductTag) need froigen keys
Product.belongsToMany(Tag, { through: 'ProductTag', foreignKey: 'product_id' })
// Tags belongToMany Products (through ProductTag) need froigen keys
Tag.belongsToMany(Product, { through: 'ProductTag', foreignKey: 'tag_id' })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
