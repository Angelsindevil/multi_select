import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import router from '../router'
// Vue.use(Vuex)
const state={
	indexObj:{
		length:'',
		indexArr:{},
	},
}
const store=new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store