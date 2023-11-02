import axios from 'axios';

export const callApi = async ({
  endpoint,
  method,
  headers = {},
  params = {},
  data,
}) => {
  const baseURL = 'http://localhost:3000';

  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(options);
  return response?.data;
};
