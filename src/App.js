import * as React from 'react';
import { Provider } from 'react-redux';
import { Admin, Resource, ListGuesser, EditGuesser, fetchUtils } from 'react-admin';
import { createHashHistory } from 'history';
import englishMessages from 'ra-language-english';
import indonesianMessages from 'ra-language-indonesian';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import createAdminStore from './createAdminStore';

import authProvider from './authProvider';
import { UserList } from './resources/users';
import { BookList } from './resources/books';
import { PostList, PostEdit, PostCreate } from './resources/posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import customDataProvider from './dataProvider';
import Dashboard from './pages/Dashboard';
import customRoutes from './routes';
import Menu from './menu';
import dashboardReducer from './redux/Dashboard/reducer';

const messages = {
  id: indonesianMessages,
  en: englishMessages,
};

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale !== 'en') {
      return messages[locale];
  }
  return englishMessages;
});
const history = createHashHistory();

const App = () => (
  // For the sake of PoC, code commented below will be keeped as is until PoC is finished.
  // <Provider
  //   store={createAdminStore({
  //     authProvider,
  //     customDataProvider,
  //     history
  //   })}
  // >
    <Admin
      menu={Menu}
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={customDataProvider}
      customRoutes={customRoutes}
      customReducers={{ dashboard: dashboardReducer }}
      // history={history}
    >
      <Resource
        name="book"
        list={BookList}
        icon={CollectionsBookmarkIcon}
      />
    </Admin>
  // </Provider>
)

export default App;
