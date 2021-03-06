const path = require('path')
const spawn = require('child_process').spawn
const utils = require('./utils')

const tweego = path.resolve(utils.twineFolder, 'tweego')

// Extract extra arguments.
const [, , ...flags] = process.argv

const args = [
  '--output=./gh-pages/index.html',
  './src',
  '--head=./main.ejs',
  ...flags
]

// Run tweego with arguments.
const tweegoProcess = spawn(tweego, args)

// Log messages from the tweego process.
utils.logClear()
tweegoProcess.stderr.on('data', data => {
  const messages = data.toString().split('\n')

  for (const message of messages) {
    if (message.match(/^warning:\s+.*/)) {
      utils.logWarning(message)
      return
    }

    if (message.match(/^error:\s+.*/)) {
      utils.logError(message)
      return
    }

    utils.logAction(message)
  }
})
