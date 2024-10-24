import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'


const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorList = {
   
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    genericComboBox: ".oxd-select-text",
    secondItemComboBox: ".oxd-select-dropdown > :nth-child(2)",
    forthItemComboBox: ".oxd-select-dropdown > :nth-child(4)",
    dataCloseButton: ".--close",
    submitButton: "[type='submit']"

  } 

  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userSucess.username, userData.userSucess.password)
    dashboardPage.checkdashboardPage()
    menuPage.accessMyInfo()
    cy.get(selectorList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorList.genericField).eq(3).clear().type('EmpIdTest')
    cy.get(selectorList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorList.genericField).eq(5).clear().type('DrivesLicenseNumber')
    cy.get(selectorList.genericField).eq(6).clear().type('2025-03-10')
    cy.get(selectorList.dataCloseButton).click()
    cy.get(selectorList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get(selectorList.genericComboBox).eq(0).click({ force: true })
    cy.get(selectorList.secondItemComboBox).click()
    cy.get(selectorList.genericComboBox).eq(1).click({ force: true })
    cy.get(selectorList.forthItemComboBox).click()
    menuPage.accessPerformance()

  })
  
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type(userData.userFail.username)
    cy.get(selectorList.passwordField).type(userData.userFail.password)
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongcredentialAlert)
  })
})