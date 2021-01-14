import React from 'react'
// ===================================================================== antd
import { Result, Button } from 'antd'
// ===================================================================== global
import Content from '@tp/content'
// ===================================================================== page component
const Index = (
	({ history }) => {
		return (
			<Content>
				<Result
					status='404'
					title='404'
					subTitle='哦呵, 页面未找到'
					extra={<Button onClick={()=>history.goBack()} size='large' type='primary' style={{width:'120px'}}>返回</Button>}
				/>
			</Content>
		)
	}
)

export default Index