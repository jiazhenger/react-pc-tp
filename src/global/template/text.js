import React from 'react'
// ===================================================================== 添加内部样式
const _ = ({ value, color }) => (
	<>
		{
			window.$fn.isValid(value) ? value : <span className='g9' style={{color}}>--</span>
		}
	</>
)
export default _