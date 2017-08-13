// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',  
  extends: 'airbnb-base', 
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
  },
};