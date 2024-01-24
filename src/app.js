import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import fs from "fs";
import { createServer } from "http";
import passport from "passport";
import path from "path";
import requestIp from "request-ip";
// import { Server } from "socket.io";
// import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yaml";
import { DB_NAME } from "./constants.js";
import { dbInstance } from "./db/index.js";
// import { initializeSocketIO } from "./socket/index.js";
// import { ApiError } from "./utils/ApiError.js";
// import { ApiResponse } from "./utils/ApiResponse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
// const swaggerDocument = YAML.parse(file);

const app = express();

const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   pingTimeout: 60000,
//   cors: {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   },
// });

// app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

// global middlewares
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(requestIp.mw());

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

// required for passport
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

export { httpServer };
