//存储用户信息到本地

export const setUserId = (userId)=>{
    localStorage.setItem('USERID',userId);
}

export const getUserId = ()=>{
    return localStorage.getItem('USERID');
}

export const removeUserId = ()=>{
    localStorage.removeItem('USERID');
}