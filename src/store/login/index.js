import {reqCellPhoneByCode, reqCellPhoneByPassword,reqDetail,reqLogout} from '@/api'
import {setCookie,getCookie,removeCookie} from '@/utils/cookie'
import { setUserId,getUserId,removeUserId } from '@/utils/userId'
const state={
    code:0,
    cookie:getCookie(),
    userId:getUserId(),
    userInfo:{},
}
const mutations={
    UPDATETOKEN(state,cookie){
        setCookie(cookie);
        state.cookie = cookie;
    },
    UPDATEUSERINFO(state,userId){
        setUserId(userId);
        state.userId = userId;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    EXIT(state){
        state.userInfo = {};
        state.userId = "";
        state.token = "";
        removeCookie();
        removeUserId();
    }
}
const actions={
    //二维码更新Token
    updateToken({commit},cookie){
        commit('UPDATETOKEN',cookie);
    },
    //手机验证码更新Token
    async updateTokenWithCode({commit},{phone,code}){
        try{
            let result = await reqCellPhoneByCode(phone,code);  
            if(result.code == 200){
                commit('UPDATETOKEN',result.cookie);
                commit('UPDATEUSERINFO',result.profile);
            }       
        }catch(error){
            alert(error);
        }
    },
    //密码更新Token
    async updateTokenWithPassword({commit},{phone,password}){
        try {
            let result = await reqCellPhoneByPassword(phone,password);    
            if(result.code == 200){
                commit('UPDATETOKEN',result.cookie);
                commit('UPDATEUSERINFO',result.account.id);
            }
        } catch (error) {
            alert(error);
        }
        
    },
    //获取用户信息
    async getUserInfo({commit},id){
        let result = await reqDetail(id);
        commit('GETUSERINFO',result);
    },
    //退出登录
    async exit({commit}){
        await reqLogout();
        commit('EXIT');
    }
}
const getters={

}

export default{
    state,
    mutations,
    actions,
    getters
}