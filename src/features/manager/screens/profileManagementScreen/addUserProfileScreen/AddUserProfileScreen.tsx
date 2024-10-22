import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  Typography,
} from "antd";
import { UserForm, UserPost } from "../../../../../common/common.type";
import { useEffect, useMemo } from "react";
import { GenderId, GenderName } from "../../../../../common/common.constant";
import dayjs from "dayjs";
import {
  departmentOptions,
  positionOptions,
  weeklyScheduleOptions,
} from "../../../constants/manager.help";
import { postUser } from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { managerPaths } from "../../../constants/constant.path";
import "./AddUserProfileScreen.scss";
import { useTranslation } from "react-i18next";

const AddUserProfileScreen = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const defaultValues = useMemo(() => {
    return {
      fullName: "Nguyễn Văn A",
      gender: 1,
      address: "số 20 Hoàng Cầu, Đống Đa, Hà Nội",
      phoneNumber: "0123456789",
      nation: "Việt Nam",
      nationality: "Kinh",
      hometown: "số 20 Hoàng Cầu, Đống Đa, Hà Nội",
      birthday: dayjs("10/10/2001"),
      fatherFullName: "Nguyễn Văn C",
      fatherBirthday: dayjs("10/10/2001"),
      motherFullName: "Nguyễn Văn B",
      motherBirthday: dayjs("10/10/2001"),
      weeklySchedule: [2, 3, 4, 5, 6],
      positionId: "P010",
      departmentId: "D003",
      jobDescription: ["Làm việc các ngày trong tuần"],
      otherDescription: "Sẽ có tăng ca hàng tháng",
      status: "Đang làm",
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<UserPost>["onFinish"] = async (values) => {
    values.birthday = dayjs(values.birthday).format("DD/MM/YYYY");
    values.fatherBirthday = dayjs(values.fatherBirthday).format("DD/MM/YYYY");
    values.motherBirthday = dayjs(values.motherBirthday).format("DD/MM/YYYY");
    const res = await postUser(values);
    if (res) {
      navigate(managerPaths.EMPLOYEE_MANAGEMENT);
    }
  };

  const onFinishFailed: FormProps<UserPost>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeWeeklySchedule = (value: number[]) => {
    console.log(`selected ${value}`);
  };

  const dateFormatList = ["DD/MM/YYYY"];

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
      <Typography.Title>Create new User Profile</Typography.Title>
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
        <Form.Item<UserPost> label={t("content.info.FullName")} name="fullName">
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

        <Form.Item<UserPost> label={t("content.info.Hometown")} name="hometown">
          <Input
            className="input-profile-item"
            placeholder="số nhà,đường, thôn, xã/phường, huyện/thị trấn/quận, tỉnh/thành phố"
          />
        </Form.Item>
        <Form.Item<UserPost> label={t("content.info.Birthday")} name="birthday">
          <DatePicker className="input-profile-item" format={dateFormatList} />
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
          <DatePicker className="input-profile-item" format={dateFormatList} />
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
          <DatePicker className="input-profile-item" format={dateFormatList} />
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddUserProfileScreen;
