const path = require('path')

const serverConfig = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 3000,
  open: true,
  noInfo: true,
  inline: true,
  overlay: {
    warnings: true,
    errors: true
  }
}

module.exports = serverConfig