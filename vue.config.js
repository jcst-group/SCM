// 作为配置文件，直接导出配置对象即可
module.exports = {
	// publicPath: "/finance",
	// assetsDir: 'static',
	publicPath:'./',
	productionSourceMap: false,
	configureWebpack: config => {
		config.entry.app = ["babel-polyfill", "./src/main.js"];
	},
	// 开发的时候使用
	devServer: {
		// 设置主机地址
		// 设置默认端口
		port: 8080,
		// 设置代理
		proxy: {
			'/api': {
				// 目标 API 地址
				// target: 'http://finance.scddwb.com/api/',
				// target:'http://47.112.125.164:8099/api/finance',
				// target: 'http://192.168.101.233:8081/api/finance',
				target: 'http://192.168.101.185/api',
				// 如果要代理websockets
				ws: false,
				// 将主机标头的原点更改为目标URL
				changeOrigin: true,
				pathRewrite: {
					'/api': '' //默认所有请求都加了api前缀，需要去掉
				}
			},
		}
	}
}
