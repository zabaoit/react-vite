import "./components/todo/todo.css";
import { useContext, useEffect, useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountUser } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
import "nprogress/nprogress.css";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delay = milSeconds => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, milSeconds);
    });
  };
  const fetchUserInfo = async () => {
    const res = await getAccountUser();
    await delay(3000);
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading === true ? (
        <Spin style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} size="large" />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
