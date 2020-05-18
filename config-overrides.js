/* ====================================== 自定义 webpack 配置  ====================================== */
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const resolve = dir => require('path').join(__dirname,dir)

process.env.GENERATE_SOURCEMAP = false; // 关闭 css sourceMap 打包

module.exports = override(
	 // 关闭 css sourceMap 打包
	addWebpackAlias({
		['@'] 		: resolve('src'),
	  	['@com'] 	: resolve('src/common'),
	  	['@cpt'] 	: resolve('src/components'),
        ['@tp'] 	: resolve('src/components/template'),
	  	['@cpx'] 	: resolve('src/components-x'),
	  	
	  	['@assets'] : resolve('src/assets'),
	  	['@css'] 	: resolve('src/assets/css'),
	  	['@images'] : resolve('src/assets/images'),
	  	['@js'] 	: resolve('src/assets/js'),
	  	['@pages'] 	: resolve('src/pages'),
	  	
		['@redux'] 	: resolve('src/redux')
	}),
	// 异步引入 antd 配置
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	// 自定义主题
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { '@primary-color': '#EF7158' },
	})
)