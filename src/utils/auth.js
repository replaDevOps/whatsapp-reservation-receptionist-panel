const getUserId = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.id || null
  }
  catch (e){
    return null
  }
}
const getBusinessId = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"));
    return user?.branch?.business?.id || null;
  } catch (e) {
    return null;
  }
};

const getBranchId = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"));
    return user?.branch?.id || null;
  } catch (e) {
    return null;
  }
};

const getUserFirstName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.firstName || null;
  } catch (e) {
    return null;
  }
};

const getUserLastName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.lastName || null;
  } catch (e) {
    return null;
  }
};

const getBusinessName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.branch?.business?.name || null;
  } catch (e) {
    return null;
  }
};

const getBusinessImage = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.branch?.business?.image || null;
  } catch (e) {
    return null;
  }
};

const getUserName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.firstName + ' ' + user?.lastName || null;
  } catch (e) {
    return null;
  }
};

const getBranchName = () => {
  try {
    const user = JSON.parse(localStorage?.getItem("user"))
    return user?.branch?.name || null;
  } catch (e) {
    return null;
  }
};



export {
    getUserId,
    getUserName,
    getBusinessId,
    getBusinessName,
    getBusinessImage,
    getBranchId,
    getBranchName,
    getUserFirstName,
    getUserLastName,
}