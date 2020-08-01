import React from 'react'
// ===================================================================== global template
const Content = window.$async(()=>import('@tp/content'))
// =====================================================================
export default ({ header, footer, children }) => (
	<Content className='fv'}>
	
		{ header && header }
		
		<section className='rel ex'>
			<Content scrollY>
				{ children }
			</Content>
		</section>
		
		{ footer && footer }
	</Content>
)