const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
    ...addBabelPlugins(
        [
            'module-resolver',
            {
                root: ['src', 'pages', 'utils', 'assets', 'stores', 'themes', 'components'],
                alias: {
                    assets: './src/assets',
                    components: './src/components',
                    themes: './src/themes',
                    stores: './src/stores',
                    utils: './src/utils',
                    pages: './src/pages',
                },
            },
        ],
    ),
);
