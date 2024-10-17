import { useEffect } from "react";
import { getUsers } from "../../../../api/apiServices";
import { UserDetail } from "../../../../common/common.type";

const ContractManagementScreen = () => {
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const res = await getUsers();
    if (res) {
      const userApi = res.data.data as UserDetail;
      console.log("userApi:", userApi);
    }
  };

  return (
    <div>
      ContractManagementScreen
      <h2>tạo mục lấy biểu mẫu hợp đồng</h2>
      <h2>hiển thị bảng thông tin các nhân viên theo hợp đồng</h2>
      <h3>
        {" "}
        Update kiểu hợp đồng, thời hạn cho user, các user hết hạn hợp đòng sẽ bị
        tô đỏ
      </h3>
      <h3> delete contract cua user</h3>
    </div>
  );
};
export default ContractManagementScreen;
