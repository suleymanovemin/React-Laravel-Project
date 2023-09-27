import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { MainContext } from "./Context";
import { useState } from "react";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Details from "./pages/Details";


function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts",
      element: <Posts />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
  ];

  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});


const data = {
  user,
  setUser
}

  return (
    <>
    <MainContext.Provider value={data}>
      <Header />
      <Routes>
        {routes.map((a, b) => (
          <Route path={a.path} element={a.element} key={b} />
        ))}
      </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;
