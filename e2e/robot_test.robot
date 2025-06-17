*** Settings ***
Library    AppiumLibrary

*** Variables ***
${APP_PACKAGE}       se.loyx.loyxbusiness   # Replace with your actual package name
${APP_ACTIVITY}      .MainActivity         # Replace with your main activity

${MOBILE_NUMBER}     1111111111
${MOBILE_OTP}        1111
${EMAIL}             test@yopmail.com
${EMAIL_OTP}         1111

*** Test Cases ***
User Onboarding Flow
    [Documentation]    Verify the full onboarding process of the app.
    Open Application
    Verify Welcome Screen
    Enter Mobile Number And Verify
    Enter Mobile OTP
    Enter Email And Verify
    Enter Email OTP
    Accept Final Screen And Complete Signup
    Close Application

*** Keywords ***
Open Application
    [Documentation]    Launch the application.
    Open Application    http://localhost:4723/wd/hub
    ...    platformName=Android
    ...    deviceName=emulator
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    automationName=UiAutomator2
    Wait Until Page Contains Element    id=welcomeText    timeout=10s
    Log    Application launched successfully.

Verify Welcome Screen
    [Documentation]    Check if the welcome screen is displayed.
    Wait Until Element Is Visible    id=welcomeText    timeout=10s
    Click Element    id=nextButton
    Wait Until Element Is Visible    id=mobileNumber    timeout=10s
    Log    Welcome screen verified.

Enter Mobile Number And Verify
    [Documentation]    Enter mobile number and proceed.
    Input Text    id=mobileNumber    ${MOBILE_NUMBER}
    Click Element    id=phoneNumberNextButton
    Wait Until Element Is Visible    id=mobileNumberOTP    timeout=10s
    Log    Mobile number entered and verified.

Enter Mobile OTP
    [Documentation]    Enter OTP and verify.
    Input Text    id=mobileNumberOTP    ${MOBILE_OTP}
    Wait Until Element Is Visible    id=emailAddress    timeout=10s
    Log    Mobile OTP entered and verified.

Enter Email And Verify
    [Documentation]    Enter email and proceed.
    Input Text    id=emailAddress    ${EMAIL}
    Click Element    id=emailNextButton
    Wait Until Element Is Visible    id=emailOTP    timeout=10s
    Log    Email entered and verified.

Enter Email OTP
    [Documentation]    Enter email OTP and verify.
    Input Text    id=emailOTP    ${EMAIL_OTP}
    Wait Until Element Is Visible    id=welcomeNextButton    timeout=10s
    Log    Email OTP entered and verified.

Accept Final Screen And Complete Signup
    [Documentation]    Accept final screen and complete the signup.
    Click Element    id=welcomeNextButton
    Wait Until Element Is Visible    id=acceptRequestButton    timeout=10s
    Click Element    id=acceptRequestButton
    Log    Signup completed successfully.

Close Application
    [Documentation]    Close the application.
    Close Application