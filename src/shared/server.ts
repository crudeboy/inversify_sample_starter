import environment from '../config/environment';

(async () => {
  try {
    const App = require('./app').default;
    const server = new App();
    const app = server.getServer().build();

    let PORT = environment.port;
    app.listen(PORT);
    console.log(`App strated on port: ${PORT}`);
  } catch (err: any) {
    console.log(err, 'err');
    console.error('Something went wrong when initializing the server:\n', err.stack);
  }
})();
