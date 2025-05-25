import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fecthAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [dataUser, setDataUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fecthAllUserAPI();
    setDataUsers(res.data);
  };

  // lift-up
  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable dataUser={dataUser} loadUser={loadUser} />
    </div>
  );
};

export default UsersPage;
