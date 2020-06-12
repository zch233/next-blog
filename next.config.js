module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.jpg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static', // 硬盘路径
            publicPath: '_next/static', // 网站路径
          }
        },
      ],
    })

    return config
  },
}