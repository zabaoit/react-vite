import { Button, Input } from "antd";

const UserForm = () => {
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
        <div>
          <span>Full Name</span>
          <Input />
        </div>
        <div>
          <span>Email</span>
          <Input />
        </div>
        <div>
          <span>Password</span>
          <Input.Password />
        </div>
        <div>
          <span>Phone number</span>
          <Input />
        </div>
      </div>
      <div style={{ margin: "20px 20px 0" }}>
        <Button type="primary">Create User</Button>
      </div>
    </div>
  );
};

export default UserForm;
