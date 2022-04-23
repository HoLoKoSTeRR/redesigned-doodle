import * as React from "react";
import { QueryClient } from "react-query";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource } from "react-admin";

import { PostList, PostEdit, PostCreate, PostShow } from "./lists/posts";
import { UserList, UserEdit, UserCreate, UserShow } from "./lists/user";
import authProvider from "./providers/authProvider";
import { LoginWithTheme } from "./components/Auth";
import customRoutes from "./Routes/customRoutes";
import DataProvider from "./providers/DataProvider";
import MyLayout from "./components/Layouts/Layout";
import i18nProvider from "./providers/i18nProvider";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 30 * 1e3,
    },
  },
});
const App = () => (
  <Admin
    basename="/admin"
    dataProvider={DataProvider}
    loginPage={LoginWithTheme}
    authProvider={authProvider}
    customRoutes={customRoutes}
    i18nProvider={i18nProvider}
    layout={MyLayout}
    queryClient={queryClient}
  >
    <Resource
      name="posts"
      icon={PostIcon}
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      show={PostShow}
      options={{ label: "post.label" }}
    />
    <Resource
      name="user"
      icon={UserIcon}
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      show={UserShow}
      options={{ label: "user.label" }}
    />
  </Admin>
);
export default App;
