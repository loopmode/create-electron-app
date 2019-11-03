const merge = require('webpack-merge');
module.exports = config => {
    // customize the webpack config object for the renderer process here

    // react adjustments
    config = merge.smart(config, {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: /node_modules/,
                    use: ['react-hot-loader/webpack']
                }
            ]
        }
    });

    config.externals = [];
    return config;
};
