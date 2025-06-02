import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";
import { useEffect, useState } from "react";
import { handleUploadfile, updateBookAPI } from "../../services/api.service";

const UpdateBookUnControl = props => {
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate]);

  const updateBook = async (values, newThumbnail) => {
    const { id, mainText, author, price, quantity, category } = values;
    const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
    if (res.data) {
      await loadBook();
      resetAndClearModal();
      notification.success({
        message: "Update book",
        description: "Cập nhật book thành công",
      });
    } else {
      notification.error({
        message: "Error update book",
        description: JSON.stringify(res.message),
      });
    }
  };

  const handleSubmitBtn = async values => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error",
        Descriptions: "Vui lòng upload ảnh",
      });
    }

    let newThumbnail = "";
    if (!selectedFile && preview) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      const resUpload = await handleUploadfile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
        // step 2: upload book
      } else {
        notification.error({
          message: "Error update book",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    // step 2

    await updateBook(values, newThumbnail);
  };

  const resetAndClearModal = () => {
    setIsModalUpdateOpen(false);
    setDataUpdate(null);
    setPreview(null);
    setSelectedFile(null);
    form.resetFields();
  };

  const handleOnChangeUpload = event => {
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
        title="Update book uncontrol"
        open={isModalUpdateOpen}
        onOk={() => form.submit()}
        onCancel={() => resetAndClearModal()}
        okText="UPDATE"
      >
        <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Form.Item name="id" label="Id">
                <Input disabled />
              </Form.Item>
            </div>
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
                // onKeyDown={event => {
                //   if (event.key === "Enter") form.submit();
                // }}
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
                  onChange={event => handleOnChangeUpload(event)}
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

export default UpdateBookUnControl;
