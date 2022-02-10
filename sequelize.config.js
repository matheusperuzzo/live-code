module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Matheus061218!',
  database: process.env.NODE_ENV === 'test' ? 'live_code_test' : 'live_code',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
