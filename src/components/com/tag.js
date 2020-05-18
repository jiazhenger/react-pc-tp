/* ====================================== toast  ====================================== */
import React from 'react'
// ===================================================================== antd
import { CloseOutlined } from '@ant-design/icons'

const { $fn } = window
// ===================================================================== compnent

const Add = ({ onClick, className }) => <Tag t={<i className='g9'>+</i>} className={`cp tap-tag ${className||''}`} noClose style={{background:'#fff',transition:'none'}} onClick={onClick}/>
export default class Tag extends React.Component{
	static Add = Add
	render(){
		const { t, className, style, onClick, noClose } = this.props
		return (
			<div
				onClick 	= 	{ onClick }
				className	= 	{`r4px dk nowrap hover g9 tc nosel ${className||''} ${onClick?'cp':''}`} 
				style		= 	{{ 
									background:'#f5f5f5',
									border:'1px solid #cdcdcd', 
									padding:'0 8px',
									minWidth:'56px',
									...style
								}}
			>
				<span className='g3'>{$fn.val(t)}</span>
				{
					onClick && !noClose && <CloseOutlined className='f12 ml5 cp hover' />
				}
			</div>
		)
	}
}
