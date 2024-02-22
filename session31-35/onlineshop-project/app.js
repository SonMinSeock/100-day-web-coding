const express = require("express");
const path = require("path");
const csrf = require("csurf");
const expressSession = require("express-session");
const authRouter = require("./routes/auth.routes");
const productsRouter = require("./routes/products.routes");
const baseRouter = require("./routes/base.routes");
const adminRouter = require("./routes/admin.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/orders.routes");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandleMinddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const createSessionConfig = require("./config/session");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddeleware = require("./middlewares/cart");

const PORT = 3000;
const sessionConfig = createSessionConfig();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/prodcuts/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddeleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(baseRouter);
app.use(authRouter);
app.use(productsRouter);
app.use("/cart", cartRouter);
app.use(protectRoutesMiddleware);
app.use("/orders", orderRouter);
app.use("/admin", adminRouter);
app.use(errorHandleMinddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(PORT, () => {
      console.log(`localhost:${PORT} SERVER RUNING`);
    });
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
