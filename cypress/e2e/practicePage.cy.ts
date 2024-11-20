import PracticePage from '@pages/practicePage/practicePage';
import HeaderSection from '@pages/practicePage/practicePageHeader';
import PracticePageDropdown from '@pages/practicePage/practicePageDropdown';
import PracticePageImageUpload from '@pages/practicePage/practicePageImageUpload';
import PracicePageOpenTab from '@pages/practicePage/practicePageOpenTab';
import PracticePageAlerts from '@pages/practicePage/practicePageAlerts';
import PracticePageShowHide from '@pages/practicePage/practicePageShowHide';
import PracticePageMouseHover from '@pages/practicePage/practicePageMousehover';
import FooterSection from '@pages/practicePage/footerSection';
import 'cypress-iframe';
const practicePage = new PracticePage();
const headerSection = new HeaderSection();
const practicePageDropdown = new PracticePageDropdown();
const practicePageImageUpload = new PracticePageImageUpload();
const pracicePageOpenTab = new PracicePageOpenTab();
const practicePageAlerts = new PracticePageAlerts();
const practicePageShowHide = new PracticePageShowHide();
const practicePageMouseHover = new PracticePageMouseHover();
const footerSection = new FooterSection();
describe('Practice Page Tests', () => {
  beforeEach(() => {
    practicePage.visit();
  });

  it('Verify the page title', () => {
    cy.title().should('eq', 'Practice Page');
  });

  it('Verify the header and home button', () => {
    headerSection.getLogoLink().should('exist');
    headerSection.getHomeButton().should('have.text', 'Home');
  });

  it('Verify the page heading', () => {
    headerSection.getPageTitle().should('have.text', 'Practice Page');
  });
  it('Verify the dropdown values in the practice Page', () => {
    practicePageDropdown.getDropDownTitle().should('be.visible');
    practicePageDropdown.getDropdownOptions().should('have.length', 3);
    practicePageDropdown.selectOption('option2');
    practicePageDropdown.getoptions().eq(0).should('have.text', 'Option1');
    practicePageDropdown.getoptions().eq(1).should('have.text', 'Option2');
    practicePageDropdown.getoptions().eq(2).should('have.text', 'Option3');
  });
  it('Verify the upload image function', () => {
    practicePageImageUpload
      .getTitle()
      .should('have.text', 'Upload your image here');
    const uploadImagePath = 'cypress/fixtures/Easygenerateimg.png';
    practicePageImageUpload.selectFile(uploadImagePath);
    practicePageImageUpload
      .getUploadedImage()
      .should('exist')
      .and('have.attr', 'src')
      .should('include', 'blob:');
  });
  it('Verify open tab section', () => {
    pracicePageOpenTab
      .getTitle()
      .should('be.visible')
      .and('have.text', 'Open new tab');
    pracicePageOpenTab.getOpenTab().then(($button) => {
      cy.wrap($button).invoke('removeAttr', 'onclick');
      cy.wrap($button).click();

      // Directly visit the new tab URL
      cy.visit(Cypress.env('newTabUrl'));

      // Verify the new URL title using cy.origin for cross-origin commands
      cy.origin(Cypress.env('newTabUrl'), () => {
        cy.title().should(
          'eq',
          'Create Courses Online | #1 E-learning Software'
        );
      });
    });
  });

  it('Verify alerts section', () => {
    practicePageAlerts.getTitle().should('be.visible');

    //Alert button verification
    cy.task<string>('readAlertText').then((alertText) => {
      // Type the text into the input field
      practicePageAlerts.getName().type(alertText);
      practicePageAlerts.getAletButton().click();
      // Wait for the alert and then assert its content
      cy.on('window:alert', (alertContent) => {
        expect(alertContent).to.equal(
          'Hello Hello from Easygenerator, share this practice page and share your knowledge'
        );
        return true;
      });

      //Confirm button Verification
      cy.task<string>('readAlertText').then((alertConfirmText) => {
        practicePageAlerts.getName().type(alertConfirmText);
        practicePageAlerts.getConfirmButton().click();
        cy.on('window:alert', (alertConfirmContent) => {
          expect(alertConfirmContent).to.equal(
            'Hello Hello from Easygenerator, Are you sure you want to confirm?'
          );
          return false;
        });
      });
    });
  });

  it('Verify the show/hide input', () => {
    practicePageShowHide.getTitle().should('be.visible');
    practicePageShowHide.getInnerText().scrollIntoView().should('be.visible');
    practicePageShowHide.getInnerText().type('Welcome to Easygenerator');
    practicePageShowHide.clickHideButton();
    practicePageShowHide.getdisplayedText().should('not.be.visible');
    practicePageShowHide.clickShowButton();
    practicePageShowHide.getdisplayedText().should('be.visible');
  });

  it('Verification of  hover content', () => {
    practicePageMouseHover.hoverOverContainer();
    practicePageMouseHover.getHoverContent().should('have.class', 'hovered');
    practicePageMouseHover.hoverOutContainer();
    practicePageMouseHover
      .getHoverContent()
      .should('not.have.class', 'hovered');
  });

  // Install cypress iframe to execute this test case 'npm install -D cypress-iframe'
  it('should interact with the iframe', () => {
    cy.intercept('GET', '**/courses-iframe', {
      fixture: 'mock_iframe.html',
    }).as('mockIframe');

    cy.get('iframe#courses-iframe')
      .should('be.visible')
      .scrollIntoView()
      .then(($iframe) => {
        // Change the iframe source to trigger the intercept
        $iframe.attr('src', 'courses-iframe');

        // Wait for the iframe to load the mocked content
        cy.wait('@mockIframe');

        // Access the iframe's body
        cy.get('iframe#courses-iframe')
          .its('0.contentDocument.body')
          .should('not.be.empty')
          .then(cy.wrap)
          .within(() => {
            // Now you can interact with the mocked content inside the iframe
            cy.get('#mock-link').should(
              'have.attr',
              'href',
              'https://easygenerator.com'
            );
          });
      });
  });

  it('Checks social media links in the footer', () => {
    footerSection.getSocialMediaLinks().then(links => {
      cy.wrap(links).eq(0).should('have.attr', 'href', 'https://www.facebook.com/easygenerator/');
      cy.wrap(links).eq(1).should('have.attr', 'href', 'https://twitter.com/easygenerator');
      cy.wrap(links).eq(2).should('have.attr', 'href', 'https://www.youtube.com/user/easygenerator');
    });
  });
});
