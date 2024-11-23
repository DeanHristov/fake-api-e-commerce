/* eslint-disable  no-console */

import 'dotenv/config';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan'; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xssClean from 'xss-clean';

import FakeDB from '@/core/FakeDB';
import healthRoute from '@/routes/healthRoute';
import productsRoute from '@/routes/productsRoute';
import cartRouter from '@/routes/cartRouter';
import errorHandler from '@/middlewares/errorHandler';
import usersRoute from '@/routes/usersRoute';
import authRoute from '@/routes/authRoute';

const { NODE_PORT, NODE_ENV, API_VERSION } = process.env;
const APP_PORT = NODE_PORT || 3000;
const app: Express = express();

if (NODE_ENV === 'development') {
  app.use(
    morgan(
      ':remote-addr [:date[clf]] :method :url HTTP/:http-version" :status :res[content-length]',
    ),
  );
}

app.locals.db = FakeDB.getInstance();

app.use(express.json());
app.use(express.urlencoded());

// Prevent XSS attacks
app.use(xssClean());

// Set security headers
app.use(helmet());

app.use(cookieParser());
app.use(hpp());

// Enable CORS
app.use(cors());

// Prevent multiple request from one client per 10 minutes
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

// Adding Routes...
app.use(`${API_VERSION}/health`, healthRoute);
app.use(`${API_VERSION}/products`, productsRoute);
app.use(`${API_VERSION}/carts`, cartRouter);
app.use(`${API_VERSION}/users`, usersRoute);
app.use(`${API_VERSION}/auth`, authRoute);

app.use(errorHandler);

const server = app.listen(APP_PORT, () => {
  console.log(
    `The app is running on: http://localhost:${APP_PORT}${API_VERSION}/`,
  );
});

process.on('unhandledRejection', async (reason: Error) => {
  console.log(colors.bgRed(`[SERVER] Error! ${reason.message}`));
  server.close(() => process.exit(1));
});
