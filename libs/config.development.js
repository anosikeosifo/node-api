module.exports = {
  database: 'ntask_db',
  username: 'root',
  password: 'borderless',
  params: {
    dialect: 'mysql',
    define: {
      underscore: true,
    }
  },
  jwtSecret: 'nNTta@s$K_AP1',
  jwtSession: { session: false }
};
