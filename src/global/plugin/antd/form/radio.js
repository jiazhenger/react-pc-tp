/* ====================================== toast  ====================================== */
import React from 'react'
import { Radio, Form } from 'antd'
const $fn = window.$fn
// ===================================================================== Radio
const _ = ({ data, nameStr, name, value, onChange, onChanged, onClick, dicId, size, optionType }) => {
	let nStr = nameStr || 'codeName'
	let optType = optionType || 'button'
	const [ xdata, setData ] = React.useState(data||[])
	React.useEffect(()=>{
		if(dicId){
			$fn.getDic(dicId).then(data=>{
				setData(data)
			})
		}
	},[ dicId ])
	
	const _onChange = React.useCallback( value => {
		const model = name ? { [name]: value } : value
		onChanged && onChanged({ model, value })
		onChange && onChange(value)
	},[onChange, onChanged, name])
	
	return (
		<Form.Item name={name}>
			<Radio.Group size={size} value={value} onChange={_onChange} >
				{
					optType === 'button' && xdata.map((v, i) => <Radio.Button key={i} onClick={()=>{onClick&&onClick(i)}} value={v.id} style={{ marginRight: '20px', lineHeight: '30px' }}>{v[nStr]}</Radio.Button>)
				}
				{
					optType !== 'button' && xdata.map((v, i) => <Radio key={i} onClick={()=>{onClick&&onClick(i)}} value={v.id} style={{ marginRight: '20px', lineHeight: '30px' }}>{v[nStr]}</Radio>)
				}
			</Radio.Group>
		</Form.Item>
	)
}
export default _