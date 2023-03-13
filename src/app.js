const authRoute = require("./routes/auth-route");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authenticateMiddleware = require("./middlewares/authenticate");
const foodProductRoute = require("./routes/food_product-route");
const orderRoute = require("./routes/order-route");
const app = express();

// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
// app.use("/order", authenticateMiddleware, orderRoute);

app.use("/order", authenticateMiddleware, orderRoute);

app.use("/food_product", authenticateMiddleware, foodProductRoute);
// app.use("/food_product", foodProductRoute);

const port = 8080;

app.listen(port, () => {
  console.log(`this server running on port ${port}`);
});
