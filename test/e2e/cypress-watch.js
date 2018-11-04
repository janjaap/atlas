const cypress = require('cypress')

const SCRIPTS_FOLDER =  process.env.SCRIPTS_FOLDER || 'cypress/integration';

cypress.open({
  config: {
    integrationFolder: SCRIPTS_FOLDER
  },
  env: {
    API_ROOT: process.env.API_ROOT,
    USERNAME_EMPLOYEE: process.env.USERNAME_EMPLOYEE,
    USERNAME_EMPLOYEE_PLUS: process.env.USERNAME_EMPLOYEE_PLUS,
    PASSWORD_EMPLOYEE: process.env.PASSWORD_EMPLOYEE,
    PASSWORD_EMPLOYEE_PLUS: process.env.PASSWORD_EMPLOYEE_PLUS
  }
})

