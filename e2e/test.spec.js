describe('User Onboarding Flow', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    it('should navigate from welcome screen to dashboard', async () => {
      // ✅ Verify Welcome Screen
      await expect(element(by.id('welcomeText'))).toBeVisible();
      await element(by.id('nextButton')).tap();
  
      // ✅ Mobile Number Verification Screen
      await expect(element(by.id('mobileNumber'))).toBeVisible();
      await element(by.id('mobileNumber')).typeText('111111111');
      await element(by.id('phoneNumberNextButton')).tap();
  
      // ✅ OTP Verification for Mobile
      await expect(element(by.id('mobileNumberOTP'))).toBeVisible();
      await element(by.id('mobileNumberOTP')).typeText('1111');
  
      // ✅ Email Verification Screen
      await expect(element(by.id('emailAddress'))).toBeVisible();
      await element(by.id('emailAddress')).typeText('test@yopmail.com');
      await element(by.id('emailNextButton')).tap();
  
      // ✅ OTP Verification for Email
      await expect(element(by.id('emailOTP'))).toBeVisible();
      await element(by.id('emailOTP')).typeText('1111');
  
      // ✅ Welcome Screen After Verification
      await expect(element(by.id('welcomeNextButton'))).toBeVisible();
      await element(by.id('welcomeNextButton')).tap();
  
      // ✅ Accept Request Popup
      await expect(element(by.id('acceptRequestButton'))).toBeVisible();
      await element(by.id('acceptRequestButton')).tap();
  
      // ✅ Verify that the dashboard is open (optional)
      await expect(element(by.id('dashboardScreen'))).toBeVisible();
    });
  });