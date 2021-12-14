const ERROR_PREFIX = 'miracle error: '
export default function throwError(errorMsg: string): void {
  new Error(`${ERROR_PREFIX}${errorMsg}`);
}