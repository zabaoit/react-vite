import { Table } from "antd";
import { fecthAllUserAPI } from "../../services/api.service";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [dataUser, setDataUsers] = useState([
    { _id: "baobao", fullName: 25, email: "hcm" },
    { _id: "ngb", fullName: 21, email: "hcm" },
  ]);

  useEffect(() => {
    console.log(">>> check useEffect");
    loadUser();
  }, []);

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
    const res = await fecthAllUserAPI();
    setDataUsers(res.data);
  };

  console.log(">>> run render ");

  return <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />;
};

export default UserTable;
