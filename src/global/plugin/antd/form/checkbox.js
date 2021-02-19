/* ====================================== toast  ====================================== */
import React from 'react'
import { Checkbox } from 'antd'
// ===================================================================== Select
class Index extends React.Component {
	state = {
		
	}
	onChange = e => {
		const { onChange, onChanged, name } = this.props
		this.setState({ value: e.target.checked }, ()=>{
			const value = this.state.value ? true : false
			const model = name ? { [name]: value } : value
			onChanged && onChanged({ model, value, name } )
			onChange && onChange(value)
		})
	}
	
	setValue = value => this.setState({ value })
	
	clear = () => this.setValue(false)
	
	render(){
		const  { size, disabled, loading, label, indeter, value, outer, onChange } = this.props
		let _value = null
		if(outer){
			_value = value
		}else{
			_value =  this.state.value === undefined ? value : this.state.value
		}
		return (
			<Checkbox
				size			= { size || 'small' } 
				onChange		= { outer ? onChange : this.onChange }
				checked		 	= { _value }
				indeterminate	= { indeter }
				disabled		= { disabled }
				loading			= { loading }
			>
				{label}
			</Checkbox>
		)
	}
}
export default Index