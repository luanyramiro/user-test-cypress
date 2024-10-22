import userData from '../fixtures/users/user-data.json'

describe('Orange HRM Tests', () => {

  const selectorList = {
    usernameField: "[name='username']",
    passwordField: "[name= 'password']",
    loginButton: "[type= 'submit']",
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongcredentialAlert: "[role='alert']",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    dataCloseButton: ".--close",
    submitButton: "[type='submit']",
  } 

  it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userSucess.username)
    cy.get(selectorList.passwordField).type(userData.userSucess.password)
    cy.get(selectorList.loginButton).click()
    cy.location('pathname').should('equal' , '/web/index.php/dashboard/index')
    cy.get(selectorList.dashboardGrid)
    cy.get(selectorList.myInfoButton).click()
    cy.get(selectorList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorList.genericField).eq(3).clear().type('EmpIdTest')
    cy.get(selectorList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorList.genericField).eq(5).clear().type('DrivesLicenseNumber')
    cy.get(selectorList.genericField).eq(6).clear().type('2025-03-10')
    cy.get(selectorList.dataCloseButton).click()
    cy.get(selectorList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
  })
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userFail.username)
    cy.get(selectorList.passwordField).type(userData.userFail.password)
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongcredentialAlert)
  })
})