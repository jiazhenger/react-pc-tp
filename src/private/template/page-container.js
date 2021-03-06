import React from 'react'
// ===================================================================== global template
const { $async } = window
const Page = $async(()=>import('#tp/content/content-aside'))
const Container = $async(()=>import('#tp/box/container'))
// =====================================================================
const Index = ({ children, title, titleChildren, ButtonGroup, nobc }) => {
	return (
		<Page>
			<Container title={title} ButtonGroup={ButtonGroup} titleChildren={titleChildren} nobc={nobc}>
				{children}
			</Container>
		</Page>
	)
}
export default Index