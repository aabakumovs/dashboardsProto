module.exports = {
    entry: "./app/components/graph-dev.js",
    output: {
        path: __dirname,
        filename: "app/components/graph.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};