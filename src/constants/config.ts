declare const process: {
  env: {
    [key: string]: string;
  };
};

export const BASE_URL: string = process.env.REACT_APP_BASE_URL;
