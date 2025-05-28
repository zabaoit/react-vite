import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";

const Header = () => {
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <SettingOutlined />,
    },
    {
      label: "Cài đặt",
      key: "setting",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: "login",
        },
        {
          label: "Đăng xuất",
          key: "logout",
        },
      ],
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
