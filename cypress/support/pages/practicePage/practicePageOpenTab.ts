class PracicePageOpenTab{
 getTitle(){
    return cy.get('fieldset .switch-tab')
 } 
 getOpenTab(){
    return cy.get('button#opentab');
 }  
 getNewTabTitle(){
    return cy.get('h1.title')
 }
}
export default PracicePageOpenTab