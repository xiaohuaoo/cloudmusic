// 对外暴露一个函数
export const setCookie = (cookie) => {
    localStorage.setItem('COOKIE', cookie)
}
