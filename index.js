const clone = require('git-clone')
const fs = require('fs')
const fsPromises = require('fs/promises')

// clone options object
/**
 * @typedef CloneOptions
 * @type {object}
 * @property {?string} git Git binary path, defaults to 'git'
 * @property {?boolean} shallow Create a shallow clone with one commit, defaults to False
 * @property {?string} checkout Commit or branch to checkout, defaults to remote default branch
 * @property {?boolean} remove Force removal of folder if existing
 */

/**
 * Promise upgrade version of `git-clone` module
 * @param {string} repo Repository URL
 * @param {string} targetPath Destination clone folder path
 * @param {CloneOptions} [opts = undefined] Clone options
 * @returns {Promise<Any>} Clone promise
 */
function _clone (repo, targetPath, opts = undefined) {
  return new Promise((resolve, reject) => {
    // check folder existence
    fsPromises.readdir(targetPath).then((entries) => {
      // the folder exists
      if (opts && typeof (opts) === 'object' && 'remove' in opts && opts.remove) {
        try {
          fs.rmdirSync(targetPath, {
            recursive: true
          })
        } catch (error) {
          reject(error)
          return
        }
      } else {
        // you did not ask to remove
        if (entries.length) {
          reject(new Error(`Target folder '${targetPath}' already exists and is not empty`))
          return
        }
      }

      clone(repo, targetPath, opts, function (err) {
        if (err) {
          reject(err)
          return
        }

        resolve(err)
      })
    }).catch(() => {
      clone(repo, targetPath, opts, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(err)
        }
      })
    })
  })
}

module.exports = {
  clone: _clone,

  /**
   * `git-clone` original callback function
   * @param {string} repo Repository URL
   * @param {string} targetPath Destination clone folder path
   * @param {CloneOptions} [opts = undefined] Clone options
   * @param {Function} cb Function callback
   * @returns undefined
   */
  cloneCallback: function (repo, targetPath, opts, cb) {
    // asjust parameters
    if (typeof opts === 'function') {
      cb = opts
      opts = null
    }

    _clone(repo, targetPath, opts).then((res) => {
      cb && cb(res)
    }).catch((err) => {
      cb && cb(err)
    })
  }
}
