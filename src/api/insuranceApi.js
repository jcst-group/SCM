import {getParams, postParams} from './manageApi'

const insuranceList = params => getParams('/finance/order/listToInsurance', params)
const rejectInsurance = params => getParams('/finance/order/rejectOrder', params)
const acceptInsurance = params => getParams('/finance/order/acceptOrder', params)
const finishInsurance = params => postParams('/finance/order/finishOrder', params)
const getInsuranceStatus = params => getParams('/finance/enum/getInsStatusEnumToIns', params)

export {
    insuranceList,
    rejectInsurance,
    acceptInsurance,
    finishInsurance,
    getInsuranceStatus
}