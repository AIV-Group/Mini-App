import React from "react";
import { Route } from "react-router-dom";
import {
  App,
  ZMPRouter,
  AnimationRoutes,
  SnackbarProvider,
  Header,
} from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import NotFoundPage from "../pages/404.jsx";
import ChatApp from "../pages/chat-app";
import Auth from "../pages/login";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
              <Route path="/about" element={<About></About>}></Route>
              <Route path="/auth" element={<Auth></Auth>}></Route>
              <Route path="/form" element={<Form></Form>}></Route>
              <Route path="/user" element={<User></User>}></Route>
              <Route path="/" element={<ChatApp></ChatApp>}></Route>
              <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
