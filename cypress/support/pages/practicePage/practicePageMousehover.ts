class PracticePageMouseHover {
    getHoverContainer() {
      return cy.get('.hover-container');
    }
  
    getHoverContent() {
      return cy.get('.hover-content');
    }
  
    hoverOverContainer() {
      this.getHoverContainer().trigger('mouseover');
    }
  
    hoverOutContainer() {
      this.getHoverContainer().trigger('mouseleave');
    }
  }
  
  export default PracticePageMouseHover;
  