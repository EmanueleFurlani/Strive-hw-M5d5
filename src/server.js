import express from "express"
import { syncQuelize } from "./db/index.js";
import cors from "cors"
import reviewsRouter from "./services/reviews/index.js";
import productsRouter from "./services/products/index.js";
import categoriesRouter from "./services/categories/index.js";
import cartRoutes from "./services/cart/index.js"

const server = express()

const { PORT } = process.env

server.use(cors())
server.use(express.json())

server.use("/reviews", reviewsRouter);
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/categories", categoriesRouter);
server.use("/carts", cartRoutes);

server.listen(PORT, async()=>{
    try {
        await syncQuelize();
        console.log("Server is running")
        
    } catch (error) {
        console.log(error)
    }
})