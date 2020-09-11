const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  devServer: {
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: { "^/.netlify/functions": "" },
      },
    },
  },
  configureWebpack: () => {
    return {
      plugins: [
        new PrerenderSPAPlugin(path.resolve(__dirname, "dist"), ["/"], {}),
      ],
    };
  },
};
