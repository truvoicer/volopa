import {Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button, message, notification} from 'antd'
import {connect} from "react-redux";
import {CURRENCY_LIST, CURRENCY_STATE} from "../../library/redux/constants/currency-constants";
import {useState} from "react";
import {isNotEmpty} from "../../library/helpers/utils-helper";
import {fetchRequest} from "../../library/api/middleware";
import config from "../../library/api/config";
import {useForm} from "antd/lib/form/Form";

//Define field constants
const CONVERT_FROM = 'convertFrom';
const CONVERT_TO = 'convertTo';
const CONVERT_FROM_CURRENCY_CODE = 'convertFromCurrencyCode';
const CONVERT_TO_CURRENCY_CODE = 'convertToCurrencyCode';
const AMOUNT = 'amount';
const RATE = 'rate';

/**
 * RateChecker component
 * Converts currency based on user input
 * @param session
 * @param currencyList
 * @returns {JSX.Element}
 * @constructor
 */
function RateChecker({currencyList}) {
    const [form] = useForm();   //Antd useForm hook
    //Initialise convertFrom state var
    const [convertTo, setConvertTo] = useState({
        [AMOUNT]: '',
        [RATE]: 1.19,
    });

    const [convertFrom, setConvertFrom] = useState({
        [AMOUNT]: '',
        [RATE]: 1.19,
    });

    //Initialise form field value watchers
    const fromCurrencyCode = Form.useWatch(CONVERT_FROM_CURRENCY_CODE, form);
    const toCurrencyCode = Form.useWatch(CONVERT_TO_CURRENCY_CODE, form);
    const convertFromValue = Form.useWatch(CONVERT_FROM, form);
    const convertToValue = Form.useWatch(CONVERT_TO, form);

    /**
     * Function to modify a convert state object values
     * @param stateObjSet
     * @param data
     */
    function setConvertState(stateObjSet, data) {
        stateObjSet(stateObj => {
            let cloneStateObj = {...stateObj};
            data.forEach(item => {
                cloneStateObj[item.key] = item.value;
            })
            return cloneStateObj;
        })
    }

    /**
     * Builds text content for currency conversion results
     * @param fromValue
     * @param rate
     * @param amount
     * @param fromCurrencyCode
     * @param toCurrencyCode
     * @returns {JSX.Element}
     */
    function buildConversionAlert({fromValue, rate, amount, fromCurrencyCode, toCurrencyCode}) {
        return (
            <p>
                {`Converting ${fromValue} ${fromCurrencyCode} to ${toCurrencyCode}`}
                <br />
                {`Conversion Rate ${rate}`}
                <br />
                {`Value ${amount} ${toCurrencyCode}`}
            </p>
        )
    }

    /**
     * Fetch request for currency conversion
     * Sets state vars and displays notification with conversion results
     * @param values
     * @returns {Promise<void>}
     */
    async function currencyConversionRequest(values) {
        //Make currency convert api request
        const result = await fetchRequest({
            endpoint: `${config.endpoints.currencyConvert}`,
            params: values
        })

        const data = result?.data?.data;    //Request data response object
        const convertTo = data?.convert_to; //Get convertTo object
        const convertFrom = data?.convert_from;     //Get convertTo object

        //Update convertTo state object if it exists in api response
        if (isNotEmpty(convertTo)) {
            setConvertState(
                setConvertTo,
                [
                    {key: AMOUNT, value: convertTo[AMOUNT]},
                    {key: RATE, value: convertTo[RATE]}
                ]
            )
        }

        //Update convertFrom state object if it exists in api response
        if (isNotEmpty(convertFrom)) {
            setConvertState(
                setConvertFrom,
                [
                    {key: AMOUNT, value: convertFrom[AMOUNT]},
                    {key: RATE, value: convertFrom[RATE]}
                ]
            )
        }

        //Call notification alert with conversion results
        notification.info({
            message: `Conversion Results `,
            description: (
                <>
                    {isNotEmpty(convertFrom) && buildConversionAlert({
                        fromValue: convertFromValue,
                        amount: convertFrom[AMOUNT],
                        rate: convertFrom[RATE],
                        fromCurrencyCode: fromCurrencyCode,
                        toCurrencyCode: toCurrencyCode
                    })}
                    {isNotEmpty(convertTo) && buildConversionAlert({
                        fromValue: convertToValue,
                        amount: convertTo[AMOUNT],
                        rate: convertTo[RATE],
                        fromCurrencyCode: toCurrencyCode,
                        toCurrencyCode: fromCurrencyCode
                    })}
                </>
            ),
            placement: 'top',
        });
    }

    /**
     * Form submit handler
     * Validates form values after submit
     * Calls api conversion request function if validated
     * @param values
     */
    function formSubmitHandler(values) {
        if (!isNotEmpty(values[CONVERT_TO_CURRENCY_CODE]) || !isNotEmpty(values[CONVERT_FROM_CURRENCY_CODE])) {
            message.error('Convert to/from currency codes must be selected');
            return;
        }
        if (!isNotEmpty(values[CONVERT_FROM]) && !isNotEmpty(values[CONVERT_TO])) {
            message.error('A Convert to/from value must be entered');
            return;
        }
        currencyConversionRequest(values);
    }

    /**
     * Builds select form input with available currencies
     * Filters between common currencies and other currencies
     * @param name
     * @returns {JSX.Element}
     */
    function buildSelect(name) {
        const commonCurrencies = currencyList.filter(currency => currency?.common); //Filter common currencies
        const otherCurrencies = currencyList.filter(currency => !currency?.common); //Filter other currencies
        return (
            <Form.Item name={name}
                       rules={[{
                           required: true,
                           type: 'string',
                           message: 'Please select a currency'
                       }]}>
                <Select
                    className='dark-green'
                    showSearch
                    filterOption={(input, option) => {
                        if (option.children)
                            return option.children.toLowerCase().includes(input.toLowerCase())
                        else if (option.label)
                            return option.label.toLowerCase().includes(input.toLowerCase())
                    }}>
                    <Select.OptGroup label='Common'>
                        {commonCurrencies.map((currency, index) => {
                            return (
                                <Select.Option
                                    key={`${name}_common_${index}`}
                                    value={currency?.code}>{currency?.code}</Select.Option>
                            )
                        })}
                    </Select.OptGroup>
                    <Select.OptGroup label='Other'>
                        {otherCurrencies.map((currency, index) => {
                            return (
                                <Select.Option
                                    key={`${name}_other_${index}`}
                                    value={currency?.code}>{currency?.code}</Select.Option>
                            )
                        })}
                    </Select.OptGroup>
                </Select>
            </Form.Item>
        )
    }

    //Builds/updates fx rate text with conversion information
    function buildFxRateText() {
        return (
            <>
                <Typography.Text className='muli semi-bold light-green'>
                    FX Rate
                </Typography.Text>
                <Typography.Text className='muli semi-bold light-green'>
                    {`${convertFromValue} ${fromCurrencyCode} = ${convertFrom[RATE]} ${toCurrencyCode}`}
                </Typography.Text>
            </>
        );
    }
    const amountPattern = '([0-9.])$';
    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            <Form
                                initialValues={{
                                    [CONVERT_FROM_CURRENCY_CODE]: 'GBP',
                                    [CONVERT_TO_CURRENCY_CODE]: 'EUR',
                                    [CONVERT_FROM]: '',
                                }}
                                form={form}
                                layout='vertical'
                                onFinish={formSubmitHandler}>
                                <Row>
                                    <Col span={24}>
                                        <label htmlFor='convertFrom'><span className='muli semi-bold fs-18px'>Convert From</span></label>
                                        <Row gutter={8}>
                                            <Col span={6}>
                                                {buildSelect('convertFromCurrencyCode')}
                                            </Col>
                                            <Col span={18}>
                                                <Form.Item
                                                    name='convertFrom'
                                                    rules={[{
                                                        required: true,
                                                        type: amountPattern,
                                                        message: 'Please enter a valid amount'
                                                    }]}>
                                                    <Input placeholder='Enter Amount'/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <label htmlFor='convertTo' className='m-b-2'><span
                                            className='muli semi-bold fs-18px '>Convert To</span></label>
                                        <Row gutter={8}>
                                            <Col span={6}>
                                                {buildSelect('convertToCurrencyCode')}
                                            </Col>
                                            <Col span={18}>
                                                <Form.Item name='convertTo'
                                                           rules={[{
                                                               required: false,
                                                               pattern: amountPattern,
                                                               message: 'Please enter a valid amount'
                                                           }]}>
                                                    <Input placeholder='Enter Amount'/>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`}/>
                                            <Space direction='vertical' size={0}>
                                                {buildFxRateText()}
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button type='primary' htmlType='submit'>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

function mapStateToProps(state) {
    return {
        currencyList: state[CURRENCY_STATE][CURRENCY_LIST]
    };
}

export default connect(
    mapStateToProps,
    null
)(RateChecker);