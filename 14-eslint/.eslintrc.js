// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',  
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
   /*  'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }], */
  },
};