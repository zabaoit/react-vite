import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteBookAPI, fecthAlLBookAPI } from "../../services/api.service";
import BookDetail from "./book.detail";
import CreateBook from "./create.book.control";
import CreateBookUnControl from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";
import UpdateBookUnControl from "./update.bool.uncontrol";

const BookTable = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageSize]);

  const loadBook = async () => {
    setLoading(true);
    const res = await fecthAlLBookAPI(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      // setCurrent(res.data.meta.current);
      // setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  };

  const handleDeleteBook = async id => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: "Xóa book thành công",
      });
      await loadBook();
    } else {
      notification.error({
        message: "Delete book",
        description: JSON.stringify(res.message),
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                setDataDetail(record);
                setIsDetailOpen(true);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text, record) => {
        if (text) {
          return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(text);
        }
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />

          <Popconfirm
            title="Delete book"
            description="Bạn chắc chắn xóa book này ?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log(">>> check ", { pagination, filters, sorter, extra });
    // setCurrent, setPageSize
    // thay doi current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    // // thay doi pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };
  return (
    <>
      <div
        style={{
          margin: "20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Table Book</h3>
        <Button type="primary" onClick={() => setIsCreateOpen(true)}>
          Create Book
        </Button>
      </div>

      <Table
        loading={loading}
        dataSource={dataBook}
        columns={columns}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <BookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />

      {/* <CreateBook isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} loadBook={loadBook} /> */}
      <CreateBookUnControl isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} loadBook={loadBook} />

      {/* <UpdateBookControl
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      /> */}

      <UpdateBookUnControl
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />
    </>
  );
};

export default BookTable;
