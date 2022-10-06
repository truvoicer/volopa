import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {useState} from "react";
import {authLoginRequest, handleTokenResponse} from "../../library/api/middleware";
import {
    useNavigate
} from "react-router-dom";
function Login() {
    const [fields, setFields] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const onFinish = async (values) => {
        let requestData = {...values};
        requestData.email = requestData?.username;  //Change username to email for api login

        //Make login api request with form input values
        const result = await authLoginRequest({
            payload: requestData
        })
        const handeResponse = handleTokenResponse(result);
        if (handeResponse) {
            //Redirect to home
            navigate('/')
        }
    };
    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                                <Form
                                    onFinish={onFinish}
                                    layout="vertical"
                                    requiredMark={false}
                                    initialValues={fields}
                                    onChange={newFields => {
                                        setFields(newFields);
                                    }}>
                                    <Form.Item
                                        rules={[{required: true, type: 'email'}]}
                                        label={<span className="muli semi-bold">Username</span>}
                                        name='username'

                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'>
                                        <Input.Password/>
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" className="right-align-text">Login</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;