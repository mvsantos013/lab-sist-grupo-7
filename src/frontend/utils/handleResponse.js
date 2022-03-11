export const handleResponse = async (request) => {
  return new Promise((resolve, reject) => {
    request
      .then((response) => {
        const responseKeys = Object.keys(response);
        if (responseKeys.includes('error')) {
          return reject(response.error);
        } else if (responseKeys.includes('result')) {
          return resolve(response.result);
        } else {
          return reject(new Error('Unknown Error'));
        }
      })
      .catch((err) => reject(err));
  });
};
