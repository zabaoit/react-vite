import { Descriptions, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadfile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = props => {
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantily] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantily(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
    }
  }, [dataUpdate]);

  const updateBook = async newThumbnail => {
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

  const handleSubmitBtn = async () => {
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

    // step 2: API

    await updateBook(newThumbnail);
  };

  const resetAndClearModal = () => {
    setIsModalUpdateOpen(false);
    setPreview(null);
    setSelectedFile(null);
    setDataUpdate(null);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantily("");
    setCategory("");
    setId("");
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
        title="Update Book"
        open={isModalUpdateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={resetAndClearModal}
        okText={"UPDATE"}
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
                Upload
              </label>
              <input
                type="file"
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
      </Modal>
    </>
  );
};

export default UpdateBookControl;
