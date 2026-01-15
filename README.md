# weather-react

## Overview

A simple weather application which shows the current weather and hourly forecasts based on the current geolocation of accessing device.

## Prerequisites

### Basic Environment

The following software is required to be installed on your system:

- Node 22.21.0+
- Npm 11.0.0+

Type the following commands in the terminal to verify your Node and Npm versions.

```bash
node -v
npm -v
```

### External APIs

This application uses **Open-Meteo** for weather data, which requires:

- ✅ No API key
- ✅ No registration
- ✅ No payment method
- ✅ Completely free

**Geolocation** is handled by the browser's built-in Geolocation API, which requires user permission.

For more information about Open-Meteo, visit [open-meteo.com](https://open-meteo.com/).

### Setup

1. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the application:

   ```bash
   npm start
   ```

3. When prompted by your browser, allow location access to retrieve weather data.
