import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  Select,
  Typography,
} from "antd";
import {
  DepartmentDetail,
  PositionDetail,
  UserForm,
  UserPost,
} from "../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_DATE_FORMAT,
  GenderId,
  GenderName,
  INIT_DEPARTMENT,
  INIT_POSITION,
} from "../../../../../common/common.constant";
import dayjs from "dayjs";
import { weeklyScheduleOptions } from "../../../constants/manager.help";
import {
  getDepartments,
  getPositions,
  postUser,
} from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { managerPaths } from "../../../constants/constant.path";
import "./AddUserProfileScreen.scss";
import { useTranslation } from "react-i18next";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";

const AddUserProfileScreen = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);
  const [positions, setPositions] = useState<PositionDetail[]>([INIT_POSITION]);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    if (res) {
      const departmentsApi = res.data.data as DepartmentDetail[];
      setDepartments(departmentsApi);
    }
  };
  const fetchPositions = async () => {
    const res = await getPositions();
    if (res) {
      const positionsApi = res.data.data as PositionDetail[];
      setPositions(positionsApi);
    }
  };

  const navigate = useNavigate();

  const departmentOptions = useMemo(() => {
    return departments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName,
    }));
  }, [departments]);
  const positionOptions = useMemo(() => {
    return positions.map((position) => ({
      value: position.positionId,
      label: position.positionName,
    }));
  }, [positions]);

  const defaultValues = useMemo(() => {
    return {
      fullName: "",
      gender: 1,
      address: "",
      phoneNumber: "",
      nation: "",
      nationality: "",
      hometown: "",
      // birthday: dayjs("10/10/2001"),
      fatherFullName: "",
      // fatherBirthday: dayjs("10/10/2001"),
      motherFullName: "",
      // motherBirthday: dayjs("10/10/2001"),
      weeklySchedule: [2, 3, 4, 5, 6],
      positionId: "",
      departmentId: "",
      salaryCoefficient: 0,
      jobDescription: ["Làm việc các ngày trong tuần"],
      otherDescription: "",
      status: "",
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const onFinish: FormProps<UserPost>["onFinish"] = async (values) => {
    values.birthday = dayjs(values.birthday).format(DEFAULT_DATE_FORMAT);
    values.fatherBirthday = dayjs(values.fatherBirthday).format(
      DEFAULT_DATE_FORMAT
    );
    values.motherBirthday = dayjs(values.motherBirthday).format(
      DEFAULT_DATE_FORMAT
    );
    const res = await postUser(values);
    if (res) {
      navigate(managerPaths.PROFILE_MANAGEMENT);
    }
  };

  const onFinishFailed: FormProps<UserPost>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeWeeklySchedule = (value: number[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Flex vertical gap={8}>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href="/manager/profile-management">
                  {t("content.feature.ProfileManagement")}
                </a>
              </div>
            ),
          },
          {
            title: (
              <div>
                <a href="/manager/profile-management/add-user">
                  {t("content.info.CreateUserProfile")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("content.common.Back")}
          </Button>
        }
      />
      <Card>
        <Typography.Title>
          {t("content.info.CreateUserProfile")}
        </Typography.Title>
        <Form
          form={form}
          id="add_user_form"
          name="add_user_form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<UserPost>
            label={t("content.info.FullName")}
            name="fullName"
          >
            <Input className="input-profile-item" />
          </Form.Item>

          <Form.Item<UserPost> label={t("content.info.Gender")} name="gender">
            <Select
              className="input-profile-item"
              options={[
                {
                  value: GenderId.FEMALE,
                  label: t(`content.common.${GenderName.FEMALE}`),
                },
                {
                  value: GenderId.MALE,
                  label: t(`content.common.${GenderName.MALE}`),
                },
              ]}
            />
          </Form.Item>
          <Form.Item<UserPost> label={t("content.info.Address")} name="address">
            <Input
              className="input-profile-item"
              placeholder="số nhà,đường, thôn, xã/phường, huyện/thị trấn/quận, tỉnh/thành phố"
            />
          </Form.Item>
          <Form.Item<UserForm>
            label={t("content.info.PhoneNumber")}
            name="phoneNumber"
          >
            <Input />
          </Form.Item>
          <Form.Item<UserPost> label={t("content.info.Nation")} name="nation">
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.Nationality")}
            name="nationality"
          >
            <Input className="input-profile-item" />
          </Form.Item>

          <Form.Item<UserPost>
            label={t("content.info.Hometown")}
            name="hometown"
          >
            <Input
              className="input-profile-item"
              placeholder="số nhà,đường, thôn, xã/phường, huyện/thị trấn/quận, tỉnh/thành phố"
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.Birthday")}
            name="birthday"
          >
            <DatePicker
              className="input-profile-item"
              format={DEFAULT_DATE_FORMAT}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.FatherFullName")}
            name="fatherFullName"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.FatherBirthday")}
            name="fatherBirthday"
          >
            <DatePicker
              className="input-profile-item"
              format={DEFAULT_DATE_FORMAT}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.MotherFullName")}
            name="motherFullName"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.MotherBirthday")}
            name="motherBirthday"
          >
            <DatePicker
              className="input-profile-item"
              format={DEFAULT_DATE_FORMAT}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.PositionName")}
            name="positionId"
          >
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={positionOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.DepartmentName")}
            name="departmentId"
          >
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={departmentOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.SalaryCoefficient")}
            name="salaryCoefficient"
            rules={[
              { required: true, message: "Please input salaryCoefficient!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.WeeklySchedule")}
            name="weeklySchedule"
          >
            <Select
              className="input-profile-item"
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={[]}
              onChange={handleChangeWeeklySchedule}
              options={weeklyScheduleOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.JobDescription")}
            name="jobDescription"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.OtherDescription")}
            name="otherDescription"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost> label={t("content.info.Status")} name="status">
            <Input className="input-profile-item" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btn-submit">
              {t("content.common.Submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
export default AddUserProfileScreen;
