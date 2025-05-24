import { Button, Input } from "antd";
import { use } from "react";
import { useState } from "react";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickBtn = () => {
    console.log(">>> check input: ", { fullName, email, passWord, phone });
  };

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={event => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={event => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={passWord}
            onChange={event => {
              setPassWord(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input
            value={phone}
            onChange={event => {
              setPhone(event.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ margin: "20px 20px 0" }}>
        <Button onClick={() => handleClickBtn()} type="primary">
          Create User
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
