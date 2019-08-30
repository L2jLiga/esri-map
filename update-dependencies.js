const exec = require('child_process').execSync;

exec('npx rimraf node_modules package-lock.json');
exec('npm cache clean --force');
exec('npm install --no-optional');
exec('npm dedup');
exec('npm cache verify');
exec('npm install --scripts-prepend-node-path=auto');
exec('npm run build-lib');
exec('npm run docs');
exec('git add .');
