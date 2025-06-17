
# Loyx

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till the "Creating a new application" step before proceeding.

---

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x.x or higher)
- [Yarn](https://yarnpkg.com/) (optional but recommended)
- [Watchman](https://facebook.github.io/watchman/)
- Android Studio for Android development
- Xcode for iOS development

---

## Project Setup

---

### 1. How to Clone the Project

Follow these steps to clone the repository:

1. Open your terminal.
2. Navigate to the directory where you want the project.
3. Run the following command:
   ```bash
   git clone <repository-url>
   ```
4. Navigate into the project directory:
   ```bash
   cd <project-name>
   ```

---

### 2. Installing Node Modules and Pod Files

#### For Node Modules
1. Make sure you have Node.js and npm installed. You can download them from [Node.js](https://nodejs.org).
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

#### For Pod Files (iOS only)
1. Navigate to the `ios` folder:
   ```bash
   cd ios
   ```
2. Install CocoaPods dependencies:
   ```bash
   pod install
   ```
3. Go back to the root directory:
   ```bash
   cd ..
   ```

---

### 3. Opening the Project in Xcode and Android Studio

#### Opening in Xcode (iOS)
1. Navigate to the `ios` directory:
   ```bash
   cd ios
   ```
2. Open the `.xcworkspace` file:
   ```bash
   open <ProjectName>.xcworkspace
   ```
3. Ensure the necessary provisioning profiles and signing certificates are configured.

#### Opening in Android Studio
1. Open Android Studio.
2. Select **Open an Existing Project**.
3. Navigate to the `android` folder of the project and open it.

---

### 4. Creating TestFlight and Release AAB Files

#### Creating a TestFlight Build (iOS)
1. Open the project in Xcode.
2. Select the **Product > Archive** menu.
3. Once the build is archived, click **Distribute App** and follow the instructions to upload to App Store Connect.

#### Creating a Release AAB File (Android)
1. Navigate to the `android` directory:
   ```bash
   cd android
   ```
2. Run the following command to create the release build:
   ```bash
   ./gradlew bundleRelease
   ```
3. The release `.aab` file will be located in `android/app/build/outputs/bundle/release/`.

---

### 5. Uploading to the App Store and Play Store

#### App Store (iOS)
1. Log in to [App Store Connect](https://appstoreconnect.apple.com).
2. Select your app and upload the `.ipa` file using the **Transporter App** or Xcode.
3. Complete the app submission steps, including app metadata and screenshots.

#### Play Store (Android)
1. Log in to the [Google Play Console](https://play.google.com/console/).
2. Select your app and upload the `.aab` file under the **Release Management** section.
3. Complete the app submission steps, including app metadata and screenshots.

---

### 6. Folder Structure

Below is an overview of the folder structure used in this project:

```plaintext
src/
├── features/
│   ├── auth/
│   │   ├── components/             # Component for authentication's screens
│   │   │        
│   │   ├── screens/                # Screens of authentication's flow
│   │   │        
│   │   ├── services/               # API and business logic for authentication
│   │   │      
│   │   ├── hooks/                  # Custom hooks for authentication logic
│   │   │         
│   │   └── types/                  # Type definitions for authentication
│   │                            
│   ├── dashboard /
│   │   ├── components/             # Component for dashboard's screens
│   │   │        
│   │   ├── screens/                # Screens of dashboard's flow
│   │   │        
│   │   ├── services/               # API and business logic for dashboard
│   │   │      
│   │   ├── hooks/                  # Custom hooks for dashboard logic
│   │   │         
│   │   └── types/                  # Type definitions for dashboard
│   │                            
├── navigation/
│   └── AppNavigator.tsx            # Main app navigation configuration
│     
├── shared/
│   ├── components/                 # Reusable common component 
│   │
│   ├── hooks/                      # Reusable common for API and business logic
│   │
│   ├── i18n/                       # Multi language configuration
│   │
│   ├── store/                      # Redux store and reducer configuration
│   │   
│   ├── types/                      # Reusable common type definitions
│   │  
│   └── utils/                      # Reusable common utils configuration functions (change bankid_api_env = prod or test for bank id config)
│    
├── App.tsx                          # Root component of the app
└── index.tsx                        # Entry point of the app
```

This structure organizes the project into modular and reusable components, screens, services, and utilities. It helps maintain separation of concerns and scalability.


### Notes
- Ensure you have the appropriate certificates and keys for signing the builds.
- Refer to the official documentation for further details:
  - [React Native](https://reactnative.dev/docs/getting-started)
  - [Xcode](https://developer.apple.com/xcode/)
  - [Android Studio](https://developer.android.com/studio)
