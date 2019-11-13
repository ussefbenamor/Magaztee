import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CustomerComponentsPage, { CustomerDeleteDialog } from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerComponentsPage: CustomerComponentsPage;
  let customerUpdatePage: CustomerUpdatePage;
  /* let customerDeleteDialog: CustomerDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Customers', async () => {
    await navBarPage.getEntityPage('customer');
    customerComponentsPage = new CustomerComponentsPage();
    expect(await customerComponentsPage.getTitle().getText()).to.match(/Customers/);
  });

  it('should load create Customer page', async () => {
    await customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle().getAttribute('id')).to.match(/storeApp.customer.home.createOrEditLabel/);
    await customerUpdatePage.cancel();
  });

  /*  it('should create and save Customers', async () => {
        async function createCustomer() {
            await customerComponentsPage.clickOnCreateButton();
            await customerUpdatePage.setFirstNameInput('firstName');
            expect(await customerUpdatePage.getFirstNameInput()).to.match(/firstName/);
            await customerUpdatePage.setLastNameInput('lastName');
            expect(await customerUpdatePage.getLastNameInput()).to.match(/lastName/);
            await customerUpdatePage.genderSelectLastOption();
            await customerUpdatePage.setEmailInput('m8_R;04P\o`nrxycaN:2=c40Py.G`Zz.69mq.{f;Z97){dZm!5i$?B$V3Y8,DE/5&#39;-g|L!-M:5iS9$x@at{1I&amp;p]\p*[}uEI?KK`u8C9/+)WI$r:vUv_.48,}xG!}Ffi}f}],j|!+N6OuyeW=,yw-gI4lY33a6A[w5ST7.RISC!bm5=s7d5q:OhqH[&#39;z6|FkgWA9==E!*xg3iZ-IONA,&amp;&#39;QmJ&#34;AO]oay8;}&#39;+&#34;c?gP5{-&amp;');
            expect(await customerUpdatePage.getEmailInput()).to.match(/m8_R;04P\o`nrxycaN:2=c40Py.G`Zz.69mq.{f;Z97){dZm!5i$?B$V3Y8,DE/5&#39;-g|L!-M:5iS9$x@at{1I&amp;p]\p*[}uEI?KK`u8C9/+)WI$r:vUv_.48,}xG!}Ffi}f}],j|!+N6OuyeW=,yw-gI4lY33a6A[w5ST7.RISC!bm5=s7d5q:OhqH[&#39;z6|FkgWA9==E!*xg3iZ-IONA,&amp;&#39;QmJ&#34;AO]oay8;}&#39;+&#34;c?gP5{-&amp;/);
            await customerUpdatePage.setPhoneInput('phone');
            expect(await customerUpdatePage.getPhoneInput()).to.match(/phone/);
            await customerUpdatePage.setAddressLine1Input('addressLine1');
            expect(await customerUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
            await customerUpdatePage.setAddressLine2Input('addressLine2');
            expect(await customerUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
            await customerUpdatePage.setCityInput('city');
            expect(await customerUpdatePage.getCityInput()).to.match(/city/);
            await customerUpdatePage.setCountryInput('country');
            expect(await customerUpdatePage.getCountryInput()).to.match(/country/);
            await customerUpdatePage.userSelectLastOption();
            await waitUntilDisplayed(customerUpdatePage.getSaveButton());
            await customerUpdatePage.save();
            await waitUntilHidden(customerUpdatePage.getSaveButton());
            expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;
        }

        await createCustomer();
        await customerComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();
        await createCustomer();

        await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    }); */

  /*  it('should delete last Customer', async () => {
        await customerComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
        await customerComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        customerDeleteDialog = new CustomerDeleteDialog();
        expect(await customerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/storeApp.customer.delete.question/);
        await customerDeleteDialog.clickOnConfirmButton();

        await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
