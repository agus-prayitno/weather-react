# weather-react

## Overview

A weather application that displays the current weather and hourly forecasts based on the current geolocation of accessing device.

## Prerequisites

### Basic Environment

The following software is required to be installed on your system:

* Node 10.x
* Npm 6.x

Type the following commands in the terminal to verify your node and npm versions

```bash
node -v
npm -v
```

### External APIs

1. Get API keys

   * OpenWeather API

     Read the description and specs at [OpenWeather API](http://openweathermap.org/api)

     Get an API key [here](http://openweathermap.org/appid)

   * Google Geolocation API

     Read the description and specs at [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro)

     Get an API key [here](https://developers.google.com/maps/documentation/geolocation/get-api-key)

1. Setup environment variables

   It is required to setup a few environment variables that are used by the _WeatherService_ and _GeolocationService_ to authenticate against the above external APIs.

   Please follow the following steps:

   * Add _'.env'_ file

     Create a file called _'.env'_ at the root of the application

   * Add environment variables to _'.env'_ file

     GOOGLE_GEOLOCATION_API_KEY=YOUR_API_KEY_GOES_HERE
     OPEN_WEATHER_API_KEY=YOUR_API_KEY_GOES_HERE

   For more information about _'.env'_, please visit [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)
