import { Button, Form, Input } from "antd";
import "./Login.scss";

const Login = () => {
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
