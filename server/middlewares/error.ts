class HttpException extends Error {
  status: number;
  message: string;
  error_full?: string;

  constructor(status: number, message: string, error_full?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.error_full = error_full;
  }
}

export default HttpException;
