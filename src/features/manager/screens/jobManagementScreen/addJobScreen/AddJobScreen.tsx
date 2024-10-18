import { Button, Form, FormProps, Input, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findMissingElementInId } from "../../../../../common/common.helper";
import { managerPaths } from "../../../constants/constant.path";
import { getPositions, postPosition } from "../../../../../api/apiServices";
import { PositionDetail } from "../../../../../common/common.type";
import { PositionForm } from "../../../constants/manager.type";

const AddJobScreen = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [positionId, setPositionId] = useState<string>("");

  const fetchPositions = async () => {
    const res = await getPositions();
    let positionIds: string[] = [];

    if (res) {
      const positionsApi = res.data.data as PositionDetail[];
      positionsApi.forEach((positionApi) => {
        positionIds.push(positionApi.positionId);
      });

      const newPositionId = findMissingElementInId(positionIds, "P");
      setPositionId(newPositionId);
    }
  };
  const defaultValues = useMemo(() => {
    return {
      positionId: positionId,
    };
  }, [positionId]);

  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<PositionForm>["onFinish"] = async (values) => {
    const res = await postPosition(values);
    if (res) {
      navigate(managerPaths.DEPARTMENT_MANAGEMENT);
    }
  };

  const onFinishFailed: FormProps<PositionForm>["onFinishFailed"] = (
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
        Back
      </Button>
      <Typography.Title>Create new Position</Typography.Title>
      <Form
        form={form}
        id="addPositionForm"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<PositionForm> label="positionId" name="positionId">
          <Input className="input-profile-item" disabled />
        </Form.Item>
        <Form.Item<PositionForm> label="positionName" name="positionName">
          <Input className="input-profile-item" placeholder="Tên chức vụ mới" />
        </Form.Item>

        <Form.Item<PositionForm>
          label="salaryCoefficient"
          name="salaryCoefficient"
        >
          <Input className="input-profile-item" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="btn-submit-post">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddJobScreen;
