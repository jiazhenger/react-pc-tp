/* ====================================== toast  ====================================== */
import React from 'react'
// ===================================================================== antd
const { $fn } = window
// ===================================================================== compnent

const Error = ({ msg, className, style }) => <div className={`c0 f12 lh20 ${className?className:'ml10'}`} style={style}>{msg}</div>


const empty = (data) => {
	let flag  = $fn.isEmpty(data)
	if($fn.isArray(data)){
		flag = !$fn.hasArray(data)
	}
	return flag
}

export default ({ data, msg, className, reg, must, down }) => {
	let flag = false
	if(must && reg === undefined){
		flag = empty(data)
	} else if(must && reg ){
		flag = !empty(data) && reg
	}else{
		flag = reg
	}
	
	let style = down ? {bottom:'-20px'} : null
	
	return flag ? <Error msg={msg} className={`${className?className:''} ${down?'abs_lb':''}`} style={style} /> : null
}