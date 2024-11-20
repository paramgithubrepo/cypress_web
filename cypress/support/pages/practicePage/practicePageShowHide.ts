class PracticePageShowHide {
  getTitle() {
    return cy.contains('Show/hide the input');
  }
  getHideButton() {
    return cy.get('#hide-textbox');
  }
  getShowButton() {
    return cy.get('#show-textbox');
  }
  getInnerText() {
    return cy.get('input[placeholder="Hide/Show Example"]');
  }
  getdisplayedText() {
    return cy.get('#displayed-text');
  }
  clickHideButton() {
    this.getHideButton().click();
  }
  clickShowButton() {
    this.getShowButton().scrollIntoView().click();
  }
}
export default PracticePageShowHide;
