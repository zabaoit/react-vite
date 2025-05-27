import { Button, Drawer, message, notification } from "antd";
import { useState } from "react";
import { handleUploadfile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = props => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleUploadUserAvatar = async () => {
    // step 1: upload file
    const resUpload = await handleUploadfile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      // step 2: upload user
      const resUploadAvatar = await updateUserAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUploadAvatar.data) {
        setIsDetailOpen(false);

        setSelectedFile(null);
        setPreview(null);
        await loadUser();
        notification.success({
          message: "Update user avatar",
          description: "Cập nhật thành công",
        });
      } else {
        notification.error({
          message: "Error upload avatar",
          description: JSON.stringify(resUploadAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  return (
    <>
      <Drawer
        width={"30vw"}
        title="Chi tiết User"
        onClose={() => {
          setIsDetailOpen(false);
          setDataDetail(null);
        }}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p> <br />
            <p>Full Name: {dataDetail.fullName}</p> <br />
            <p>Email: {dataDetail.email}</p> <br />
            <p>Phone Number: {dataDetail.phone}</p> <br />
            <p>Avatar: </p> <br />
            <div
              style={{
                marginTop: "10px",
                height: "100px",
                width: "150px",
                border: "2px solid #ccc",
              }}
            >
              <img
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
              />
            </div>
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
                Upload file
              </label>
              <input type="file" hidden id="btnUpload" onChange={event => handleOnChangeUpload(event)} />
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
                <Button type="primary" onClick={() => handleUploadUserAvatar()}>
                  SAVE
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <p>Không có dữ liệu</p>
          </>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
