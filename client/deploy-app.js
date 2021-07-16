import {series} from 'async';
const {exec} = require('child_process');
const util = require('util');
const execBat = util.promisify(require('child_process').exec);

series([ () => exec('npm build')]); 


async function ls() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
ls();