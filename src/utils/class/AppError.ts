export class AppError extends Error {
  constructor(
    message: string,
    public type: "api" | "network" | "validation" | "unknown",
    public statusCode?: number,
  ) {
    super(message);
  }
}
