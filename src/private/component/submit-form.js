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
const Upload = $async(()=>import('@antd/upload'))
const Radio = $async(()=>import('@antd/form/radio'))
// =====================================================================
const size = 'middle'
const bordered = false

const FormComponent = ({ data, onChange, width, mb, readOnly, form, disabled, noholder, full, half, isDataBind }) => (
		<>
			{
				$fn.hasArray(data) &&  data.map((v,i)=>{
					const { type, value, label, name, names, format, readOnly, onChange } = v
					
					const _disabled = disabled ? disabled : v.disabled
					// 配置 Item 的宽度
					let itemWidth = 'auto'
					const _width = v.width ? v.width : width
					const _full = v.full ? v.full : full
					const _half = v.half ? v.half : half
					const _itemWidth = v.itemWidth ? v.itemWidth : _width
					
					if(_full){ itemWidth = '100%' }
					else if(_half){ itemWidth = '50%' }
					else if(_itemWidth){ itemWidth = _itemWidth}
					
					// 表单元素改变时监听函数
					const onChanged = option => {
						onChange && onChange(option)
						v.onChange && v.onChange(option)
						if(isDataBind){ 
							v.value = option.value 
						}else{
							// form.setFieldsValue(option.model)
						}
					}
					// 配置显示表单元素
					let children = null
					if(type === 'select'){	// 下拉框
						children = <Select
							name		= { name }
							size		= { size }
							bordered	= { bordered }
							disabled	= { _disabled }
							readOnly	= { readOnly }
							p			= {`请选择` + label}
							onChanged	= { option => onChanged.call(null, option)}
							// private
							data		= { v.data } 
							nameStr		= { v.nameStr } 
							idStr		= { v.idStr }  
							auto 
						/> 
					}else if(type === 'date-range'){	// 日期范围
						children = <DatePicker 
							name		= { names }
							size		= { size }
							bordered	= { bordered }
							disabled	= { _disabled }
							readOnly	= { readOnly }
							onChanged	= { option => onChanged.call(null, option) }
							// private
							range 
							showTime
							format		= { format } 
						/>
					}else if(type === 'date-time'){		// 日期
						children = <DatePicker 
							name		= { names }
							size		= { size } 
							bordered	= { bordered }
							disabled	= { _disabled }
							readOnly	= { readOnly }
							onChanged	= { option => onChanged.call(null, option) }
							// private
							showTime
							format		= { format }
							after		= { v.after }
						/>
					}else if(type === 'checkbox') {		// 复选框
						children = <Checkbox 
							name		= { name }
							disabled	= { _disabled }
							readOnly	= { readOnly }
							onChanged	= { option => onChanged.call(null, option) }
						/> 
					}else if(type === 'radio'){		// 单选框
						children = <Radio
							name		= { name }
							size		= { size }
							disabled	= { _disabled }
							onChanged	= { option => onChanged.call(null, option) }
							// private
							data		= { data } 
							optionType	= { v.optionType }
						/>
					}else if(type === 'upload'){	// 上传
						children = <Upload 
							params		= { v.params }
							onChanged	= { option => onChanged.call(null, option) }
						/>
					}else if(type === 'textarea'){	// 上传
						children = <Input
							name		= { name }
							size		= { size }
							bordered 	= { bordered } 
							disabled	= { _disabled } 
							readOnly	= { readOnly } 
							p			= { `请输入` + label }
							onChanged	= { option => onChanged.call(null, option) }
							// private
							mode		= 'textarea'
						/>
					}else{		// 输入框
						children = <Input
							name		= { name }
							size		= { size }
							bordered 	= { bordered } 
							value		= { value }
							disabled	= { _disabled } 
							readOnly	= { readOnly } 
							p			= { `请输入` + label }
							onChanged	= { option => onChanged.call(null, option) }
						/>
					}
					return (
						<React.Fragment key={i}>
							{ v.title && <h6 className='w xmlr h40 bbor1 mb10'>{v.title}</h6> }
							<Item 
								className 	= { label ? '' : 'no-label'} label={label || ' '} 
								name		= { name } 
								width		= { itemWidth } 
								mb			= { mb } 
								rules		={ [{ required: v.required }] }
							>
								{children}
							</Item>
						</React.Fragment>
					)
				})
			}
		</>
	)

const SubmitForm = ({ 
	children, data, onChange, onSubmit, onClose, init, btnSize, okText, full, half, isModal, 
	layout, hideButton, width, className, contentClassName, mb, readOnly, disabled, noholder,
	isDataBind
}) => {
	const [ form, setForm ] = React.useState()
	const _init = React.useCallback( v => {
		setForm(v)
		init && init(v, data)
	},[init, data])
	
	return (
		<Form layout={layout} onSubmit={onSubmit} init={_init} className={`submit-form small-form fv ex ${className||''}`}>
			<div className='ex rel'>
				<div className={` ${contentClassName||''}`}>
					<div className={layout === 'horizontal' ? 'fxw' : ''}>
						<FormComponent
							form		= { form }
							data		= { data } 
							full		= { full } 
							half		= { half } 
							width		= { width } 
							mb			= { mb } 
							readOnly	= { readOnly } 
							disabled	= { disabled } 
							noholder	= { noholder } 
							onChange	= { onChange }
							isDataBind	= { isDataBind }
						/>
					</div>
				</div>
			</div>
			{ !hideButton && (
				<div className={`fxmc`}>
					<Button label='取消' ghost className='mr15' size={btnSize} width={btnSize === 'large' ? 120 : 90} onClick={onClose} />
					<Button label={okText || '确定 Enter'} htmlType='sbumit' size={btnSize} width={btnSize === 'large' ? 120 : 90} />
				</div>
			)}
		</Form>
	)
}

class Index extends React.Component {
    state = {
      
    }
	enter = e => {
		const code = e.code
		if(code === 'NumpadEnter'){
			e.preventDefault()
			this.form.submit()
		}
	}
	componentDidMount(){
		this.props.onRef && this.props.onRef(this)
		window.addEventListener('keydown',this.enter)
	}
	componentWillUnmount(){
		window.removeEventListener('keydown',this.enter)
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
	// 获取 name 字段的值
	getName = name => this.form.getFieldValue(name)
	
	render(){
		const { 
			children, data, onChange, onClose, onSubmit, btnSize, okText, dir, isModal, full, half, 
			hideButton, width, className, contentClassName, mb, readOnly, disabled, noholder,
			isDataBind
		} = this.props
		return (
			<SubmitForm
				className	= { className }
				data		= { data }
				onChange	= { onChange }
				onSubmit	= { onSubmit }
				onClose		= { onClose }
				init		= { this.init }
				btnSize		= { btnSize || 'middel' }
				okText		= { okText }
				layout		= { dir === 'y' ? 'vertical' : 'horizontal'}
				hideButton	= { hideButton }
				isDataBind	= { isDataBind }
				width		= { width }
				mb			= { mb || 20}
				full 		= { full }
				half 		= { half }
				readOnly	= { readOnly }
				disabled	= { disabled }
				noholder	= { noholder }
				contentClassName = { contentClassName }
				isModal		= { isModal }
			> {children} </SubmitForm>
		)
	}
}

export default Index