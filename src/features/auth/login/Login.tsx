import { Button, Form, Input } from "antd";
import "./Login.scss";
import { useEffect, useState } from "react";
import instance from "../../../api/api";

interface Account {
  email: string;
  password: string;
  roleId: string;
  userId: number;
}

const Login = () => {
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
    roleId: "",
    userId: 0,
  });
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await instance.get(`accounts`, {});
    const dataUsers = res;
    console.log("res account:", res);
    // setUsers(dataUsers)
    // console.log("res:",res);
    // console.log("dataUsers:",dataUsers)
  };
  // const onFinish = async (values: any) => {
  //   const res = users.find((user) => {
  //     return user.email === email && user.password === password;
  //     // return user.email === values.user.email && user.password === values.user.password;
  //   },);

  //   if (res == undefined) {
  //     toast.error("account login failed")
  //   } else {
  //     console.log(res)
  //     const currentIdUser=res.id
  //       localStorage.setItem("currentIdUser", currentIdUser);
  //       // localStorage.setItem("currentUser", res);

  //     // console.log("values:",values)
  //     dispatch(doLogin(res))
  //     toast.success("successful account login");
  //     navigate("/list-tasks");
  //   }
  // };
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
          className="login-form "
        >
          <Form.Item label="Email" hasFeedback>
            <Input placeholder="Enter your email" id="email" />
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            <Input placeholder="Enter your password" id="password" />
          </Form.Item>
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
    </>
  );
};

export default Login;
