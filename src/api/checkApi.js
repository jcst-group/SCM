import {getParams, postParams} from './manageApi'

const getCheckList = params => getParams('/finance/detect/listToDetectUser', params)
const acceptOrder = params => postParams('/finance/detect/detectAccept', params)
const rejectOrder = params => getParams('/finance/detect/reject', params)
const finishOrder = params => getParams('/finance/detect/finish', params)

export {
    getCheckList,
    acceptOrder,
    rejectOrder,
    finishOrder
}