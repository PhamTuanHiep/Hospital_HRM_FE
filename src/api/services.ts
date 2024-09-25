import { Role } from "../common/common.type";
import { UserApis } from "../features/users/constants/constant.endpoint";
import instance from "./api";

export const getRandomRole = async () => {
  const res = await instance.get(`${UserApis.ROLES}/admin`);

  return res.data.data;
};
