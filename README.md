# git-clone-promise

Promise version of [jaz303](https://github.com/jaz303)'s [git-clone](https://www.npmjs.com/package/git-clone) npm module. Clones a git repository via shell command and with promises!

## Installation

Install:

	$ npm install git-clone-promise

Require:

	const { clone, cloneCallback } = require('git-clone-promise');

## API

#### `clone(repo, targetPath, [options=undefined])`

Clones `repo` to `targetPath`, returning promise

Supported `options`:

  * `git`: path to `git` binary; default: `git` (optional).
  * `shallow`: when `true`, clone with depth 1 (optional).
  * `checkout`: revision/branch/tag to check out (optional).
  * `remove`: removes targetPath if already existing (optional).

## Example

Fullfills if done with no return value
Rejects if folder already exists and not empty and no `remove` option or else failed to remove folder:

```js
const { clone } = require('git-clone-promise');
clone('https://github.com/TheRolfFR/git-clone-promise.git', './test-clone', {
  remove: true
}).then(() => {
  console.log('complete!')
}).catch((err) => {
  console.error(err)
})
```

## Legacy example

I left callback version with my remove option addition:

```js
const { cloneCallback } = require('git-clone-promise');
cloneCallback('https://github.com/TheRolfFR/git-clone-promise.git', './test-clone', {
  remove: true
}, function (err) {
  if(err)
    console.error(err)
  console.log('finished!')
})
```

## Copyright &amp; License

&copy; 2021 Le Vaguerès Yann 

Twitter : [@TheRolfFR](https://bit.ly/therolf-twitter)<br>
Website : [therolf.fr](https://therolf.fr)<br>
GitHub : [@TheRolfFR](https://bit.ly/therolf-github)

Released under the ISC license.