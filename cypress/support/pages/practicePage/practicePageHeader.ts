class PracticePageHeader {
  getLogoLink() {
    return cy.get('header a[href="https://easygenerator.com/"]');
  }
  getHomeButton(){
    return cy.get('header button');
  }
  getPageTitle(){
    return cy.get('h1');
  }
}
export default PracticePageHeader;
