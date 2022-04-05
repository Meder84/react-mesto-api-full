class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;