import * as dataverseClient from '@/backend/singletons/dataverseClient';

const loadDataVerseDataInfo = async () => {
  const dataVerseClient = dataverseClient.get();
  const result = await dataVerseClient.getDataverseInformation();
  return result.data;
};

const listDatasets = async () => {
  const finalResult = [];
  const dataVerseClient = dataverseClient.get();
  const result = await dataVerseClient.listDatasets();
  if (result.data.status !== 'OK') {
    throw new Error("Can't get dataset list");
  }

  for (const dataset of result.data.data) {
    const { data } = await dataVerseClient.getLatestDatasetInformation(
      dataset.id,
    );
    finalResult.push(data.data);
  }

  return finalResult;
};

export { loadDataVerseDataInfo, listDatasets };
