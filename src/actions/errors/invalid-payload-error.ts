export class InvalidPayloadError extends Error {
  constructor() {
    super(
      `Oops! It looks like you're trying to send a request with an invalid payload`
    );
  }
}
