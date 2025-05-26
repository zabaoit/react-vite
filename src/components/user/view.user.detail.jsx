import { Button, Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = props => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

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
            <div>
              <img
                height={250}
                width={250}
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
              <input type="file" hidden id="btnUpload" />
            </div>
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
