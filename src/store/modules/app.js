import { normalizeUrl } from "@/utils";
import * as MutationTypes from "@/store/mutation-types";
import { MODULE_TYPE_LIST } from "@/constant/app";
import {
	getUserInfo,
	getUserModuleTree,
	getUserElPermissions,
} from "@/api/user";
import router, { appendRoutes, generateAsyncRoutes } from "@/router";

const state = {
	userInfo: null, // 用户信息
	asyncMenus: null, // 接口返回的菜单原始数据
	asyncRoutes: null, // 根据菜单数据生成的VueRoute的路由配置
	cachedRoutes: [], // 已经缓存的路由名
	elementPermissions: {}, // 路由元素级权限
	activeRootRoute: null, // 当前激活的根路由
	isShowPanel: true,
};

const getters = {
	isShowPanel: (state) => state.isShowPanel,
	userInfo: (state) => state.userInfo,
	asyncRoutesInitialized: (state) => state.asyncRoutes !== null,
	normalizedMenus: (state) => {
		const convertMenus = (menus = [], level = 0) => {
			if (menus) {
				return menus
					.slice(0)
					.map((menu) => {
						const {
							moduleImg,
							moduleName,
							moduleLayout,
							moduleType,
							moduleUrl,
							moduleIframeSrc,
							moduleCode,
							moduleSeq,
							moduleHidden,
							moduleCache,
							childs: children,
						} = menu || {};
						return {
							icon: moduleImg,
							title: moduleName,
							layout: moduleLayout,
							type: moduleType,
							path: normalizeUrl(moduleUrl),
							iframeSrc: normalizeUrl(moduleIframeSrc),
							name: moduleCode,
							seq: +moduleSeq,
							hidden: !!moduleHidden,
							cache: !!moduleCache,
							level,
							children: convertMenus(children, level + 1),
						};
					})
					.sort((prev, cur) => {
						return +prev.seq - +cur.seq;
					});
			}
			return [];
		};
		return convertMenus(state.asyncMenus);
	},
	displayMenus: (state, getters) => {
		const normalizedMenus = getters.normalizedMenus;
		const getDisplayMenus = (menus) => {
			return menus
				.slice(0)
				.filter((menu) => !menu.hidden)
				.map((menu) => {
					return {
						...menu,
						children: getDisplayMenus(menu.children || []),
					};
				});
		};
		return getDisplayMenus(normalizedMenus);
	},
	activeRootRoute: (state) => state.activeRootRoute,
};

const mutations = {
	[MutationTypes.SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo;
	},
	[MutationTypes.SET_ASYNC_MENUS](state, menus = []) {
		state.asyncMenus = menus;
	},
	[MutationTypes.SET_ASYNC_ROUTES](state, routes = []) {
		state.asyncRoutes = routes;
	},
	[MutationTypes.ADD_CACHE_ROUTE](state, name) {
		const cachedRoutes = state.cachedRoutes || [];
		if (!cachedRoutes.includes(name)) {
			state.cachedRoutes = [...cachedRoutes, name];
		}
	},
	[MutationTypes.SET_ELEMENT_PERMISSIONS](state, { name, permissions }) {
		state.elementPermissions[name] = permissions || [];
	},
	[MutationTypes.SET_ACTIVE_ROOT_ROUTE](state, activeRootRoute) {
		state.activeRootRoute = activeRootRoute;
	},
	[MutationTypes.CHANGE_SHOW_HIDDEN](state, type) {
		state.isShowPanel = type;
	},
};

const actions = {
	/**
	 * 初始化异步路由
	 */
	async initialAsyncRoutes({ getters, commit }) {
		const payload = {
			moduleType: MODULE_TYPE_LIST.map((type) => type.value).join(","),
		};
		const asyncMenus = await getUserModuleTree(payload);
		commit(
			MutationTypes.SET_ASYNC_MENUS,
			asyncMenus.filter(({ moduleCatalog, moduleUrl }) => {
				return moduleCatalog === "pageType" && moduleUrl !== "/";
			})
		);
		const accessRoutes = generateAsyncRoutes(getters.normalizedMenus);
		router.addRoutes([...accessRoutes, ...appendRoutes]);
		commit(MutationTypes.SET_ASYNC_ROUTES, accessRoutes);
		return accessRoutes;
	},
	async fetchUserInfo({ commit }) {
		const { errcode, errmsg, data } = await getUserInfo();
		if (errcode === 0) {
			commit(MutationTypes.SET_USER_INFO, data);
			return Promise.resolve(data);
		} else {
			return Promise.reject(errmsg);
		}
	},
	async fetchElementPermissions({ commit }, name) {
		const payload = {
			name,
			permissions: [],
		};
		try {
			const { errcode, data: permissions } = await getUserElPermissions(name);
			if (errcode === 0) {
				payload.permissions = permissions || [];
			}
		} catch (error) {
			console.error(error);
		}
		commit(MutationTypes.SET_ELEMENT_PERMISSIONS, payload);
		return payload.permissions;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
