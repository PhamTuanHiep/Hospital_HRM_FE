import { Button, Form, Input } from "antd";
import "./Login.scss";
import { useEffect, useState } from "react";
import { doLogin } from "../constants/accountSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  errMessageSubmit,
  validateMessages,
} from "../constants/login.constant";
import {
  EMAIL_PATTERN,
  INIT_ACCOUNT,
  PASSWORD_PATTERN,
} from "../../../common/common.constant";
import { getAccounts } from "../../../api/apiServices";
import { useAppDispatch } from "../../../app/hooks";
import { LoginSubmit } from "../constants/login.type";
import { AccountDetail } from "../../../common/common.type";

const Login = () => {
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const [isErrSubmit, setIsErrSubmit] = useState<Boolean>(false);

  const [accounts, setAccounts] = useState<AccountDetail[]>([INIT_ACCOUNT]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await getAccounts();
    if (res?.status === 200) {
      const accountsData = res.data.data;
      console.log("accountsData:", accountsData);
      setAccounts(accountsData);
    }
  };

  const onFinish = async (values: LoginSubmit) => {
    console.log("values:", values);

    const currentAccount = accounts.find((account) => {
      return (
        account.email === values.account.email &&
        account.password === values.account.password
      );
    });

    if (currentAccount == undefined) {
      setIsErrSubmit(true);
      toast.error("Account Login Failed");
    } else {
      console.log(currentAccount);
      const currentAccountId = currentAccount.accountId;
      localStorage.setItem("currentAccountId", currentAccountId.toString());
      dispatch(doLogin(currentAccount));
      toast.success("successful account login");
      navigate("/");
    }
  };

  return (
    <>
      <div id="login">
        <h1>Login</h1>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          size="large"
          scrollToFirstError
          className="login-form"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
        >
          <Form.Item
            className="val-item"
            label="Email"
            name={["account", "email"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Email is valid",
                pattern: EMAIL_PATTERN,
              },
            ]}
          >
            <Input
              className="val-input"
              placeholder="Enter your email"
              id="email"
            />
          </Form.Item>
          <Form.Item
            className="val-item"
            label="Password"
            hasFeedback
            name={["account", "password"]}
            rules={[
              {
                required: true,
                message:
                  "The password must have 8-32 characters, at least 1 capital and 1 normal word !",
                pattern: PASSWORD_PATTERN,
              },
            ]}
          >
            <Input.Password
              className="val-input"
              placeholder="Enter your password"
              id="password"
            />
          </Form.Item>
          <div id="error-submit">{isErrSubmit ? errMessageSubmit : ""}</div>

          <div className="forgot-password">Forgot password ?</div>

          <Form.Item className="submit-form">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <div
            className="back-home"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home Page
          </div>
        </Form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Login;
