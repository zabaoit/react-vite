import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async values => {
    console.log(" >> > check values", values);
    const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Đăng ký user thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user error",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <div style={{ margin: "10px" }}>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            {" "}
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Full Name không được để trống!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            {" "}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: "Email không đúng định dạng" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            {" "}
            <Form.Item
              label="Password"
              name="password"
              // eslint-disable-next-line no-undef
              rules={[{ required: true, message: "Password không được để trống!" }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            {" "}
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  // required: true,
                  pattern: new RegExp(/^\d+$/),
                  message: "Không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* <button type="submit">Register</button> */}

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <div>
              <Button onClick={() => form.submit()} type="primary">
                Register
              </Button>
            </div>
            <Divider />
            <div>
              Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default RegisterPage;
