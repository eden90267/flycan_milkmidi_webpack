// npm i -g rimraf
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// https://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package
function requireGlobal(packageName) {
  const globalNodeModules = childProcess.execSync('npm root -g').toString().trim();
  const packageDir = path.join(globalNodeModules, packageName);
  if (!fs.existsSync(packageDir)) {
    packageDir = path.join(globalNodeModules, 'npm/node_modules', packageName); //find package required by old npm
  }
  if (!fs.existsSync(packageDir)) {
    throw new Error('Cannot find global module \'' + packageName + '\'');
  }
  const packageMeta = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json')).toString());
  const main = path.join(packageDir, packageMeta.main);
  return require(main);
}

const rimraf = requireGlobal('rimraf');
const rimrafPromise = (file) => new Promise((resolve, reject) => rimraf(file, err => err ? reject(err) : resolve(file)));
const isDirectory = (file) => fs.statSync(file).isDirectory() && file !== '.git';
const doRemove = (arr, file) => {
  arr.push(
    rimrafPromise(`${file}/dist`),
    rimrafPromise(`${file}/package-lock.json`),
    rimrafPromise(`${file}/node_modules`)
  );
  return arr;
};
// entry point
Promise.resolve()
  .then(() => fs.readdirSync(__dirname))
  .then(files => files.filter(isDirectory))
  .then(files => Promise.all(files.reduce(doRemove, [])))
  .then(() => console.log('complete'))
  .then(() => setTimeout(process.exit,1000))
  .catch(err => console.error(err));