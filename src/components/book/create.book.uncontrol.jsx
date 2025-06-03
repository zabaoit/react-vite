import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadfile } from "../../services/api.service";

const CreateBookUnControl = props => {
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;

  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmitBtn = async values => {
    const { mainText, author, price, quantity, category } = values;

    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }

    // step 1: upload file
    const resUpload = await handleUploadfile(selectedFile, "book");
    if (resUpload.data) {
      const newThumbnail = resUpload.data.fileUploaded;
      // step 2: upload book
      setLoading(true);
      const resBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
      if (resBook.data) {
        resetAndClearModal();
        await loadBook();
        notification.success({
          message: "Create book",
          description: "Tạo mới book thành công",
        });
      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(resBook.message),
        });
      }
      setLoading(false);
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
    setLoading(false);
  };

  const resetAndClearModal = () => {
    setIsCreateOpen(false);
    form.resetFields();
    setPreview(null);
    setSelectedFile(null);
  };

  const handleOnChangeFile = event => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Modal
        okButtonProps={{
          loading: loading,
        }}
        title="Create book uncontrol"
        open={isCreateOpen}
        onOk={() => form.submit()}
        onCancel={() => resetAndClearModal()}
        maskClosable={false}
        okText="Create"
      >
        <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Form.Item
                name="mainText"
                label="Tiêu đề"
                rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: "Tác giả không được để trống!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Giá tiền không được để trống!" }]}
              >
                <InputNumber style={{ display: "block", width: "100%" }} addonAfter={" đ"} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Số lượng không được để trống!" }]}
              >
                <InputNumber style={{ display: "block", width: "100%" }} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Thể loại"
                name="category"
                rules={[{ required: true, message: "Thể loại không được để trống!" }]}
              >
                <Select
                  style={{ display: "block", width: "100%" }}
                  options={[
                    { value: "Arts", label: "Arts" },
                    { value: "Business", label: "Business" },
                    { value: "Comics", label: "Comics" },

                    { value: "Cooking", label: "Cooking" },
                    { value: "Entertainment", label: "Entertainment" },
                    { value: "History", label: "History" },

                    { value: "Music", label: "Music" },
                    { value: "Sports", label: "Sports" },
                    { value: "Teen", label: "Teen" },
                    { value: "Travel", label: "Travel" },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <span>Ảnh thumbnail</span>
              <div>
                <label
                  htmlFor="btnUpload"
                  style={{
                    width: "fit-content",
                    background: "orange",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    marginTop: "15px",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  Upload thumbnail
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  hidden
                  id="btnUpload"
                  onChange={event => handleOnChangeFile(event)}
                  onClick={event => {
                    event.target.value = null;
                  }}
                />
              </div>
              {preview && (
                <>
                  <div
                    style={{
                      margin: "15px 0",
                      height: "100px",
                      width: "150px",
                      border: "2px solid #ccc",
                    }}
                  >
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview} />
                  </div>
                </>
              )}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBookUnControl;
