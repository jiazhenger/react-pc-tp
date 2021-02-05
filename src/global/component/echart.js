/* ====================================== 滚动条  ====================================== */
import React from 'react'
import * as echarts from 'echarts'
// =====================================================================
const _ = ({ id, option }) => {
	const ref = React.createRef()
	
	React.useEffect(()=>{
		let myEecharts
		if(option){
			const { current } = ref;
			if(current){
				myEecharts = echarts.init(current);
				myEecharts.setOption(option || {});
			}
		}
		myEecharts.resize();
		if (window) {
            const onresize = window.onresize;
            window.onresize = () => {
                if (onresize) onresize();
               	setTimeout(()=>{
               		myEecharts.resize();
               	})
            }
        }
		
	},[option,ref])
	
	return <div ref={ref} className='abs_lt wh'></div>
}
export default