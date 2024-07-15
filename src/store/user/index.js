import { defineStore } from 'pinia'
import { getUserInfo, userLogin } from '@/api/user/index.js'
import defaultAvatar from '@/static/avatar.png'

export const useUserStore = defineStore('user', {
    state() {
        return {
            userInfo:{},
            token: ''
        }
    },
    getters: {
        userId: state => state.userInfo?.userId,
        avatar: state => state.userInfo?.avatar,
        username: state => state.userInfo?.username,
    },
    actions: {
        async login() {
            const { code } = await uniLogin({
              provider: 'weixin',
            })
            console.log('code', code)
            const res = await userLogin({ jsCode: code })
            console.log('login.res', res)
      
            if (!res.success) {
              throw new Error('登录失败')
            }
      
            if (!res?.data || !res?.data?.token) {
              throw new Error('登录失败, 没有获取到用户凭证')
            }
      
            this.setToken(res.data.token)
        },
        removeToken() {
            this.token = ''
            removeToken()
        },
        setToken(token) {
            this.token = token
            setToken(token)
        },
        // 获取用户详情
        async getUserInfo({ params = {}, ...options } = {}) {
            const res = await getUserInfo(params, options)
    
            if (!res?.success) {
                throw new Error('获取用户信息失败')
            }
    
            if (!res?.data) {
                throw new Error('获取用户信息失败, 没有获取到数据')
            }
    
            const data = res.data
            this.userInfo = {
                ...data,
                userId: data.id,
                avatar: data.avatar || defaultAvatar,
                username: data.username,
            }
    
            return this.userInfo
        },
        logout({ silenced = false, redirect = null } = {}) {
            this.removeToken()
            this.userInfo = {}
    
            if (!silenced) {
                router.replaceAll({
                    force: true,
                    path: '/login',
                    query: {
                        redirect,
                    },
                })
            }
        }
    }
});