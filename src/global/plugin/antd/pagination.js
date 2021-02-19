/* ====================================== toast  ====================================== */
import React from 'react'
import { Pagination } from 'antd'
// ===================================================================== Select
const _ = ({ pag, onChange, style, suffix, size, hasPag, total })=>(
	<div className='fxj tbor1 antd-pag' style={{padding:'8px 0', ...style}}>
		<div className='g6 fxc'>
			<div>共 {pag.total || total} 条数据</div>
			{
				suffix && <div className='ml20'>{suffix} </div>
			}
		</div>
		{
			hasPag && <Pagination
				size				= { size ? size :'small' }
				current				= { pag.current } 
				total				= { pag.total }
				pageSize			= { pag.pageSize }
				onChange			= { (current, pageSize) =>{ onChange && onChange(current, pageSize) } }
				showQuickJumper		= { true }
				showSizeChanger 	= { true }
				hideOnSinglePage	= { pag.total <= pag.pageSize ? true : false }
				pageSizeOptions		= {[ 10, 20, 50, 100, 150, 200, 500, 1000]}
			/>
		}
		
	</div>
)
export default _