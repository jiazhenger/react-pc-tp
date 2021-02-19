/* ====================================== toast  ====================================== */
import React from 'react'
import { Modal } from 'antd'
import Button from '@antd/button'
// ===================================================================== 选择字典表数据
class Index extends React.Component {
    state = {
       
    }
	enter = e => {
		const code = e.code
		if(code === 'NumpadEnter'){
			e.preventDefault()
			this.onOk()
		}
	}
	componentDidMount(){
		window.addEventListener('keydown',this.enter)
		this.props.onRef && this.props.onRef(this)
	}
	componentWillUnmount(){
		window.removeEventListener('keydown',this.enter)
	}
    
    onOk = () => {
    	const { onOk, form } = this.props
    	onOk && onOk()
		form && form.submit()
    }
    
    onCancel = () => {
    	const { onCancel} = this.props
    	this.close()
    	onCancel && onCancel()
    }
    
    open = () => this.setState({show:true})
    close = () => this.setState({show:false})
    
    Footer = ({ okText, noText, loading }) => (
    	<footer className='fxmc'>
			<Button loading={loading} onClick={this.onCancel} style={{width:'100px'}} size='middel' ghost type='primary'>{noText||'取消'}</Button>
			<Button loading={loading} onClick={this.onOk} style={{width:'100px', marginLeft:'25px'}} size='middel' type='primary'>{okText || '确认 Enter'}</Button>
    	</footer>
    )
    
    render(){
    	const { title, children, width, noFooter, centered, onClose, bodyStyle, isFullScroll, form } = this.props
    	const visible = this.state.show === undefined ? this.props.show : this.state.show
    	return (
			<Modal
				className 		= {isFullScroll ? 'full-scroll-modal' : ''}
				title			= { title || '提示' }
				width			= { width }
				visible 		= { visible }
				onOk			= { this.onOk }
				onCancel		= { this.onCancel }
				maskClosable 	= { false }
				centered		= { centered===undefined ? true : centered }
				footer			= { noFooter ? null : <this.Footer {...this.props} /> }
				destroyOnClose 	= { true }
				afterClose 		= { ()=>{
					onClose && onClose()
					form && form.reset()
				} }
				bodyStyle 		= { { padding:'15px 20px 20px 20px', ...bodyStyle } }
				forceRender		= { true }
			>
				{children}
			</Modal>
		)
    }
}
export default Index