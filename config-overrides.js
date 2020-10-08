const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
    ...addBabelPlugins(
        [
            'module-resolver',
            {
                root: ['src', 'pages', 'utils', 'assets', 'themes', 'components'],
                alias: {
                    assets: './src/assets',
                    components: './src/components',
                    themes: './src/themes',
                    utils: './src/utils',
                    pages: './src/pages',
                },
            },
        ],
    ),
);
