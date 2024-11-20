class PracticePageAlerts{
getTitle(){
    return cy.contains('Invoke an alert/confirmation modal')
}
getName(){
    return cy.get('#name')
}
getAletButton(){
    return cy.get('#alertbtn')
}
getConfirmButton(){
    return cy.get('#confirmbtn')
}

}
export default PracticePageAlerts