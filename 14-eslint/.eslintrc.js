// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',  
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  globals: {
    $: false,
    jQuery: true,
  },
  rules: {
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }],
  },
};