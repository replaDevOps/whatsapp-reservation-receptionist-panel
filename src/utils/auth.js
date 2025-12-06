const getUserId = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("userId"))
    return user?.id || null
  }
  catch (e){
    return null
  }
}
const getBusinessId = () => {
  try {
    const businessId = localStorage.getItem("businessId");
    return businessId || null;
  } catch (e) {
    return null;
  }
};

const getBranchId = () => {
  try {
    const branchId = localStorage.getItem("branchId");
    return branchId || null;
  } catch (e) {
    return null;
  }
};
export {
    getUserId,
    getBusinessId,
    getBranchId,
}