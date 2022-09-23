module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        sourceExts: ["jsx", "js", "tsx", "cjs", "mjs", "ts", "mts", "iife"], //add here
    },
};