import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import UpdateUserModal from "./update.user.modal";

const UserTable = props => {
  const { dataUser } = props;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return <a>{record._id}</a>;
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditOutlined style={{ cursor: "pointer", color: "orange" }} />

          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
      <UpdateUserModal />
    </>
  );
};

export default UserTable;
