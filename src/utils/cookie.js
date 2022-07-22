// 对外暴露一个函数
export const setCookie = (cookie) => {
    localStorage.setItem('COOKIE', cookie)
}

export const getCookie = () => {
    return localStorage.getItem('COOKIE')
}

export const removeCookie = () => {
    localStorage.removeItem('COOKIE')
}