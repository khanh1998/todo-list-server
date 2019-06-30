"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function readJson(fileName) {
  var jsonString = '';

  try {
    jsonString = _fs["default"].readFileSync(_path["default"].resolve(fileName));
  } catch (error) {
    console.error(error);
  }

  return JSON.parse(jsonString);
}

var devConst = readJson('dev-constant.json');
var development = {
  MONGO_URL: devConst.MONGO_URL,
  PORT: devConst.PORT,
  SECRET: devConst.SECRET
};
var test = {};
var production = {
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT
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

var caculated = getConfiguration(process.env.NODE_ENV);
var _default = {
  MONGO_URL: caculated.MONGO_URL,
  SECRET: caculated.SECRET,
  PORT: caculated.PORT
};
exports["default"] = _default;