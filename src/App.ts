import 'dotenv/config';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xssClean from 'xss-clean';

import errorHandler from './middlewares/errorHandler';
import healthRoute from './routes/healthRoute';

const {NODE_PORT, NODE_ENV, API_VERSION} = process.env;
const APP_PORT = NODE_PORT || 3000;
const app = express();

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

if (NODE_ENV === 'development') {
    app.use(
        morgan(
            ':remote-addr [:date[clf]] :method :url HTTP/:http-version" :status :res[content-length]',
        ),
    );
}

// Adding Routes...
app.use(`${API_VERSION}/health`, healthRoute);

app.use(errorHandler);

const server = app.listen(APP_PORT, () => {
    console.log(`The app is running on: http://localhost:${APP_PORT}`);
});

process.on('unhandledRejection', async (reason: Error) => {
    console.log(colors.bgRed(`[SERVER] Error! ${reason.message}`));
    server.close(() => process.exit(1));
});
