import { Button, Drawer } from "antd";
import { useState } from "react";

const BookDetail = props => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
  return (
    <>
      <Drawer
        width={"30vw"}
        title="Chi tiết Book"
        open={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDataDetail(null);
        }}
      >
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p> <br />
            <p>Tiêu đề: {dataDetail.mainText}</p> <br />
            <p>Tác giả: {dataDetail.author}</p> <br />
            <p>Thể loại: {dataDetail.category}</p> <br />
            <p>
              Giá tiền:{" "}
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(dataDetail.price)}
            </p>{" "}
            <br />
            <p>Số lượng: {dataDetail.quantity}</p> <br />
            <p>Đã bán: {dataDetail.sold}</p> <br />
            <p>Thumbnail: </p> <br />
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
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
              />
            </div>
          </>
        ) : (
          <>Khong co du lieu</>
        )}
      </Drawer>
    </>
  );
};

export default BookDetail;
