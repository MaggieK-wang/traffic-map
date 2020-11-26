import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
    return {
        token: getToken(),
        name: "",
        avatar: ""
    };
};

const state = getDefaultState();

const mutations = {
    RESET_STATE: state => {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    // 保存用户信息
    SET_AVATAR: (state, avatar) => {
        state.userInfo = data;
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        // promise 可以处理同步请求
        return new Promise((resolve, reject) => {
            var _params = {
                loginAccount: username,
                password: password,
                isAdmin: "1"
            };

            login(_params)
                .then(response => {
                    const { data } = response;
                    commit("SET_TOKEN", data.token);
                    setToken(data.token);

                    //将登陆信息保存起来备用 
                    sessionStorage.setItem(
                        "loginAccount",
                        JSON.stringify(data.userAccount)
                    );
                    commit("_SET_URSER_INFO", data);
                    // console.log(data);
                    // debugger;
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then(response => {
                    const { data } = response;

                    if (!data) {
                        reject("Verification failed, please Login again.");
                    }

                    const { name, avatar } = data;

                    commit("SET_NAME", name);
                    commit("SET_AVATAR", avatar);

                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({ commit }, userInfo) {
        // const { userAccount } = userInfo;
        console.log(userInfo);
        debugger
        return new Promise((resolve, reject) => {
            var _params = {
                userAccount: userInfo
            }
            logout(_params).then(response => {
                    console.log(response);
                    removeToken() // must remove  token  first
                    resetRouter()
                    commit('RESET_STATE')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // user logout
    // logout({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         logout(state.token).then(() => {
    //             removeToken() // must remove  token  first
    //             resetRouter()
    //             commit('RESET_STATE')
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken(); // must remove  token  first
            commit("RESET_STATE");
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};