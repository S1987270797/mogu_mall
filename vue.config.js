module.exports = {
    configureWebpack: {
        resolve: {
            // extensions: [],  // 这条的作用是不再需要写扩展名 
            alias: {
                // '@': './src', // 这条已经内置
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'store': '@/store'
            }
        }
    }
}