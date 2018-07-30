const moveHandlers = require('./drone')

// Ping handler
const ping = (data, callback) => {
  // Callback a http status code, and no payload object
  callback(200)
}

// drone handlers
// Required data: firstName, lastName, phone, password, tosAgreement
const _drone = {
  put (data, callback) {
    const {move, speed} = data.payload
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

module.exports = {
  ping,
  notFound,
  drone,
}