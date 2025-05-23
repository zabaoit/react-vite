import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoInput from "./components/todo/TodoInput";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />

      <Outlet />
      <Footer />
    </>
  );
};

export default App;
