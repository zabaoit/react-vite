import { Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  LoginOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);
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
      icon: <BookOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: <span onClick={() => handleLogOut()}>Đăng xuất</span>,
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = e => {
    setCurrent(e.key);
  };
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const res = await logoutAPI();
    if (res.data) {
      // delete token
      localStorage.removeItem("access_token");
      setUser({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
      });
      message.success("Logout thành công.");

      // rederict
      navigate("/");
    }
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
