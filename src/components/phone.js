/* ====================================== 滚动条  ====================================== */
import React from 'react'
// ===================================================================== 
export default ({phone, src, text})=>{
	
	const phoneNumber = phone || '400-0160-660'
	
	return  <a className='tu' href={`tel:${phoneNumber}`}>{phoneNumber}</a>
}