module.exports = (ctx) => {
  return {
    plugins: {
      "autoprefixer": {
        browsers: ["last 5 version", "iOS >=8", "Safari >=8"]
      },
      "cssnano": {
        preset: 'default',
        zindex: true,
        calc: false,
        autoprefixer: false
      },
    }
  };
};