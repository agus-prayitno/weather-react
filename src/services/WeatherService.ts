import axios from 'axios';

/**
 * Open-Meteo Weather Service
 * Free weather API with no registration required
 * https://open-meteo.com/
 */

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Weather code to description mapping (WMO codes)
const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy with rime',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with large hail'
    };
    return weatherCodes[code] || 'Unknown';
};

// WMO code to icon mapping
const getWeatherIcon = (code: number): string => {
    const iconMap: { [key: number]: string } = {
        0: '01d', // clear sky
        1: '02d', // mainly clear
        2: '04d', // partly cloudy
        3: '04d', // overcast
        45: '50d', // foggy
        48: '50d', // foggy with rime
        51: '09d', // drizzle
        53: '09d',
        55: '09d',
        61: '10d', // rain
        63: '10d',
        65: '10d',
        71: '13d', // snow
        73: '13d',
        75: '13d',
        77: '13d',
        80: '09d', // rain showers
        81: '10d',
        82: '10d',
        85: '13d', // snow showers
        86: '13d',
        95: '11d', // thunderstorm
        96: '11d',
        99: '11d'
    };
    return `https://openweathermap.org/img/wn/${iconMap[code] || '01d'}@2x.png`;
};

const getCurrentWeather = (latitude: number, longitude: number) => {
    return new Promise((resolve, reject) => {
        const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=auto`;
        
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    const { current, latitude: lat, longitude: lon, timezone } = response.data;
                    const weatherCode = current.weather_code;
                    
                    resolve({
                        condition: getWeatherDescription(weatherCode),
                        date: new Date(),
                        icon: getWeatherIcon(weatherCode),
                        location: {
                            name: timezone.split('/')[1] || 'Unknown',
                            latitude: lat,
                            longitude: lon
                        },
                        temperature: {
                            current: current.temperature_2m,
                            minimum: current.temperature_2m,
                            maximum: current.temperature_2m
                        }
                    });
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};

const getHourlyWeather = (latitude: number, longitude: number) => {
    return new Promise((resolve, reject) => {
        const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&temperature_unit=celsius&timezone=auto&forecast_days=1`;
        
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    const { hourly, latitude: lat, longitude: lon, timezone } = response.data;
                    const location = {
                        name: timezone.split('/')[1] || 'Unknown',
                        latitude: lat,
                        longitude: lon
                    };

                    // Get next 8 hours
                    const hourlyForecasts = hourly.time.slice(0, 8).map((time: string, index: number) => {
                        const weatherCode = hourly.weather_code[index];
                        return {
                            condition: getWeatherDescription(weatherCode),
                            date: new Date(time),
                            icon: getWeatherIcon(weatherCode),
                            location,
                            temperature: {
                                current: hourly.temperature_2m[index]
                            }
                        };
                    });
                    
                    resolve(hourlyForecasts);
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};

class WeatherService {

    public getCurrentWeatherByPosition({latitude, longitude}: any) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        return getCurrentWeather(latitude, longitude);
    }


    public getDailyWeatherByPosition({latitude, longitude}: any) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        // For now, return hourly data as daily forecast
        // Open-Meteo free tier has limitations on daily data
        return this.getHourlyWeatherByPosition({ latitude, longitude });
    }


    public getHourlyWeatherByPosition({latitude, longitude}: any) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        return getHourlyWeather(latitude, longitude);
    }
}

export { WeatherService };