/* ====================================== toast  ====================================== */
import React from 'react'
import { Input } from 'antd'
// ===================================================================== Select
class Index extends React.Component {
	state = { }

	onChange = e => {
		const { onChanged, onChange, name } = this.props
		this.setState({ value: e.target.value},()=>{
			const { value } = this.state
			const _value = value.trim()
			onChanged && onChanged({
				model: name ? { [name]: _value } : _value, 
				value: _value
			})
			onChange && onChange(_value)
		})
	}
	
	onSearch = v => {
		const { onChange, name } = this.props
		onChange && onChange( name ? {[name]:this.state.value} : this.state.value, this.state.value)
	}
	
	setValue = value => this.setState({ value })
	getValue = () => this.state.value
	
	clear = () => this.setValue('')
	
	getRef = () => this.inputRef.input
	
	render(){
		const  { p, type, width, size, clear, style, isCenter, readOnly, className, mode, disabled, prefix, suffix, iconRender, bordered, value, rows, onPressEnter, maxLength } = this.props
		let _value = this.state.value === undefined ? value : this.state.value
		let centerStyle = isCenter ? {textAlign:'center'} : null
		const _bordered = bordered === false ? false : true
		let MyInput = mode === 'password' ? Input.Password : Input
		const props = mode === 'password' ? { iconRender : iconRender } : {}
		let borderClass = bordered===false ? 'input-bordered':''
		if(mode === 'textarea'){
			MyInput = Input.TextArea
			borderClass = bordered===false ? 'textarea-bordered':''
		}
		_value = typeof(_value) === 'string' ? _value.trim() : _value
		return (
			<MyInput
				ref 			= { ref => this.inputRef = ref }
				className		= { `${className?className:''} ${borderClass||''}` }
				allowClear 		= { clear === false ? false : true } 
				type			= { type } 
				size			= { size || 'small' } 
				onChange		= { this.onChange }
				value		 	= { _value }
				style			= {{width,...centerStyle,...style}}
				placeholder		= { p } 
				readOnly		= { readOnly }
				disabled		= { disabled }
				prefix			= { prefix }
				suffix			= { suffix }
				bordered		= { _bordered }
				rows			= { rows || 4 }
				onPressEnter    = { onPressEnter }
				maxLength       = { maxLength || ''}
				{...props}
			/>
		)
	}
}
export default Index