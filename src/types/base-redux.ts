export interface BaseAction {
  type: string;
  meta?: Record<string, any>;
  payload?: any;
}
