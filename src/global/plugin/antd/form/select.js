/* ====================================== Select  ====================================== */
import React from 'react'
import { Select } from 'antd'
const { $fn } = window
// ===================================================================== 
class Index extends React.Component {
	state = {
		data:[],
	}
	
	_onChange = (value, option) => {
		const { name, onChanged, onChange, idStr, data } = this.props
		const v = $fn.isEmpty(value) ? '' : value
		this.setState({ v },()=>{
			let model = name ? { [name]: v } : v
			let rows = null
			
			const arr = data.filter( rows => rows[idStr || 'value'] === v)
			
			if ($fn.hasArray(arr)) { rows = arr[0] }
			
			onChanged && onChanged({ model, value:v, option, rows, name })
			onChange && onChange(v)
		})
	}
	
	setValue = value => this.setState({ value })
	getValue = () => this.state.value
	
	clear = () => this.setState({ value: '', key:this.state.key+1 })
	
	onDropdownVisibleChange = () => {
		setTimeout(()=>{
			Array.prototype.slice.call(document.querySelectorAll('.ant-select-dropdown'),0).forEach(v=>{
				v.addEventListener('mouseup',e => e.stopPropagation() )
			})
		}, 10);
	}
	dropdownRender = (menu) => {
		const { dropdownRender } = this.props
		dropdownRender && dropdownRender(menu)
		if (dropdownRender) {
			return dropdownRender(menu)
		} else {
			return <React.Fragment>{menu}</React.Fragment>
		}
	}
	
	render(){
		const { data, value, idStr, nameStr, p , width, size, style,isP, className, mode, disabled, loading, bordered, auto, noClear } = this.props
		const { key } = this.state
		const _data = data || this.state.data
		const nStr = nameStr || 'name'
		const iStr = idStr || 'value'
		const t = p ? p : ''
		const borderedValue = bordered === false ? false : true
		const _size = size || 'small'
		const _value = this.state.value === undefined ? value : this.state.value
		const isClear = noClear ? false : true
		
		return (
			<Select 
				key 		= { key }
				size		= { _size } 
				onSelect	= { this._onChange } 
				style		= {{ width,...style }} 
				value 		= { _value }
				className 	= {`${className?className:'w'} ${bordered===false ? 'input-bordered':''}`}
				placeholder	= { isP ? '请选择' + t :  t  }
				disabled 	= { !$fn.hasArray(_data) || disabled }
				mode		= { mode }
				loading		= { loading }
				bordered	= { borderedValue }
				onDropdownVisibleChange = {this.onDropdownVisibleChange}
				showSearch
				allowClear  = { isClear }
				dropdownClassName = { _size === 'small' ? 'dropdown-small' : ''}
				dropdownMatchSelectWidth = {auto ? false : true}
				filterOption = { (inputValue, opiton)=>{
					return opiton.children.indexOf(inputValue) !== -1
				}}
				dropdownRender = {menu => this.dropdownRender(menu)}
			>
				{
					$fn.hasArray(_data) && _data.map((v,i)=>{
						return (
							<React.Fragment key={i}> 
								{
									v.group ? (
										<Select.OptGroup key={i} label={v.group}>
											{
												$fn.hasArray(v.children) && v.children.map((p, j) => <Select.Option key={p[iStr]} value={p[iStr]} style={{marginRight:'20px'}}>{p[nStr]}</Select.Option>)
											}
										</Select.OptGroup>
									): <Select.Option key={i} value={v[iStr]} style={{marginRight:'20px'}}>{v[nStr]}</Select.Option>
								}
							</React.Fragment>
						)
					})
				}
			</Select>
		)
	}
}
export default Index