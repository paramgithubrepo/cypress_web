import 'cypress-iframe';
class PracticePageIframe{
getIframe(){
    return cy.get('#courses-iframe');
}
getFrameLogo(){
    return cy.iframe().find('#logo-box');
}
getPartnership(){
    return cy.iframe().find('a[class="standard-link"]').contains('Partnerships ');
}
getCareers(){
    return cy.iframe().find('a[class="standard-link"]').contains('Careers ');
}
getLogin(){
    return cy.iframe().find('.button__gr').contains('Login');

}
getBookDemo(){
return cy.iframe().find('span').contains('Book a demo');
}
//This approach of verification will not work in the local server as there will be security issues in cross origin
verifyIframeContent(){
    this.getFrameLogo().should('be.visible');
    this.getPartnership().should('be.visible');
    this.getCareers().should('have.text','Careers');
    this.getLogin().should('be.visible');
    this.getBookDemo().should('be.visible');
}

}
export default PracticePageIframe