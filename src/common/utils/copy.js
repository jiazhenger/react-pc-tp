import { message } from 'antd'
const Index = (el,content) => {
	el.select()
	document.execCommand('copy')
	message.success('¸´ÖÆ³É¹¦')
}
export default Index