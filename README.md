# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

# This is a section for clarify the functionality of this app
- This is To-do list app using react native cli.
- You can check the main code in App.tsx. It contains the element rendering, event listener functional for submit/delete button and input field.
- You can check the persist data functional in src/service/storeService.ts. It contains storing and getting data for local storage.
- Here all of the features
     Display default items/local data on launch (if there is no local data, will display default items)
     Allow users to add new items via input field and button
     Update the list immediately upon adding new items
     Mark items as completed by strikethrough and checkbox
     Delete items from the list
     Persist data using local storage
