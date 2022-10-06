import { Row, Col, Typography, Card, Space, Image } from 'antd'
import { walletData } from './store/data.js';
import {SESSION_STATE} from "../../library/redux/constants/session-constants";
import {connect} from "react-redux";
import {CURRENCY_STATE} from "../../library/redux/constants/currency-constants";
import {useEffect} from "react";
import {fetchRequest} from "../../library/api/middleware";
import config from "../../library/api/config";
import {setCurrencyListAction} from "../../library/redux/actions/currency-actions";

function WalletBreakdown() {

    async function fetchCurrencies() {
        const fetchCurrencies = await fetchRequest({
            endpoint: config.endpoints.currencies
        })
        const currencies = fetchCurrencies?.data?.data;
        if (Array.isArray(currencies) && currencies.length) {
            setCurrencyListAction(currencies)
        }
    }
    useEffect(() => {
        fetchCurrencies();
    }, [])

    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Wallet Breakdown</Typography.Text>
                    <Row>
                        <Col span={16}>
                            <Card className='bg-gradient big-rounded'>
                                <Row className='m-b-5'>
                                    <Col span={24} className='right-align-text'>
                                        <Typography.Text className='medium fs-18px pointer'>Show All</Typography.Text>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 8]}>
                                    {walletData && walletData.map((item, key) => (
                                        (key < 6) && (
                                            <Col span={12} key={key}>
                                                <Card className='b-g ant-card-body-p-5'>
                                                    <Row align='middle'>
                                                        <Col span={12}>
                                                            <Space>
                                                                {item.image && <Image src={item.image} preview={false} width='36px' />}
                                                                <Typography.Text className='dark-green medium fs-18px'>{item.currency && item.currency}</Typography.Text>
                                                            </Space>
                                                        </Col>
                                                        <Col span={12} className='right-align-text'>
                                                            <Typography.Text className='dark-green medium fs-18px'>{item.amount && item.amount}</Typography.Text>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        )
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function mapStateToProps(state) {
    return {
        currency: state[CURRENCY_STATE]
    };
}

export default connect(
    mapStateToProps,
    null
)(WalletBreakdown);
