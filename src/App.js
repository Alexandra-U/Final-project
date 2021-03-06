import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";

import ShowList from "./Display/ShowList";
import DisplayContent from "./Display/DisplayContent";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AuthContext from "./Auth/AuthContext";

import Profile from "./Auth/Profile";
import DetailsPage from "./CRUD/DetailsPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header user="Alexandra" />

        <div className="container">
          <Route exact path="/">
            <ShowList />
          </Route>

          <Route path="/DisplayContent">
            <DisplayContent />
          </Route>

          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/Register">
            <Register />
          </Route>

          <Route path="/Profile">
            <Profile />
          </Route>

          <Route path="/posts/:pageId">
            <DetailsPage />
          </Route>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
