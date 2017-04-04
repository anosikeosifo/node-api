module.exports = {
  database: 'ntask_test_db',
  username: 'root',
  password: 'borderless',
  params: {
    dialect: 'mysql',
    logging: false,
    define: {
      underscore: true,
    }
  },
  jwtSecret: 'nNTta@s$K_AP1_Te$t',
  jwtSession: { session: false }
};
