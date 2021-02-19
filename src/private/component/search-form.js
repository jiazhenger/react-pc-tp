import React from 'react'
// ===================================================================== global declare
const { $fn, $async } = window
// ===================================================================== global antd
const Form = $async(()=>import('@antd/form/form'))
const Item = $async(()=>import('@antd/form/item'))
const Button = $async(()=>import('@antd/button'))
const Input = $async(()=>import('@antd/form/input'))
const Select = $async(()=>import('@antd/form/select'))
const DatePicker = $async(()=>import('@antd/form/datePicker'))
const Checkbox = $async(()=>import('@antd/form/checkbox'))
// =====================================================================
const bordered = false
const size = 'middle'

const SearchForm = ({ children, data, onChange, loading, onSubmit, onAdd, onReset, onRefesh, className, init, submitText, suffix, onRefesh, onReset  }) => {
	const [ form, setForm ] = React.useState()
	
	// 初始化执行
	const _init = React.useCallback( v => {
		setForm(v)
		init && init(v, data)
	},[init, data])
	
	const onChanged = React.useCallback( (option, v) => {
		onChange && onChange(option)
		v.onChange && v.onChange(option)
		if(isDataBind){ 
			v.value = option.value 
		}else{
			// form.setFieldsValue(option.model)
		}
	}, [])
	
	return (
		<div className={`xplr ${className||'pt10 pb10'}`}>
			<Form layout='horizontal' onSubmit={onSubmit} init={_init} className='fxw search-form small-form'>
				<div className='ex fxw'>
					{
						$fn.hasArray(data) &&  data.map((v,i)=>{
							const { type, value, label, data, name, names, format, readOnly } = v
							const width = v.width || 150
							const mr = 20
							let children = null
							if( type === 'select'){ // 下拉框
								children = <Select
									name		= { name }
									size		= { size }
									width		= { width }
									bordered	= { bordered }
									value		= { value }
									disabled	= { loading }
									readOnly	= { readOnly }
									p			= {`请选择` + label}
									onChanged	= { option => onChanged.bind(null, option, v) }
									// private
									data		={data} 
									nameStr		={v.nameStr} 
									idStr		={v.idStr}  
									auto
								/> 
							}else if(type === 'date-range'){ // 日期范围
								children = <DatePicker 
									name		= { names }
									size		= { size }
									width		= { width * 2 + 30 }
									bordered	= { bordered }
									value		= { value }
									disabled	= { loading }
									readOnly	= { readOnly }
									onChanged	= { option => onChanged.bind(null, option, v) }
									// private
									range 
									showTime
									format		= { format } 
								/>
							}else if(type === 'date-time'){ // 日期
								children = <DatePicker 
									name		= { names }
									size		= { size } 
									width		= { width }
									bordered	= { bordered }
									value		= { value }
									disabled	= { _disabled }
									readOnly	= { readOnly }
									onChanged	= { option => onChanged.call(null, option) }
									// private
									showTime
									format		= { format }
									after		= { v.after }
								/>
							}else if(type === 'checkbox') {	// 复选框
								children = <Checkbox 
									name		= { name }
									size		= { size }
									value		= { value }
									disabled	= { loading }
									readOnly	= { readOnly }
									onChanged	= { option => onChanged.bind(null, option, v) }
								/> 
							}else{	// 输入框
								children = <Input
									name		= { name }
									size		= { size }
									width		= { width } 
									bordered 	= { bordered } 
									value		= { value }
									disabled	= { loading } 
									readOnly	= { readOnly } 
									p			= { `请输入` + label }
									onChanged	= { option => onChanged.bind(null, option, v) }
									// private
									onPressEnter= { onSubmit } 
								/>
							}
							return (
								<Item key={i} name={name} label={label} mr={mr}>
									{children}
								</Item>
							)
						})
					}
				</div>
				<div>
					<Button loading={loading} htmlType='submit' label={submitText ? submitText : '搜索 F4'}/>
					{onReset && <Button loading={loading} label='重置 F6' className='ml10' ghost onClick={onReset}/> }
					{onRefesh && <Button loading={loading} label='刷新 F9' className='ml10' ghost onClick={onRefesh}/>}
					{ suffix }
				</div>
			</Form>
		</div>
	)
}

class Index extends React.Component{
	
	onkeydown = e => {
		const code = e.code
		if(code === 'F9'){
			_onRefesh()
			e.preventDefault()
		}else if(code === 'F6'){
			_onReset()
			e.preventDefault()
		}else if( code === 'F4'){
			onSubmit && onSubmit()
			e.preventDefault()
		}else if( code === 'F2'){
			onAdd && onAdd()
			e.preventDefault()
		}
	}
	
	componentDidMount(){
		this.props.onRef && this.props.onRef(this)
		window.addEventListener('keydown', this.onkeydown)
	}
	
	componentWillUnmount(){
		window.onkeydown = null
		window.removeEventListener('keydown', this.onkeydown)
	}
	
	// 初始化并设置默认值
	init = form => {
		const { data, onForm, hasDefault } = this.props
		this.form = form
		// 如果有默认值，才设置默认值
		if(hasDefault){ this.setDataValue(data) }
		onForm && onForm(form)
	}
	// 将表单元素列表数据上的值绑定到表单
	setDataValue = data => {
		data.forEach(m=>{
			if($fn.isValid(m.value)){
				this.form.setFieldsValue({ [m.name] : m.value })
			}
		})
	}
	// 设置默认值
	setValue = value => {
		if($fn.hasObject(value)){
			this.form.setFieldsValue(value)
		}else{
			this.setDataValue(value)
		}
	}
	// 提交表单
	submit = () => this.form.submit()
	// 重置表单
	reset = names => this.form.resetFields(names)
	
	render(){
		const { children, data, onChange, loading, onSubmit, onAdd, onReset, className, submitText, suffix } = this.props
		return (
			<SearchForm
				data		= { data} 
				onChange	= { onChange } 
				onSubmit	= { onSubmit } 
				onAdd		= { onAdd } 
				onReset		= { onReset }
				loading		= { loading }
				className	= { className }
				init		= { this.init }
				submitText  = { submitText}
				suffix		= { suffix }
				onRefesh	= { () => $fn.refreshRouter() }
				onReset		= { this.reset }
			>
				{children}
			</SearchForm>
		)
	}
}
export default Index