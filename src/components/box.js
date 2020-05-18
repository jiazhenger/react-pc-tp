/* ====================================== toast  ====================================== */
import React from 'react';
// ===================================================================== 
export default ({ className, contentClass, style, contentStyle, children, id, title, Icon })=>(
	<div id={id} className={`bcf r8px g2 ${className || ''} fv`} style={style}>
		{
			title && (
				<header className='bbor1 h50 plr20'>
					<h3 className='b f16 fxm'>
						{
							Icon ? <span className='mr5'><Icon/></span> : null
						}
						<span>{title}</span>
					</h3>
				</header>
			)
		}
		<div className={`rel ex ${contentClass || ''}`} style={{...contentStyle}}>
			{children}
		</div>
	</div>
)
