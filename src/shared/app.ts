require('module-alias/register');
import container from '../config/ioc';
import { InversifyExpressServer } from 'inversify-express-utils';
import { configInput } from '../config/express-input';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

export default class App {
  private app: InversifyExpressServer;

  constructor() {
    this.app = new InversifyExpressServer(container, null, {
      rootPath: '/api/v1'
    });

    this.app.setConfig((app: any) => {
      // Disable express signature
      app.disable('x-powered-by');

      // configure cors
      app.use(cors({ origin: true, credentials: true, maxAge: 60 * 60 * 24 * 365 }));

      configInput(app);
    });

    this.app.setErrorConfig((app: any) => {
      app.use(errorHandler);
    });
  }

  getApp() {
    return this.app;
  }

  getServer(): InversifyExpressServer {
    return this.app;
  }
}
