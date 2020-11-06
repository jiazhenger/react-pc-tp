/* ====================================== 模块子路由配置  ====================================== */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// ===================================================================== 异步加载
import Import from '@com/bundle'

const { $fn } = window
// ===================================================================== 同步路由
export default ({ data }) => {
	const { path, root, to, component } = data[0]
	const _to = to ? to : path
	return (
		<Switch>
			{
				data.map((v,i)=> {
					const { children } = v
					if($fn.hasArray(children)){
						return children.map((m,k)=>{
							let _component = null
							if(m.component){ _component = m.component }
							else if( component ){ _component = component }
							else{ _component =  m.path ? m.path.replace('/','') : null }
							let _path = m.url ? m.url : m.path
							// 加必选参数
							if(m.id){ _path += '/:id' }
							if(m.pid){ _path += '/:pid'}
							if(_component){
								const { child } = m
								if($fn.hasArray(child)){
									return <Route key={m + '-' + k} path={_path} render={ ({ match }) => {
										return <Switch>
												<Route path={match.url} component={ Import(_component) } exact />
												{
													$fn.hasArray(child) && child.map((n,j)=>{
														return <Route key={m + '-' + k + '-' + j} path={`${match.url}/${n.path}`} 	component={ Import( n.component ) } exact />
													})
												}
												<Route component={ Import('404') } />
											</Switch>
									}}/>
								}else{
									return <Route key={m + '-' + k} path={_path} component={ Import(_component) } exact/>
								}
							}else{
								return <Route component={ Import('404') } />
							}
						})
					}else{
						const { path } = v
						if(path){
							var file = v.component ? v.component : path.replace('/','')
							return <Route key={i} path={path} component={ Import( file ) } />
						}else{
							return <Route component={ Import('404') } />
						}
					}
				})
			}
			
			{/* 重定向 */}
			{
				root && <Route path={root} children={<Redirect to={_to} />}  />
			}
			{/* 404 */}
			<Route component={ Import('404') } />
		</Switch>
	)
}