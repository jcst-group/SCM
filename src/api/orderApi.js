import {getParams, postParams} from './manageApi'

const orderList = params => getParams('/finance/detect/listToOrderUser', params)
const addOrder = params => postParams('/finance/detect/saveOrUpdate', params)
const deleteOrder = params => getParams('/finance/detect/delete', params)
const getCheckType = params => getParams('/finance/enum/getDetectionTypeEnum', params)
const getCheckStatus = params => getParams('/finance/enum/getDetectionStatusEnum', params)
const getMemberByCoop = params => getParams('/finance/member/listAllByUserId', params)
const getCoopInfo = params => getParams('/finance/cominfo/queryCoopCominfos', params)
const getCheckList = params => getParams('/finance/cominfo/queryDetectCominfos', params)
const startOrder = params => getParams('/finance/detect/apply', params)
const cancelOrder = params => getParams('/finance/detect/cancel', params)

export {
    orderList,
    addOrder,
    deleteOrder,
    getCheckType,
    getCheckStatus,
    getMemberByCoop,
    getCoopInfo,
    getCheckList,
    startOrder,
    cancelOrder
}