import { message } from 'antd'
const Index = (el,content) => {
	el.select()
	document.execCommand('copy')
	message.success('���Ƴɹ�')
}
export default Index