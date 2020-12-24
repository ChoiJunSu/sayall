module.exports = {
  "database": {
    "development": {
      "username": "root",
      "password": "d0fd1216103",
      "database": "main",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  },
  "session": {
    "secret": "secret"
  }
}