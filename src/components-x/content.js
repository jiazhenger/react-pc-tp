/* ====================================== 滚动条  ====================================== */
import React from 'react'
// =====================================================================
/*
const Fv = ({ className, header, footer, contentClassName, children }) => (
	<Content scrollY={false} className={`fv ${className||''}`}>
	
		{ header && header }
		
		<section className='rel ex'>
			<Content className={ contentClassName ? contentClassName : '' }>
				{ children }
			</Content>
		</section>
		
		{ footer && footer }
	</Content>
)
*/
export default class Content extends React.Component{
//	static Fv = Fv
	render(){
		const { id, className, style, children, onClick, scrollY, scrollX, scrollXY } = this.props
		let scroll = 'oys'
		if(scrollX){ scroll = 'oxs' }
		if(scrollY){ scroll = 'oys' }
		if(scrollXY){ scroll = 'oxys' }
		scroll = scrollY === false ? '' : scroll + ' scrollbar'
		return (
			<div 
				id 			={ id } 
				className	={ `abs_lt wh ${scroll} ${ className || 'bcb' }` }
				style		={ style } 
				onClick		={ onClick }
			>
				{children}
			</div>
		)
	}
}