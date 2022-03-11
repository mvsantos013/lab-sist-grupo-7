let file = null;

export const uploadFile = async (f) => {
  file = f;
};

export const getUploadedFile = async () => {
  return file;
};
