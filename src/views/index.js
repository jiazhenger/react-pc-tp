import React from 'react'
import { Link } from 'react-router-dom'
// ===================================================================== private component
const Page = window.$async(()=>import('#tp/content/content-page'))
// ===================================================================== antd

// ===================================================================== image

// ===================================================================== declare

const F = ({ Child }) => {
	return (<div><Child data='123' /></div>)
};

class M extends React.Component{
	render(){
		return (<div><this.props.Child data='贾正双' /></div>)
	}
};
// ===================================================================== component
const Index = (props) => {
	return (
		<Page>
			<Link to='/login'>首页</Link>
			<M Child={props => <div>{ props.data } </div>} />
		</Page>
	)
}

export default Index