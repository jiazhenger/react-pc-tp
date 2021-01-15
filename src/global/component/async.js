import React, { Suspense } from 'react'
import { Spin } from 'antd'
/* ====================================== 异步加载组件的加载效果  ====================================== */
const Index = ({ children, size }) => (
	<Suspense fallback={<Spin size={size || 'small'} />} >
		{ children }
	</Suspense>
)
export default Index