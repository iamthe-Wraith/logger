const fs = require('fs');
const os = require('os');
const path = require('path');
const _colors = require('colors');

const validColors = new Set([
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
  'rainbow',
  'zebra',
  'america',
  'trap',
  'random'
]);

const validStyles = new Set([
  'title',
  'gen',
  'success',
  'warn',
  'error',
  'debug',
  'complete'
]);

const defaultColors = {
  title: 'cyan',
  gen: 'white',
  success: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'gray',
  complete: 'rainbow'
};

class Logger {
  static colors = (() => {
    _colors.setTheme(defaultColors);
    return defaultColors;
  })();

  /**
   * initialize logger with log path and colors
   * 
   * @param {Object} context - the cli context
   * @param {{colors: Object<string, string>}} context.config
   */
  static init({ colors = {} }) {
    // add colors to class
    if (typeof colors === 'object') {
      const validatedColors = Object.entries(colors)
        .reduce((acc, [style, color]) => {
          if (!validStyles.has(style)) {
            Logger.warn(`invalid style 'colors.${style}'`);
            return acc;
          }

          if (!validColors.has(color)) {
            Logger.warn(`invalid color '${color}' for option 'colors.${style}'`)
            return acc;
          }

          return { ...acc, [style]: color };
        }, {});

      Logger.colors = { ...defaultColors, ...validatedColors };
      _colors.setTheme(Logger.colors);
    }
  }

  /**
   * proxies console log at a given level (default or error) call
   * and adds color to string arguments
   * 
   * @param {string} style - the style to log with
   * @param {Array<any>} args
   */
  static _logWithStyle = (style, level, ...args) => {
    console[level || 'log'](...args.map(arg => typeof arg === 'string' ? arg[Logger.colors[style]] : arg));
  }

  static title = (...args) =>
    Logger._logWithStyle('title', null, ...args);
  
  static gen = (...args) =>
    Logger._logWithStyle('gen', null, ...args);

  static success = (...args) => 
    Logger._logWithStyle('success', null, ...args);

  static warn = (...args) =>
    Logger._logWithStyle('warn', null, ...args);
  
  static error = (...args) =>
    Logger._logWithStyle('error', 'error', ...args);

  static debug = (...args) =>
    Logger._logWithStyle('debug', null, ...args);
  
  static complete = (...args) =>
    Logger._logWithStyle('complete', null, ...args);
}

module.exports = {
  validColors,
  validStyles,
  defaultColors,
  Logger
};
