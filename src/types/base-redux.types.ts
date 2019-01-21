export interface BaseAction {
  type: string;
  meta?: {
    [key: string]: any;
    notifications?: {
      success?: {
        title?: string;
        values?: object;
      };
    };
  };
  payload?: any;
}
