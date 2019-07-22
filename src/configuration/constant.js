import fs from 'fs';
import path from 'path';

function readJson(fileName) {
  let jsonString = '';
  try {
    jsonString = fs.readFileSync(path.resolve(fileName));
  } catch (error) {
    console.error(error);
  }
  return JSON.parse(jsonString);
}

const devConst = readJson('dev-constant.json');

const development = {
  MONGO_URL: devConst.MONGO_URL,
  PORT: devConst.PORT,
  SECRET: devConst.SECRET,
  HOST: `${devConst.HOST}:${devConst.PORT}`,
};

const test = {

};

const production = {
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

function getConfiguration(env) {
  switch (env) {
    case 'dev':
      return development;
    case 'test':
      return test;
    default:
      return production;
  }
}

const caculated = getConfiguration(process.env.NODE_ENV);

export default {
  MONGO_URL: caculated.MONGO_URL,
  SECRET: caculated.SECRET,
  PORT: caculated.PORT,
  HOST: caculated.HOST,
};
