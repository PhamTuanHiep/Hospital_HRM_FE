import {
  getDepartmentIdFromNumber,
  transformCamelToTitleCaseHaveSpace,
} from "../../../../common/common.helper";

const DepartmentManagementScreen = () => {
  const id = transformCamelToTitleCaseHaveSpace(
    "xinchao Cac ban ! tuilahiep yesorno"
  );
  console.log("id:", id);
  return <div>DepartmentManagementScreen -update ten phong, vi tri, mo ta</div>;
};
export default DepartmentManagementScreen;
