export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const asyncLoading = <T>(): AsyncState<T> => ({
  data: null,
  loading: true,
  error: null,
});

export const asyncSuccess = <T>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
});

export const asyncError = <T>(error: string): AsyncState<T> => ({
  data: null,
  loading: false,
  error,
});
