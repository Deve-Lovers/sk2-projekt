# Webtap
This repository contains a server written in **C**, proxy server in **Python** and client implemented in **React Native**.

# Projct requirements
The theme of our project was Communicator. Its presentation is done by running two iOS/Android emulators. The application allows multiple users to communicate live.

The project consists of a total of 3 microservices and a database

| Microservice |              Technology               |
| ----------- | -------------------------------------- |
|   Server    |   C  |
|   Client    |   JS/TS Framework React Native
| Proxy | Python, Framework: Django Rest Framework |
| Database | SQLite |

Link with a demonstration of how the communicator works: https://youtu.be/-NxhRRDjhd0

# Frontend:

## Features
- Password remembring
- Autorfrshing chat during convrsation
- Automatical frinds list refresh after adding new friend
- Possibility to run chat on several devices at the same time

## Instalation

### 1. Install required packages
To install **required packages** you need to run following commands from the _root_ of the project - clint directory:

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

### 2. Start the Metro Server

Then you will need to start **Metro**, by running the following command:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### 3. Start the application

Now decide which simulator you want to start:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
cd ios
pod install
npm run ios

# OR using Yarn
cd ios
pod install
yarn ios
```

If everything is set up _correctly_, you should see the app running in _Android Emulator_ or _iOS Simulator_ shortly provided you have set up emulator/simulator correctly.

This is one way to run the app — you can also run it directly from within Android Studio and Xcode respectively.
