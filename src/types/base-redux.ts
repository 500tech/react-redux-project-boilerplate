export interface BaseAction {
  type: string;
  meta?: {
    [key: string]: any;
    notifications?: {
      // TODO: remove this if not needed (not implemented, just a definition)
      success?: {
        title?: string;
        values?: object;
      };
    };
  };
  payload?: any;
}
