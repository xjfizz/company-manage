// module.exports = {
//     baseUrl: './',
//     assetsDir: 'static',
//     productionSourceMap: false,
//     // devServer: {
//     //     proxy: {
//     //         '/api':{
//     //             target:'http://192.168.1.179:8888/xujun/',
//     //             changeOrigin:true,
//     //             pathRewrite:{
//     //                 '/api':''
//     //             }
//     //         }
//     //     }
//     // }
//     devServer: { 
//         // open: process.platform === 'darwin', 
//         // host: 'localhost', 
//         port: 8000, // 
//         open: true, //配置自动启动浏览器
//         proxy: { 
//             '/api': {
//                 // target: 'http://192.168.1.153:8080/', //开发环境
//                  target: 'http://192.168.1.179:8888/xujun/', //正式环境
//                 changeOrigin: false,
//                  ws: false,
//                 pathRewrite: {
//                     '/api': ''
//                   }
//                },
//             '/map': {
//                 target: 'http://restapi.amap.com/', //正式环境
//                 changeOrigin: false,
//                 ws: false,
//                 pathRewrite: {
//                     '/map': ''
//                 }
//             }
//         }
//           },
// }


module.exports = {
    runtimeCompiler: true,
     publicPath: '/', // 设置打包文件相对路径 
     devServer: { 
         // open: process.platform === 'darwin', 
         // host: 'localhost', 
         port: 8000, // 
         open: true, //配置自动启动浏览器
         proxy: { 
             '/api': {
                 // target: 'http://192.168.1.153:8080/', //线上环境
                // target: 'http://192.168.1.179:8888/xujun/', //开发环境
                 target: 'http://192.168.1.104:8080/', //齐群
                 changeOrigin: false,
                  ws: false,
                 pathRewrite: {
                     '/api': ''
                   }
                },
             '/map': {
                 target: 'http://restapi.amap.com/', //正式环境
                 changeOrigin: false,
                 ws: false,
                 pathRewrite: {
                     '/map': ''
                 }
             }
         }
           },
        }