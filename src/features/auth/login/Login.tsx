import { Button, Form, Input } from "antd";
import "./Login.scss";
import { useEffect, useState } from "react";
import { Account, doLogin } from "../constants/accountSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  errMessageSubmit,
  validateMessages,
} from "../constants/login.constant";
import { INIT_ACCOUNT } from "../../../common/common.constant";
import { getAccounts } from "../../../api/apiServices";
import { useAppDispatch } from "../../../app/hooks";

const Login = () => {
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const [isErrSubmit, setIsErrSubmit] = useState<Boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([INIT_ACCOUNT]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await getAccounts();
    if (res.status === 200) {
      const accountsData = res.data.data;
      console.log("accountsData:", accountsData);
      setAccounts(accountsData);
    }
  };

  const onFinish = async (values: any) => {
    const currentAccount = accounts.find((account) => {
      return account.email === email && account.password === password;
      // return user.email === values.user.email && user.password === values.user.password;
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
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            ]}
          >
            <Input
              className="val-input"
              placeholder="Enter your email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
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
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/g,
              },
            ]}
          >
            <Input.Password
              className="val-input"
              placeholder="Enter your password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
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
