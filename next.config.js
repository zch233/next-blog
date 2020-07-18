module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpg|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]', // 文件名称
            outputPath: 'static', // 硬盘路径
            publicPath: '_next/static', // 网站路径
          }
        },
      ],
    })

    return config
  },
}