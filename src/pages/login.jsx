import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { loginUserAPI } from "../services/api.service";
import { useState } from "react";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async values => {
    setLoading(true);
    const res = await loginUserAPI(values.email, values.password);

    if (res.data) {
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <legend>Đăng nhập</legend>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <div style={{ margin: "10px" }}>
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

              <Form.Item
                label="Password"
                name="password"
                // eslint-disable-next-line no-undef
                rules={[{ required: true, message: "Password không được để trống!" }]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              {/* <button type="submit">Register</button> */}
              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button loading={loading} onClick={() => form.submit()} type="primary">
                    Login
                  </Button>
                  <Link to={"/"}>
                    Go home page <ArrowRightOutlined />{" "}
                  </Link>
                </div>
              </Form.Item>
            </div>
          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây?</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
