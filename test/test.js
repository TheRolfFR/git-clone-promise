const gitClonePromise = require('../index')
const path = require('path')

// with promise
gitClonePromise.clone('https://github.com/TheRolfFR/git-clone-promise.git', path.join(__dirname, './test-clone'), {
  remove: true
}).then(() => {
  console.log('complete!')
}).catch((err) => {
  console.error(err)
})
