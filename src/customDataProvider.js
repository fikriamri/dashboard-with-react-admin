import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import camelCaseKeys from 'camelcase-keys';

const apiUrl = 'http://localhost:3000/api';
const httpClient = (url, options = {}) => {
  const token = localStorage.getItem('token');

  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = new Headers({ Accept: 'application/json' })
  }

  // Inject the Authorization header from the local storage
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`)
  }

  // add your own headers here
  // options.headers.set('X-Custom-Header', 'foobar')
  return fetchUtils.fetchJson(url, options);
}

// We need this to comply with react-admin needs
const getListFromResponse = response => {
  const { headers, json } = response
  console.log('json', json)
  if ('count' in json) {
    console.log('json.data', json.data);
    return { data: camelCaseKeys(json.data, { deep: true }), total: json.count }
  }
  if (headers.has('content-range')) {
    return {
      data: json,
      total: parseInt(
        headers
          .get('content-range')
          .split('/')
          .pop(),
        10,
      ),
    }
  }
  if ('detail' in json && json.detail === 'Invalid page.') {
    return { data: [], total: 0 }
  }
  throw new Error('The total number of results is unknown. The DRF data provider expects responses for lists of resources to contain this information to build the pagination. If you\'re not using the default PageNumberPagination class, please include this information using the Content-Range header OR a "count" key inside the response.')
}

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        // const url = `${apiUrl}/${resource}`;
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        // return httpClient(url).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('X-Total-Count')),
        // }));
        return httpClient(url).then(response => getListFromResponse(response));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json.data,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: camelCaseKeys(json.data, { deep: true }) }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(response => getListFromResponse(response));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json.data })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: camelCaseKeys(json.data, { deep: true }) }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.data.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: camelCaseKeys(json.data, { deep: true }) })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: camelCaseKeys(json.data, { deep: true }) }));
    },
};