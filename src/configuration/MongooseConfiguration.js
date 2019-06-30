import mongoose from 'mongoose';
import config from './constant';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

try {
  mongoose.connect(config.MONGO_URL, options);
} catch (error) {
  mongoose.createConnection(config.MONGO_URL, options);
}

const { connection } = mongoose;
connection.on('error', () => console.log('Database Connection error'));
connection.on('connected', () => console.log('Database Connnection successfully'));
connection.on('disconnected', () => console.log('Database disconnected'));
connection.on('SIGINT', () => console.log('Connnection terminated'));
