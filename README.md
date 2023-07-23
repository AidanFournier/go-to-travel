<h1 align="left">Go To Travel</h1>
<h3 align="left">Discover hotels, restaurants, and attractions in cities across Japan.</h3>

![Home page](https://github.com/AidanFournier/go-to-travel/assets/78288118/085f6d81-d5af-4ed6-ac20-bcfcef95d4cd)
![Discover page](https://github.com/AidanFournier/go-to-travel/assets/78288118/038e37d9-e05e-4ee9-9d8c-72dcdfca5304)
![Restaurant Show Page](https://github.com/AidanFournier/go-to-travel/assets/78288118/02e473cd-0062-43d6-8116-c21ef2560016)
![Attraction Show Page](https://github.com/AidanFournier/go-to-travel/assets/78288118/a7e518d0-3c24-4847-b283-30d5060110da)
![Zoomed-in map](https://github.com/AidanFournier/go-to-travel/assets/78288118/2f85f2b5-bf49-48a8-808c-53bdee6233cc)

## Table of contents
* [Introduction](#introduction)
* [App](#app)
* [Technologies](#technologies)
* [Contribution](#contributing)
* [Credits](#credits)

## Introduction
This mobile native app is inspired by Japan's much-loved discount travel campaign that promotes tourism within the country. 

Search by using place name keywords, such as "Roppongi" or "Atami". From there, you will have access to hundreds of search results on popular hotels, attractions, and restaurants. Tap on a result to find out further useful information, such its description, its pricing, and access to its website and Google Maps directions.


## App
Check out the [showcase page](https://main--legendary-faun-08a27a.netlify.app/) or access the live project from [Expo Go](https://expo.dev/@aidoufou/go-to-travel?serviceType=classic&distribution=expo-go).

If you already have the Expo Go app on your phone, you can scan this QR code to open Go To Travel:

<img src="https://github.com/AidanFournier/go-to-travel/assets/78288118/f8b60ab4-d6b9-4f27-982d-e83ce907917c" alt="Expo Go QR Code" width="200" height="200"/>

## Technologies

<h3 align="left">Languages and tools:</h3>
<a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="40" height="40"/></a>
<a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> 
</a> <a href="https://git-scm.com/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" alt="git" width="40" height="40"/> </a> 

<h3 align="left">Other tools used:</h3>

* [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
* [Travel Advisor API](https://rapidapi.com/apidojo/api/travel-advisor/)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Credits
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Development environment
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

If it's your first time, run this command in the project directory to make sure you have installed all the necessary packages:
```
// ./go-to-travel
yarn install
```

To start the server locally:

### `yarn start`

Runs your app in development mode.

Scan the QR Code that appears to open and view it in the [Expo app](https://expo.io) on your phone. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```
#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).
