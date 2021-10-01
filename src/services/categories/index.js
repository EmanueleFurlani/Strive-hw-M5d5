import express from "express"
import db from "../../db/models/index.js"
import sequelize from "sequelize"

const { Op } = sequelize;
const { Review, Product, Category, Cart } = db

const router = express.Router()

router
.route("/")
.get(async (req,res,next)=>{
    try {
        const data = await Category.findAll()
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
      const data = await Category.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
.route("/:id")
.get(async (req,res,next)=>{
    try {
        const data = await Category.findByPk(req.params.id)
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
.put(async (req,res,next)=>{
    try {
        const data = await Category.update(req,body, {
            where: {id: req.params.id},
            returning: true
        })
        res.send(data)
    } catch (error) {
          console.log(error)
        next(error)
    }
})
.delete(async (req,res,next)=>{
    try {
        const rows = await Category.destroy({
            where: {id: req.params.id},
        })
        if (rows>0){
            res.send(`Review with id: ${params.id} was DESTROYED`)
        } else {
            res.status(404).send("not found")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default router;