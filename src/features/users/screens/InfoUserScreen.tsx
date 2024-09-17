import React, { useEffect, useState } from "react";
// import instance from '../../../apis/apis';
import { UserApis } from "../constants/constant.endpoint";

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
}

const InfoUserScreen = () => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  //   useEffect(() => {
  //     getUsers();
  //   }, []);
  //   const getUsers = async () => {
  //     const response = await instance.get(`${UserApis.USERS}/1`, {});
  //     const c_user = response.data;
  //     setUser(c_user);
  //     console.log("response:", response);
  //     console.log("user:", user);
  //     console.log("c_user:", c_user);
  //   };

  return (
    <div>
      <h1>Info User Screen::::</h1>
    </div>
  );
};
export default InfoUserScreen;
