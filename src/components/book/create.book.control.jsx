import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadfile } from "../../services/api.service";

const CreateBook = props => {
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantily] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async () => {
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
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  const resetAndClearModal = () => {
    setIsCreateOpen(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantily("");
    setCategory("");
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
        title="Create book"
        open={isCreateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndClearModal()}
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
            <span>Tiêu đề</span>
            <Input
              value={mainText}
              onChange={event => {
                setMainText(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={event => {
                setAuthor(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Giá tiền</span>
            <InputNumber
              value={price}
              onChange={event => {
                setPrice(event);
              }}
              style={{ display: "block", width: "100%" }}
              addonAfter={" đ"}
            />
          </div>
          <div>
            <span>Số lượng</span>
            <InputNumber
              value={quantity}
              onChange={event => {
                setQuantily(event);
              }}
              style={{ display: "block", width: "100%" }}
            />
          </div>
          <div>
            <span>Thể loại</span>
            <Select
              value={category}
              onChange={event => {
                setCategory(event);
              }}
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
      </Modal>
    </>
  );
};

export default CreateBook;
