import { Space, Table, Tag } from "antd";
import { fecthAllUserAPI } from "../../services/api.service";
import { useState } from "react";

const UserTable = () => {
  const [dataUser, setDataUsers] = useState([
    { _id: "baobao", fullName: 25, email: "hcm" },
    { _id: "ngb", fullName: 21, email: "hcm" },
  ]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const loadUser = async () => {
    console.log(">>> run loadUser START");
    const res = await fecthAllUserAPI();
    console.log(">>> run loadUser END", res);
    // setDataUsers(res.data);
  };
  loadUser();

  return <Table columns={columns} dataSource={dataUser} />;
};

export default UserTable;
