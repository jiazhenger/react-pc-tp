import React from 'react'
import { withRouter } from 'react-router-dom'
// ===================================================================== antd
import { Layout, Menu } from 'antd'
import Router from '#frame/router'
// ===================================================================== global declare
const { $fn, $async } = window
const { SubMenu, Item } = Menu
// ===================================================================== private template
const Content = $async(()=>import('@tp/content'))
// ===================================================================== global template
// const Image = $async(()=>import('@tp/image'))
// ===================================================================== private component
// const Router = $async(()=>import('#frame/router'))
// ===================================================================== component
class Frame extends React.Component{
	state = {
		selectedKeys:[],
		defaultOpenKeys: [],
		key:0
	}
	selectedKeys = this.getKey()
	defaultOpenKeys = this.getOpenKeys()
	data = window.$fn.getRouter(this.props.data)
	componentDidMount(){
		this.selectedKeys = this.getKey()
		this.defaultOpenKeys = this.getOpenKeys()
		// 发布订阅
		window.proxy = {
			refresh: () => {
				let { key } = this.state
				this.setState({ key: key++})
			}
		}
	}
	onSelect = v => {
		this.props.history.push(v.key);
		this.setState({ selectedKeys: this.getKey() })
		this.getOpenKeys()
	}
	onToggle = () => this.setState({collapsed:!this.state.collapsed},()=>{
		$fn.longSave('collapsed', this.state.collapsed)
	})
	// 从路由获取 key 值
	getKey(){
		let hash = window.location.hash
		hash = hash.replace('#','')
		return [ hash ]
	}
	// 当前路由的数据中的 index
	getOpenKeys(){
		let index = 0
		const url = this.getKey()[0]
		let stack = []
		this.props.data.forEach((v,i)=>{
			if(url === v.path){
				index = i
				$fn.setTitle(v.title)
			}else{
				stack.push(i)
			}
			if($fn.hasArray(v.children)){
				v.children.forEach((m,k)=>{
					if(url === m.path){
						index = i
						$fn.setTitle(m.title)
					}
				})
			}
		})
		stack = stack.map(v=>v.toString())
		return [url, index.toString(),...stack]
	}
	render(){
		const { data } = this
		const {selectedKeys, collapsed, key } = this.state
		let keys = $fn.hasArray(selectedKeys) ? selectedKeys : this.selectedKeys
		return (
			<Layout className='wh fx'>
				{/* 导航 */}
				<Layout.Sider className='ex rel' id='menu' width={$fn.menuWidth} collapsible trigger={null} collapsed={collapsed}>
					<Content scrollY>
						<Menu className='h' inlineIndent={12} mode='inline' theme='dark' selectedKeys={keys} defaultOpenKeys={this.defaultOpenKeys} onClick={this.handleClick} onSelect={this.onSelect}>
							{
								$fn.hasArray(data) && data.map((v,i)=>(
									$fn.hasArray(v.children) ? (
										<SubMenu key={i} title={<>{v.icon}<span>{v.title}</span></>}>
											{
												$fn.hasArray(v.children) && v.children.map((p,k)=>{
													return $fn.hasArray(p.children) ? (
														<SubMenu key={i + '-' + k } title={p.title}>
															{
																$fn.hasArray(p.children) ? p.children.map((m,j)=> <Item key={m.path}>{m.title}</Item> ) : null
															}
														</SubMenu>
													): <Item key={p.path}>{p.title}</Item>
												})
											}
										</SubMenu>
									) : <Item key={v.path}>{v.icon}<span>{v.title}</span></Item>
								))
							}
						</Menu>
					</Content>
				</Layout.Sider>
				{/* 内容 */}
				<section className='ex rel'>
					<Router data={data} key={key}/>
				</section>
			</Layout>
		)
	}
}

export default  withRouter(Frame)
