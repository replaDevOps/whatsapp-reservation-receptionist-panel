import { Form, Button, Typography, Row, Col, Checkbox, Flex, Image } from "antd";
import { NavLink } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../components";
import { useTranslation } from "react-i18next";
import { LanguageChange } from "../Sidebar/LanguageChange";
import { LOGIN_USER } from "../../graphql/mutation/mutations";
import { useMutation } from "@apollo/client/react";

const { Title, Paragraph } = Typography;
const LoginPage = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [messageApi, contextHolder] = message.useMessage();
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER)
    const [form] = Form.useForm();

     const handleFinish = async () => {
            const values = form.getFieldsValue()
             try {
              const { email, password } = values;
              const { data,error } = await loginUser({ variables: { email, password, role: 'RECEPTIONIST'} });
              if (data) {
                localStorage.setItem("accessToken", data.loginUser.token);
                localStorage.setItem("userId", data.loginUser.user.id || "");
                localStorage.setItem("email", data.loginUser.user.email || "");
                localStorage.setItem("fullName",`${data.loginUser.user.firstName} ${data.loginUser.user.lastName}` || "");
                localStorage.setItem("branch", data?.loginUser?.user?.branch?.name || "");
                localStorage.setItem("branchId", data?.loginUser?.user?.branch?.id || "");
                localStorage.setItem("businessId", data?.loginUser?.user?.branch?.business?.id || "");
                messageApi.success("Login successful!");
                navigate("/")
              } else {
                messageApi.error("Login failed: Invalid credentials");
              }
            } catch (error) {
            console.error("Login error:", error);
            messageApi.error("Login failed: Something went wrong");
            }
       
      };

    return (
        <>
            {contextHolder}
            <Row className="signup-page" align={"middle"}>
                <Col xs={24} sm={24} md={12} lg={10} className="signup-form-container">
                    <div className="form-inner">
                        <NavLink to={"/"}>
                            <div className="logo">
                                <img src="/assets/images/logo.webp" className="h-70" alt='logo image' fetchPriority="high" />
                            </div>
                        </NavLink>

                        <Title level={3} className="mb-1">{t("Welcome Receptionist Admin Panel.")}</Title>
                        <Paragraph className="fs-16">
                            {t("Please sign in to access your system and manage platform activities.")}
                        </Paragraph>

                        <Form layout="vertical" form={form} onFinish={handleFinish} requiredMark={false}
                            initialValues={{
                                email:'receptionistpanel@gmail.com',
                                password:'Repla@123'
                            }}
                        >
                            <MyInput 
                                label={t("Email Address" )}
                                name="email" 
                                required 
                                message={t("Please enter email address")} 
                                placeholder={t("Enter Email Address")} 
                            />
                            <MyInput 
                                label={t("Password")} 
                                type={"password"} 
                                name="password" 
                                required 
                                message={t("Please enter password")} 
                                placeholder={t("Enter Password")} 
                            />
                            <Flex justify="space-between" className="mb-3">
                                <Checkbox>{t("Remember Me")}</Checkbox>
                                <NavLink to={"/forgotpassword"} className="fs-13 text-brand">
                                    {t("Forget Password?")}
                                </NavLink>
                            </Flex>
                            <Button htmlType="submit" type="primary" className="btnsave bg-dark-blue fs-16" block 
                                loading={loading}
                            >
                                {t("Sign In")}
                            </Button>
                            <Paragraph className="text-center mt-3">
                                {t("For tablet based self-booking?")} <NavLink className={'text-brand'} to={'/'}>{t("Sign In")}</NavLink>
                            </Paragraph>
                        </Form>
                    </div>
                </Col>
                <Col xs={0} md={12} lg={14} className="signup-visual-container">
                    <Flex justify="end">
                        <LanguageChange />
                    </Flex>
                    <Flex vertical justify="space-between" align="center" gap={40} className="logo-sp">
                        <Flex vertical align="center" gap={20}>
                            <Title level={2} className="m-0">
                                {t("Simplify Your Bookings,")}
                            </Title>
                            <Title level={2} className="m-0 text-dark-brand">
                                {t("Streamline")} <span className="px-2 radius-12 py-2 bg-white">{t("Your Day.")}</span>
                            </Title>
                        </Flex>
                        <Image src="/assets/images/login-frame.svg" alt='dashboard image' fetchPriority="high" preview={false} />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export { LoginPage };
