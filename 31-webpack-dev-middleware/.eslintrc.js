// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',  
  extends: 'airbnb-base', 
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
    }],
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }],
    'global-require': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 2,
  },
};