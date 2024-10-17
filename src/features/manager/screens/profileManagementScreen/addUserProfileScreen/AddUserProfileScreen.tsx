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

const AddUserProfileScreen = () => {
  const [form] = Form.useForm();

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
        Back
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
        <Form.Item<UserPost> label="Full Name" name="fullName">
          <Input className="input-profile-item" />
        </Form.Item>

        <Form.Item<UserPost> label="Gender" name="gender">
          <Select
            className="input-profile-item"
            options={[
              { value: GenderId.FEMALE, label: GenderName.FEMALE },
              { value: GenderId.MALE, label: GenderName.MALE },
            ]}
          />
        </Form.Item>
        <Form.Item<UserPost> label="Address" name="address">
          <Input
            className="input-profile-item"
            placeholder="số nhà,đường, thôn, xã/phường, huyện/thị trấn/quận, tỉnh/thành phố"
          />
        </Form.Item>
        <Form.Item<UserForm> label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item<UserPost> label="Nation" name="nation">
          <Input className="input-profile-item" />
        </Form.Item>
        <Form.Item<UserPost> label="Nationality" name="nationality">
          <Input className="input-profile-item" />
        </Form.Item>

        <Form.Item<UserPost> label="Hometown" name="hometown">
          <Input
            className="input-profile-item"
            placeholder="số nhà,đường, thôn, xã/phường, huyện/thị trấn/quận, tỉnh/thành phố"
          />
        </Form.Item>
        <Form.Item<UserPost> label="Birthday" name="birthday">
          <DatePicker className="input-profile-item" format={dateFormatList} />
        </Form.Item>
        <Form.Item<UserPost> label="Father Full Name" name="fatherFullName">
          <Input className="input-profile-item" />
        </Form.Item>
        <Form.Item<UserPost> label="Father Birthday" name="fatherBirthday">
          <DatePicker className="input-profile-item" format={dateFormatList} />
        </Form.Item>
        <Form.Item<UserPost> label="Mother Full Name" name="motherFullName">
          <Input className="input-profile-item" />
        </Form.Item>
        <Form.Item<UserPost> label="Mother Birthday" name="motherBirthday">
          <DatePicker className="input-profile-item" format={dateFormatList} />
        </Form.Item>
        <Form.Item<UserPost> label="Weekly Schedule" name="positionId">
          <Select
            className="input-profile-item"
            style={{ width: "100%" }}
            placeholder="Please select"
            options={positionOptions}
          />
        </Form.Item>
        <Form.Item<UserPost> label="Weekly Schedule" name="departmentId">
          <Select
            className="input-profile-item"
            style={{ width: "100%" }}
            placeholder="Please select"
            options={departmentOptions}
          />
        </Form.Item>
        <Form.Item<UserPost> label="Weekly Schedule" name="weeklySchedule">
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
        <Form.Item<UserPost> label="Job Description" name="jobDescription">
          <Input className="input-profile-item" />
        </Form.Item>
        <Form.Item<UserPost> label="Other Description" name="otherDescription">
          <Input className="input-profile-item" />
        </Form.Item>
        <Form.Item<UserPost> label="Status" name="status">
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
