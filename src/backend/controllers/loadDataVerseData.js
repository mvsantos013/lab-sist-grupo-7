import * as dataverseClient from '@/backend/singletons/dataverseClient';

const loadDataVerseDataInfo = async (event, dataVerseAlias) => {
  const dataVerseClient = dataverseClient.get();
  const result = await dataVerseClient.getDataverseInformation(dataVerseAlias);
  return result.data;
};

export { loadDataVerseDataInfo };
