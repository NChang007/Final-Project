import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import  Login  from "./pages/Login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import DogInfo from "./pages/DogInfo";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/Login" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Register />} path="/Register" />
            <Route element={<Quiz />} path="/Quiz"/>
            <Route element={<DogInfo />} path="/pages/AboutCharacterPage/:id"/>
          </Routes>
          {/* <Footer /> */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
