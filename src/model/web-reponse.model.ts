export interface WebResponse<T> {
  data?: T;
  message?: string;
  error?: string | null;
  statusCode?: number;
}
