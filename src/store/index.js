import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		language: 'en',
		isShowLoginBox: false, //会员登录注册窗口
		memberInfo: {},
		isShowStaffBox: false, //员工登录注册窗口
		isShowMemberInfoBox: false,
		staffInfo: {}, //登录后的员工信息
		isViewMode: false,
		systemInfo: {},
		userInfo: null,
	},
	mutations: {
		setLanguage:(state , item) => {
			state.language = item
		},
		setLoginBox:(state , item) => {
			state.isShowLoginBox = item
		},
		setMember:(state , item) => {
			state.memberInfo = item
		},
		setStaffLoginBox:(state , item) => {
			state.isShowStaffBox = item
		},
		setStaffInfo:(state , item) => {
			state.staffInfo = item
		},
		setViewMode:(state , item) => {
			state.isViewMode = item
		},
		setShowMemberboxMode:(state , item) => {
			state.isShowMemberInfoBox = item
		},
		setSystemInfo:(state , item) => {
			state.systemInfo = item
		},
		updateUserInfo(state,doc){
			state.userInfo = doc
		  },
	},
	actions: {
		setLanguage: ({ commit }, item) => {
			commit('setLanguage', item)
		},
		setLoginBox: ({ commit }, item) => {
			commit('setLoginBox', item)
		},
		setMember: ({ commit }, item) => {
			commit('setMember', item)
		},
		setStaffLoginBox: ({ commit }, item) => {
			commit('setStaffLoginBox', item)
		},
		setStaffInfo: ({ commit }, item) => {
			commit('setStaffInfo', item)
		},
		setViewMode: ({ commit }, item) => {
			commit('setViewMode', item)
		},
		setShowMemberboxMode: ({ commit }, item) => {
			commit('setShowMemberboxMode', item)
		},
		setSystemInfo: ({ commit }, item) => {
			commit('setSystemInfo', item)
		},
		updateUserInfo(context,item){
			context.commit('updateUserInfo',item)
		  },
	}
})
