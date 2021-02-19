import DataType from './utils/data-type'
import Storage from './core/storage'
import Query from './core/query'
import Rest from './core/rest'
import Inner from './core/inner'
import FormTable from './core/form-table'
/* ====================================== 全局变量及方法  ====================================== */
const _ = {
	// ======================================================================== 功能函数
	...DataType,
	...Storage,
	...Query,
	...Rest,
	...Inner,
	...FormTable,
	// ======================================================================== 全局变量
	c0:'#32B5CB',
	// ======================================================================== 正则匹配
	//	isTel(v){ return /^1[0-9]{10}$/.test(v) },
	//	isPwd(v){ return /\w{6,18}$/.test(v) },
	//	pwdReg: /\w{6,18}$/,
	//	isId(v){ return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v) },
	//	isCard(v){ return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(v) },
	//	isCard(v){ return true},
	//	isEmail(v){ return /^([0-9A-Za-z\-_]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(v) },
	//	isInt(v){ return /^[1-9]\d*$/.test(v) }, // 整数
	// 刷新key
	refresh(_this){ _this.setState({ key: (_this.state.key || 0) + 1}) },
	// 储存与获取数据
	getData(_this, api, {dataName = 'data',loadingTxt='loading'}){
		const { $fn, $http } = window
		const data = $fn.local(api)
		if ($fn.hasArray(data)) {
			_this.setState({ [dataName]:data, [loadingTxt]:false })
		} else {
		    $http.submit(null, api).then(data => {
		        _this.setState({ [dataName]:data, [loadingTxt]:false })
				$fn.local(api,data)
		    })
		}
	},
	// 获取下拉框数据
	async getSelect(api){
		const { $fn, $http } = window
		const data = $fn.local(api)
		if ($fn.hasArray(data)) {
			return data
		} else {
		    return await $http.pull(null, api).then(data => {
				$fn.local(api,data)
				return data;
		    })
		}
	},
	// 将下拉框数据赋给 submit 数据
	setSubmitSelect(name, submit, data ){
		const rows = submit.filter(v => v.name === name)
		if(this.hasArray(rows)){ rows[0]['data'] = data }
	},
	// 修改回显
	// setFormFields(submit, data) {
	// 	submit.forEach(v => {
	// 		for (let i in data) {
	// 			if (i === v.name) {
	// 				v.value = data[i]
	// 			}
	// 		}
	// 	})
	// 	return submit
	// },
	// 获取提交数据
	getSubmit(submit){
		const param = {}
		submit.forEach(v=> param[v.name] = this.isValid(v.value) ? v.value : '' )
		return param
	},
	// 刷新路由
	refreshRouter(){
		window.proxy.refresh()
	},
}

export default _