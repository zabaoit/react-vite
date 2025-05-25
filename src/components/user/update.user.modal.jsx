import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";

const UpdateUserModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmitBtn = async () => {
    const res = await createUserAPI(fullName, email, password, phone);

    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo mới người dùng thành công",
      });
      resetAndClearModal();
      //   await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      title="Update a User"
      open={isModalOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => setIsModalOpen(false)}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          flexDirection: "column",
          gap: "15px",
        }}
      >
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
            value={password}
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
    </Modal>
  );
};

export default UpdateUserModal;
