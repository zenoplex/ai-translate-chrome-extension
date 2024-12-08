export class FeatureNotAvailableError extends Error {
  override readonly name = 'FeatureNotAvailableError' as const;
  constructor(message: string, options?: { cause: unknown }) {
    super(message);
    this.name = 'FeatureNotAvailableError' as const;
    this.cause = options?.cause;
  }
}
