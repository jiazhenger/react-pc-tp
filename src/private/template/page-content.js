import React from 'react'
// ===================================================================== global template
const {$fn, $async} = window
const Button = $async(()=>import('@antd/button'))
// =====================================================================
const _ = ({ title, footer, children, btns }) => (
	<div className='fv wh bcf xplr'>
		<header className='fxmj ptb15'>
			<h2 className='f14 g6 b'>{title}</h2>
			<nav>
				{
					$fn.hasArray(btns) && btns.map((v,i)=> <Button 
							key			= { i } 
							style		= { {minWidth:60} } 
							disabled	= { v.disabled } 
							loading		= { v.loading } 
							label		= { v.label } 
							onClick		= { v.onClick } 
							className	= 'ml10' 
							ghost
							round
						/>
					)
				}
			</nav>
		</header>
		
		<section className='rel ex fv'>
			{children}
		</section>
		
		{ footer && footer }
	</div>
)
export default _