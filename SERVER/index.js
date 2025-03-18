require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/mongo_db")();
const authRouter = require("./routers/auth_router");
const role_router = require("./routers/role_router");
const setterDataRouter = require("./routers/setter_data");
const testRouter = require("./routers/test_router");
const employeeRouter = require("./routers/test_router");
const supplyRouter = require("./routers/test_router");
const inventoryRouter = require("./routers/test_router");
const transactionRouter = require("./routers/test_router");

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: [
      process.env.CLIENT1,
      // list more allowed origins
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ROUTES

app.use(employeeRouter);
app.use(supplyRouter);
app.use(inventoryRouter);
app.use(transactionRouter);

app.use(setterDataRouter);

app.use(authRouter);
app.use(role_router);

app.use(testRouter);

app.get("/", (req, res) => res.json({ message: "server is UP!" }));
app.listen(process.env.APP_PORT, () =>
  console.log(`🚀: http://localhost:${process.env.APP_PORT}`)
);
