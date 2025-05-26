import { Button, Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = props => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

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
              <div
                style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  border: "2px solid #ccc",
                }}
              >
                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview} />
              </div>
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
