import { Button, Form, FormProps, Input, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentForm } from "../../../constants/manager.type";
import { DepartmentDetail } from "../../../../../common/common.type";
import { getDepartments, postDepartment } from "../../../../../api/apiServices";
import { findMissingElementInId } from "../../../../../common/common.helper";
import { managerPaths } from "../../../constants/constant.path";
import { useTranslation } from "react-i18next";

const AddDepartmentScreen = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [departmentId, setDepartmentId] = useState<string>("");

  const fetchDepartments = async () => {
    const res = await getDepartments();
    let departmentIds: string[] = [];

    if (res) {
      const departmentsApi = res.data.data as DepartmentDetail[];
      departmentsApi.forEach((departmentApi) => {
        departmentIds.push(departmentApi.departmentId);
      });

      const newDepartmentId = findMissingElementInId(departmentIds, "D");
      setDepartmentId(newDepartmentId);
    }
  };
  const defaultValues = useMemo(() => {
    return {
      departmentId: departmentId,
    };
  }, [departmentId]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<DepartmentForm>["onFinish"] = async (values) => {
    const res = await postDepartment(values);
    if (res) {
      navigate(managerPaths.DEPARTMENT_MANAGEMENT);
    }
  };

  const onFinishFailed: FormProps<DepartmentForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button
        type="primary"
        className="btn-add-object"
        onClick={() => {
          navigate(-1);
        }}
      >
        {t("content.common.Back")}
      </Button>
      <Typography.Title>
        {t("content.department.CreateDepartment")}
      </Typography.Title>
      <Form
        form={form}
        id="addUserForm"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<DepartmentForm>
          label={t("content.department.DepartmentId")}
          name="departmentId"
        >
          <Input className="input-profile-item" disabled />
        </Form.Item>
        <Form.Item<DepartmentForm>
          label={t("content.department.DepartmentName")}
          name="departmentName"
        >
          <Input
            className="input-profile-item"
            placeholder="Tên khoa phòng mới"
          />
        </Form.Item>

        <Form.Item<DepartmentForm>
          label={t("content.department.Location")}
          name="location"
        >
          <Input
            className="input-profile-item"
            placeholder="Tòa nhà, tầng, dãy phòng"
          />
        </Form.Item>
        <Form.Item<DepartmentForm>
          label={t("content.department.FuncDescription")}
          name="funcDescription"
        >
          <Input
            className="input-profile-item"
            placeholder="Mô tả chức năng khoa phòng"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="btn-submit">
            {t("content.common.Submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddDepartmentScreen;
