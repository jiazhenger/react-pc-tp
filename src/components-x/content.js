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
		const { id, className, style, children, onClick, x, y, xy } = this.props
		let scroll = 'oys'
		if(x){ scroll = 'oxs' }
		if(y){ scroll = 'oys' }
		if(xy){ scroll = 'oxys' }
		scroll = y === false ? '' : scroll + ' scrollbar'
		return (
			<div 
				id 			={ id } 
				className	={ `abs_lt wh ${scroll} ${ window.$fn.css(className,'bcb') }` }
				style		={ style } 
				onClick		={ onClick }
			>
				{children}
			</div>
		)
	}
}