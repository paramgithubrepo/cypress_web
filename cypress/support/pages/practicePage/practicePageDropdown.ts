class PracticePageDropdown{
    getDropDownTitle(){
        return cy.contains('legend','Dropdown');
    }
    getDropdownOptions(){
        return cy.get('#dropdown-class-example option');
    } 
    getDropdown(){
        return cy.get('#dropdown-class-example');
    }
    selectOption(option){
        this.getDropdown().select(option);
    }
    getoptions(){
        return this.getDropdown().find('option');
    }

}
export default PracticePageDropdown