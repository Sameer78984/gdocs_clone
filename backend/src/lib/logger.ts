import winston from 'winston';
import { env } from '../config/env';

const formats = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
];

if (env.NODE_ENV !== 'production') {
  formats.push(
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, stack, requestId, method, path, status, duration }) => {
      let log = `${timestamp} ${level}: ${message}`;
      
      // Append metadata if present
      if (requestId) {
        log += ` | ReqID: ${requestId} | ${method} ${path} | Status: ${status} | ${duration}ms`;
      }
      
      if (stack) {
        log += `\n${stack}`;
      }
      return log;
    })
  );
}

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(...formats),
  transports: [
    new winston.transports.Console(),
  ],
});
