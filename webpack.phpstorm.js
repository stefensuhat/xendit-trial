const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.jsx'],
        alias: {
            assets: path.resolve(__dirname, './src/assets'),
            themes: path.resolve(__dirname, './src/themes'),
            components: path.resolve(__dirname, './src/components'),
            stores: path.resolve(__dirname, './src/stores'),
            pages: path.resolve(__dirname, './src/pages'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
};
