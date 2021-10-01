import express from "express";
import db from "../../db/models/index.js";
import sequelize from "sequelize";

const { Op } = sequelize;
const { Review, Product, Category, Cart } = db;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      // const data = await Product.findAll({
      //   include: [
      //     { model: Category, through: { attributes: [] } },
      //     Review,
      //   ]});
      // res.send(data)
       const data = await Product.findAll({
        // where: req.query.name
        //   ? { name: { [Op.iLike]: `%${req.query.name}%` } }
        //   : {},
        // include: 
        //   [Category, { model: Review, },], 
        //   where: req.query.category ? { name: req.query.category } : {},
            // include:[Review, Category, Cart],
     include:[{model:Review},Category],
            where:req.query.name?{
                [Op.or]:[
                    {name:{[Op.iLike]:`%${req.query.name}%`}}
                ]
            }:{},
      });
      res.send(data)

    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({
        where: { id: req.params.id },
      });
      if (rows > 0) {
        res.send(`Product with id: ${params.id} was DESTROYED`);
      } else {
        res.status(404).send("Not found.");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/addCategory").post(async (req, res, next) => {
  try {
    const data = await Cart.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
