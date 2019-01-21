type logLevel = 'log' | 'info' | 'warn' | 'error';

function print(level: logLevel, ...args: any[]) {
  if (process.env.DEBUG) {
    console[level](...args);
  }
}

export function log(...args: any[]): void {
  print('log', ...args);
}

export function info(...args: any[]): void {
  print('info', ...args);
}

export function warn(...args: any[]): void {
  print('warn', ...args);
}

export function error(...args: any[]): void {
  print('error', ...args);
}
