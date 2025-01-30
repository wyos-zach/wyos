export class DataAccessError extends Error {
  constructor(
    public readonly code: number,
    message: string
  ) {
    super(message);
    this.name = 'DataAccessError';
  }
}
