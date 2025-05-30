import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fecthAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [dataUser, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await fecthAllUserAPI(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  // lift-up
  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUser={dataUser}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UsersPage;
