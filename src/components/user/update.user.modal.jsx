import { Button, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = props => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    const res = await updateUserAPI(id, fullName, phone);

    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Cập nhật thành công",
      });
      resetAndClearModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
      setIsModalUpdateOpen(false);
    }
  };

  const resetAndClearModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update a User"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={resetAndClearModal}
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
          <span>Id</span>
          <Input value={id} disabled />
        </div>
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
