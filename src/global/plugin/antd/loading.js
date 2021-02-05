/* ====================================== toast  ====================================== */
import React from 'react'
import { Spin } from 'antd'
// ===================================================================== function
// ===================================================================== 
const _ = ({ loading, size, tip })=>  loading ? (
	<div className='abs_full fxmc' style={{background:'rgba(255,255,255,.5)'}}>
		<Spin size={size || 'large'} tip={tip} />
	</div>
) : null
export default _