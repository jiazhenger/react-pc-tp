/* ====================================== toast  ====================================== */
import React from 'react'
import { Switch } from 'antd'
// ===================================================================== Select
class Index extends React.Component {
	state = {
		
	}
	onChange = value => {
		const { onChange, onChanged, name, bool } = this.props
		this.setState({ value },()=>{
			let rs = bool ? value : this.state.value
			const model = name ? { [name]: rs } : rs
			onChanged && onChanged({ model, value, name } )
			onChange && onChange(rs)
		})
	}
	setValue = value => this.setState({ value })
	getValue = () => this.state.value
	
	clear = () => this.setValue(false)
	
	render(){
		const  { size, disabled, onClick, loading, bool } = this.props
		let value = this.state.value === undefined ? this.props.value : this.state.value
		let rs = null
		if(bool){
			rs = value
		}else{
			rs =  value === 0 || value === true ? true : false
		}
		return (
			<Switch
				size			= { size || 'large' } 
				onChange		= { onClick ? null : this.onChange }
				onClick			= { onClick }
				checked		 	= { rs }
				disabled		= { disabled }
				loading			= { loading }
			/>
		)
	}
}
export default Index