import { Button, Form, Input } from "antd";
import "./Login.scss";
import { useEffect, useState } from "react";
import instance from "../../../api/api";
import { Account, doLogin } from "../constants/accountSlice";
import { AccountApis } from "../constants/constant.endpoint";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  errMessageSubmit,
  validateMessages,
} from "../constants/login.constant";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isErrSubmit, setIsErrSubmit] = useState<Boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([
    {
      accountId: 0,
      email: "",
      password: "",
      roleId: "",
      userId: 0,
    },
  ]);
  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const res = await instance.get(`${AccountApis.ACCOUNTS}`, {});
    console.log("res:", res);
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
          <div className="back-home">Go to Home Page</div>

          {/* <Form.Item label="Email" hasFeedback>
            <Input placeholder="I'm the content" id="email" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input placeholder="I'm the content" id="success" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <Input placeholder="Warning" id="warning2" />
          </Form.Item> */}

          {/* <Form.Item
            label="Fail"
            hasFeedback
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="unavailable choice" id="error2" />
          </Form.Item> */}
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
