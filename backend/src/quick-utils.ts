import { getConnection } from 'typeorm';

type ValidationPayload = {
  message: string;
  fields?: Record<string, any>;
};

export class ValidationException extends Error {
  public fields?: any;

  constructor(payload: ValidationPayload) {
    super(payload.message);

    this.fields = payload.message;
  }
}

export function validationError(payload: ValidationPayload) {
  throw new ValidationException(payload);
}

export function query(sql: string, bindings: any[]) {
  return getConnection().query(sql, bindings);
}
