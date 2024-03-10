class errorBasis extends Error {
  cause: Error | undefined;
  property: string | undefined;
  statusCode: number | undefined;

  constructor(message: string, cause?: Error, property?: string, statusCode?: number) {
    super(message);
    this.cause = cause;
    this.property = property;
    this.statusCode = statusCode;
  }

  get Cause() {
    return this.cause;
  }
}

export class ConflictError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export class BusinessError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "BusinessError";
    this.statusCode = 500;
  }
}

export class TimeoutError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "TimeoutError";
  }
}

export class BadRequestError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

export class NotFoundError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class InternalServerError extends errorBasis {
  constructor(message: string, cause?: Error, property?: string) {
    super(message, cause, property);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

export const notFoundCustomer = new Error("costumer not found");
export const customerFieldsEmpty = new Error("no valid field to update in customer");
export const needADocument = new BadRequestError("at least one document required");

export const isError = (error: Error) => {
  return error instanceof Error;
};
