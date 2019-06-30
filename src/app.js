import '@babel/polyfill';
import http from 'http';
import { ConfigureExpress } from './configuration/ExpressConfiguration';
import config from './configuration/constant';

const app = ConfigureExpress();
const server = http.createServer(app);

server.listen(config.PORT, () => console.log(`Server is running or port ${config.PORT}`));
