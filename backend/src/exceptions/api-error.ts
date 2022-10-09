class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message: string = 'Bad request') {
    return new ApiError(400, message);
  }

  static UnauthorizedError(message: string = 'Unauthorized user') {
    return new ApiError(401, message);
  }

  static Forbidden(message: string = 'Forbidden') {
    return new ApiError(403, message);
  }

  static TooManyRequests(message: string = 'Too many requests') {
    return new ApiError(429, message);
  }
}

export default ApiError;