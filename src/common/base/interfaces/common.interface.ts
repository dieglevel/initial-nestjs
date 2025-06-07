export interface IKeyAndValue<T, K extends keyof T = keyof T> {
  key: K;
  value: T[K] | Record<string, any>;
}
