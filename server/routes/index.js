const api = require('./api')

module.exports = async (app, dbs) => {
    app.use('/api', await api)
}
