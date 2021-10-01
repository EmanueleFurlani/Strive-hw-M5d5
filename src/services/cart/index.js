import { Router } from "express";
import db from "../../db/models/index.js";
import sequelize from "sequelize";
const { Cart, Product, Category } = db;
const router = Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
    const data = await Cart.findAll()
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
.route("/:categoryId/:productId")  
  .post(async (req, res, next) => {
    try {
        const { categoryId, productId } = req.params;
        const data = await Cart.create({ categoryId, productId });
        res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })  
  .delete(async (req, res, next) => {
    try {
        const { categoryId, productId } = req.params;
        const rowCount = await Cart.destroy({
        where: { categoryId, productId },
        limit: !req.query.all && 1,
        });

        if (rowCount > 1) {
        res.send("product removed from cart");
        } else if (rowCount === 1) {
        res.send("qty decreased");
        } else {
            res.status(404).send("not found");
        }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;