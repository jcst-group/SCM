import {getParams, postParams} from './manageApi'

const login = params => postParams('/financeuser/login', params)
const userMenu = params => getParams('/financeuser/getUserMenu', params)
const logout = params => getParams('/financeuser/logout', params)

//基础信息
const querycominfo = params => getParams('/finance/cominfo/query', params)
const saveorupdate = params => postParams('/finance/cominfo/saveorupdate', params)
const getChinaArea = (params)=>getParams("/area/getAreaByLevel",params);
const getSecondArea = (params)=>getParams("/area/getAreaByParentCode",params);
const getCompanyTypeEnum = (params)=>getParams("/finance/enum/getCompanyTypeEnum",params);
const deletepictureInfo = (params)=>getParams("/finance/pictureInfo/delete",params);
const querylegalPerson = params => getParams('/finance/legalPerson/query', params)
const saveorupdatelegalper = params => postParams('/finance/legalPerson/saveorupdate', params)
const queryregistInfo = params => getParams('/finance/registInfo/query', params)
const saveorupdateregistInfo = params => postParams('/finance/registInfo/saveorupdate', params)

//社员页面
const memberlist = params => getParams('/finance/member/list', params)
const addOrUpdate = params => postParams('/finance/member/addOrUpdate', params)
const deletemember = params => getParams('/finance/member/delete', params)

// 保险管理
const getCoopList = params => getParams('/finance/order/listToCoop', params)
const getInsuranceType = params => getParams('/finance/enum/getInsuranceTypeEnum', params)
const getMemberList = params => getParams('/finance/member/listAll', params)
const getInsuranceCompany = params => getParams('/finance/cominfo/queryInsuranceCominfos', params)
const getCompanyInfo = params => getParams('/finance/cominfo/query', params)
const addCoopInsurance = params => postParams('/finance/order/saveOrUpdate', params)
const getInsuranceStatus = params => getParams('/finance/enum/getInsuranceStatusEnum', params)
const deleteInsurance = params => getParams('/finance/order/delete', params)
const applyInsurance = params => getParams('/finance/order/applyOrder', params)
const cancelInsurance = params => getParams('/finance/order/cancelOrder', params)

//账户管理
const financeUserList = params => getParams('/finance/financeUser/list', params)
const financebaseall = params => getParams('/finance/base/all', params)
const basebind = params => postParams('/finance/base/bind', params)
const checkUser = params => getParams('/finance/financeUser/checkUserName', params)
const financeUsersave = params => postParams('/finance/financeUser/save', params)
const financeUserupdate = params => postParams('/finance/financeUser/updateUser', params)
const financeupdapass = params => postParams('/finance/financeUser/updatePassword', params)
const roleall = params => getParams('/finance/role/all', params)
const addRoleToUser = params => postParams('/finance/role/addRoleToUser', params)
const getFinanceUserTypeEnum = params => getParams('/finance/enum/getFinanceUserTypeEnum', params)
const deleteUser = params => getParams('/finance/financeUser/deleteUser', params)

//担保&贷款管理
const listToCoop = params => getParams('/finance/loan/listToCoop', params)
const getLoanApplyTypeEnum = params => getParams('/finance/enum/getLoanApplyTypeEnum', params)
const queryBankCominfos = params => getParams('/finance/cominfo/queryBankCominfos', params)
const queryWarrantCominfos = params => getParams('/finance/cominfo/queryWarrantCominfos', params)
const baseRelateBatchAll = params => getParams('/finance/baseRelateBatch/all', params)
const calPrepareItem = params => getParams('/finance/baseRelateBatch/calPrepareItem', params)
const saveOrUpdateloan = params => postParams('/finance/loan/saveOrUpdate', params)
const loanapply = params => getParams('/finance/loan/apply', params)
const loancancel = params => getParams('/finance/loan/loanCancel', params)
const loandelete = params => getParams('/finance/loan/delete', params)
const queryWorker = params => getParams('/finance/loan/queryWorker', params)

//担保申请管理
const listToGuarantee = params => getParams('/finance/loan/listToGuarantee', params)
const allByIdbatch = params => getParams('/finance/baseRelateBatch/allById', params)
const loanwarrantApply = params => getParams('/finance/loan/warrantApplyAgree', params)
const WarrantApproveAgree = params => getParams('/finance/loan/WarrantApproveAgree', params)
const loanreject = params => getParams('/finance/loan/loanreject', params)

//银行申请管理
const listToBank = params => getParams('/finance/loan/listToBank', params)
const loanApplyAgree = params => getParams('/finance/loan/loanApplyAgree', params)
const loanApproveAgree = params => getParams('/finance/loan/loanApproveAgree', params)
const getLoanApplyStatusEnum = params => getParams('/finance/enum/getLoanApplyStatusEnum', params)
const getLoanApplyStatusEnumToBank = params => getParams('/finance/enum/getLoanApplyStatusEnumToBank', params)

// 检测管理
const getCheckOrder = params => getParams('/finance/detect/listToFinanceUser', params)
const acceptCheckOrder = params => getParams('/finance/detect/coopAccept', params)
const rejectCheckOrder = params => getParams('/finance/detect/reject', params)

//通知列表
const notifylist = params => getParams('/finance/notify/list', params)
const readOne = params => getParams('/finance/notify/readOne', params)
const allRead = params => getParams('/finance/notify/allRead', params)
const listCount = params => getParams('/finance/notify/listCount', params)

export {
    login,
    userMenu,
    logout,

    querycominfo,
    saveorupdate,
    getChinaArea,
    getSecondArea,
    getCompanyTypeEnum,
    deletepictureInfo,
    querylegalPerson,
    saveorupdatelegalper,
    queryregistInfo,
    saveorupdateregistInfo,

    memberlist,
    addOrUpdate,
    deletemember,

    getCoopList,
    getInsuranceType,
    getMemberList,
    getInsuranceCompany,
    getCompanyInfo,
    addCoopInsurance,
    getInsuranceStatus,
    deleteInsurance,
    applyInsurance,
    cancelInsurance,

    financeUserList,
    financebaseall,
    basebind,
    checkUser,
    financeUsersave,
    financeUserupdate,
    financeupdapass,
    roleall,
    addRoleToUser,
    getFinanceUserTypeEnum,
    deleteUser,

    listToCoop,
    getLoanApplyTypeEnum,
    queryBankCominfos,
    queryWarrantCominfos,
    baseRelateBatchAll,
    calPrepareItem,
    saveOrUpdateloan,
    loanapply,
    loancancel,
    loandelete,

    listToGuarantee,
    allByIdbatch,
    loanwarrantApply,
    WarrantApproveAgree,
    loanreject,
    queryWorker,

    listToBank,
    loanApplyAgree,
    loanApproveAgree,
    getLoanApplyStatusEnum,
    getLoanApplyStatusEnumToBank,

    getCheckOrder,
    acceptCheckOrder,
    rejectCheckOrder,

    notifylist,
    readOne,
    allRead,
    listCount,
}
