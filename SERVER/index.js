require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/mongo_db")();
const auth_router = require("./routers/auth_router");
const role_router = require("./routers/role_router");
const setterDataRouter = require("./routers/setter_data");
const testRouter = require("./routers/test_router");

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
app.use(setterDataRouter);

app.use(auth_router);
app.use(role_router);

app.get("/", (req, res) => res.json({ message: "server is UP!" }));
app.use(testRouter);

app.listen(process.env.APP_PORT, () =>
  console.log(`🚀: http://localhost:${process.env.APP_PORT}`)
);
