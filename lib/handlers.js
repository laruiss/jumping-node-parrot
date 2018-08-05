const moveHandlers = require('./drone')

// Ping handler
const ping = (data, callback) => {
  // Callback a http status code, and no payload object
  callback(200)
}

// drone handlers
const _drone = {
  put (data, callback) {
    const { move, speed } = data.payload
    moveHandlers[move](speed)
    callback(200)
  },
  get (data, callback) {
  },
}

// The main drone handler
const drone = (data, callback) => {
  // Acceptable methods
  const acceptableMethods = ['put', 'get']
  if (!acceptableMethods.includes(data.method)) {
    callback(405)
  }

  // Use the appropriate handler
  _drone[data.method](data, callback)
}

const notFound = (data, callback) => {
  // Callback a http status code, and no payload object
  callback(404)
}

const _html = {
  async get(data, callback) {
    const indexFileContent = await readFileAsync(path.join(__dirname, '..', 'index.html'), 'utf-8')
    callback(200, indexFileContent)
  }
}

// The main drone handler
const html = (data, callback) => {
  // Acceptable methods
  const acceptableMethods = ['get']
  if (!acceptableMethods.includes(data.method)) {
    callback(405)
  }

  // Use the appropriate handler
  _html[data.method](data, callback)
}

module.exports = {
  ping,
  notFound,
  drone,
  'index.html': html,
}