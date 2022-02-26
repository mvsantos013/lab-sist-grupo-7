class SingletonLoadError extends Error {
  constructor(message) {
    super('ERROR LOADING SINGLETON: ' + message);
  }
}

export default SingletonLoadError;
