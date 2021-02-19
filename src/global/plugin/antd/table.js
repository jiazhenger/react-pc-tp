/* ====================================== toast  ====================================== */
import React from 'react'
import { Table } from 'antd'
import { VList } from 'virtuallist-antd'
import { Resizable } from 'react-resizable'
const { $async } = window
const Pagination = $async(()=>import('@antd/pagination'))
// =====================================================================  列宽可拖拽
const ResizeableTitle = ({ onResize, width, ...restProps }) => {
  if (!width) { return <th {...restProps} /> }
  return (
    <Resizable width={width}  height={0} onResize={onResize}>
		<th {...restProps} />
    </Resizable>
  )
}
// ===================================================================== 
const TableComponent = ({ 
	cols, data, type, loading, pag, onChange, onSizeChange, bordered, 
	className, size, expandedRowRender, expandRowByClick, onExpand, suffix, selfPag, onSelect, idStr,
	onSort, selectedKeys, rowSelect, onRow, flex, height, hasBottom, components, isDragWidth,
})=> {
	const [ keys, setKeys ] = React.useState([])
	const wrapRef = React.useRef()
	const p = { current:1, total:0, pageSize:10, ...pag}
	const hasPag = pag && data.length > 0 && p.total > p.pageSize
	const isFlex = flex !== false
	const _hasBottom = hasBottom !== false
	const [ component, setComponent ] = React.useState()
	const _idStr = idStr || 'id'
	React.useEffect(()=>{
		if(Array.isArray(selectedKeys)){
			setKeys(selectedKeys)
		}
		const _component = data.length > 20 && type ? VList({height: wrapRef.current.offsetHeight}) : {}
		
		if(isDragWidth){
			_component.header = {
				cell: ResizeableTitle
			}
		}
		setComponent(_component)
	}, [selectedKeys, data, type, isDragWidth])
	return <div ref={wrapRef} className={ `${isFlex ? 'abs_full wh fv antd-flex-table' : ''} ${ _hasBottom  ? 'antd-flex-table-bottom' : '' }` }>
		<Table 
			className 			= {`antd-table ${isFlex ? 'ex' : ''}  ${ hasPag ? 'pag-table' : '' } ${className ? className : '' }` }
			bordered			= { bordered === false ? bordered : true }	
			rowKey				= { r => r[_idStr] }
			columns				= { cols }
			dataSource			= { data }
			loading 			= { loading } 
			scroll				= {{ y: '100%' }}
			size				= { size ? size : 'small' }
			expandedRowRender 	= { expandedRowRender }
			expandRowByClick	= { expandRowByClick }
			onExpand			= { onExpand }
			components			= { component }
			onChange			= { (pagination, filters, sorter, extra) => {
				if(onSort){
					let type = null
					if(sorter.order === 'ascend'){	// 升序
						type = 1
					}else if(sorter.order === 'descend'){ // 降序
						type = 2
					}
					const param = type ? {sort:sorter.field, sort_type: type} : null
					onSort(param)
				}
			}}
			// 行事件
			onRow = { (record, index)=>{
				return {
					index,
					// 点击行
					onClick: e => {
						if(rowSelect !== false && type ){
							const id = record[_idStr]
							let _keys = []
							
							if( type === 'checked' ){
								if( keys.indexOf(id) === -1 ){
									_keys = [...keys, id ]
								}else{
									_keys = keys.filter(v => v !== id)
								}
							}else{
								_keys = [ id ]
							}
							setKeys(_keys)
							onSelect && onSelect(_keys, record)
						}
						onRow && onRow(record)
					},
				}
			} }
			// 选择框配置
			rowSelection		= { type ? {
				type:type,
				fixed:false,
				selectedRowKeys: keys,
				onChange: (selectedRowKeys, selectedRows) => {
					let selectedKeys = selectedRowKeys
					if(_idStr){
						selectedKeys = selectedRows.map(v => v[_idStr])
					}
					setKeys(selectedKeys)
					
				    onSelect && onSelect(selectedKeys, selectedRows)
				},
				getCheckboxProps: record => ({
					disabled : false
				}),
				// hideSelectAll:true,
				// 全选
				onSelectAll: (selected, selectedRows, changeRows)=>{
					let _keys = []
					if(selected){
						_keys = data.map( v => v.id )
					}
					setKeys(_keys)
				}
			} : null}
			pagination			= { selfPag ? {
				size: size,
				current: p.current,
				total: p.total,
				pageSize: p.pageSize,
				onChange: (current, pageSize) =>{ onChange && onChange(current, pageSize) },
				showQuickJumper: true,
				showSizeChanger: true,
				hideOnSinglePage: p.total <= p.pageSize ? true : false,
				pageSizeOptions: [ 20, 50, 100, 150, 200, 500, 1000],
			} : false }
		/>
		{
			(data.length > 0 && _hasBottom) && <Pagination
				total		= { data.length }
				size		= 'small'
				pag			= { p }
				hasPag		= { hasPag }
				onChange	= { (current, pageSize) =>{ onChange && onChange(current, pageSize) } }
				suffix 	= { suffix }
			/>
		}
	</div>
}

class Index extends React.Component{
	state = {
		columns: this.props.cols
	}
	handleResize = index => (e, { size }) => {
		const nextColumns = this.props.cols
		nextColumns[index] = { ...nextColumns[index], width: size.width }
		this.setState({ columns: nextColumns })
	}
	render(){
		const { columns } = this.state
		let _cols = columns
		if(this.props.isDragWidth){
			_cols = columns.map((col, index) => ({
				...col,
				onHeaderCell: column => ({
					width: column.width,
					onResize: this.handleResize(index), //
					// style: { cursor: 'move' },
				})
			}))
		}
		
		return <TableComponent {...this.props} cols={_cols} />
	}
}

export default Index