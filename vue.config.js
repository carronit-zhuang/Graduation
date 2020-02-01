console.log(process.env.NODE_ENV)
module.exports = {
  devServer: {
    open: true,
    proxy: 'http://localhost:3000'
  }
}
