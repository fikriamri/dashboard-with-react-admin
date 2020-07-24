import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import { UserList } from './users';
import { BookList } from './books';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import customDataProvider from './customDataProvider';
import Dashboard from './Dashboard';
import customRoutes from './routes';
import Menu from './Menu';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider('http://localhost:3000/api', httpClient);
const App = () => (
  <Admin
    menu={Menu}
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={customDataProvider}
    customRoutes={customRoutes}
  >
    <Resource
      name="book"
      list={BookList}
      icon={CollectionsBookmarkIcon}
    />
  </Admin>
)

export default App;
