import { defineStore } from 'pinia';

export interface UserState {
    userinfo: any;
    token: string;
}

export const useUserStore = defineStore('userStore', {
    state: (): UserState => {
        return {
            userinfo: null,
            token: '',
        };
    },
    getters: {
        GetUserInfo: (state: UserState) => state.userinfo,
        GetToken: (state: UserState) => state.token,
    },
    actions: {
        async handleGetUserInfo(userinfo?: any) {
            return (this.userinfo = userinfo);
        },

        async handleGetToken(token?: string) {
            return (this.token = token);
        },
    },
});
