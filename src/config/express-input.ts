import errorHandler from '../shared/middlewares/errorHandler';
import rateLimiter from '../shared/middlewares/rateLimiter';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Request, Response } from 'express';
import environment from '../config/environment';
import dotenv from 'dotenv';
dotenv.config();

export function configInput(app: Application) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(rateLimiter);
  app.use(errorHandler);
  setRoutes(app);
}

function setRoutes(app: Application) {
  app.get('/', (request: Request, response: Response) => {
    response.json({
      status: true,
      message: `Welcome To ${environment.appName}`
    });
  });
  app.get('/health', (request: Request, response: Response) => {
    response.json({
      status: true,
      message: `check for env variables: ${process.env.PORT} ${process.env.NODE_ENV}`
    });
  });
}
