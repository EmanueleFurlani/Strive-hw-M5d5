import Review from "./Review.js"
import Product from "./Product.js"
import Category from "./Category.js"
import Cart from "./Cart.js"

Product.hasMany(Review,{
  onDelete: "cascade",
  foreignKey: { allowNull: false },
});
Review.belongsTo(Product,{
  onDelete: "cascade",
  foreignKey: { allowNull: false },
});

Product.belongsToMany(Category, {
  through: { model: Cart, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: Cart, unique: false },
});

Cart.belongsTo(Product);
Product.hasMany(Cart)


export default { Review, Product, Category, Cart };