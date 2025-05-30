import "./components/todo/todo.css";
import { useContext, useEffect, useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountUser } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context";

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchUserInfo = async () => {
    const res = await getAccountUser();

    if (res.data && res.data.data) {
      setUser(res.data.data.user);
      console.log(">>> check data: ", res.data.data);
    }
  };
  return (
    <>
      <Header />

      <Outlet />
      <Footer />
    </>
  );
};

export default App;
