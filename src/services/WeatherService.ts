import axios from 'axios';

const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const OPEN_WEATHER_IMG_URL = 'http://openweathermap.org/img/w';

const getWeather = (url:string) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    const { main, icon } = response.data.weather[0];
                    const { temp, temp_min, temp_max } = response.data.main;
                    const { lon, lat } = response.data.coord;
                    const { dt, name } = response.data;
                    resolve({
                        condition: main,
                        date: new Date(dt * 1000),
                        icon: `${OPEN_WEATHER_IMG_URL}/${icon}.png`,
                        location: {
                            name,
                            latitude: lat,
                            longitude: lon
                        },
                        temperature: {
                            current: temp,
                            minimum: temp_min,
                            maximum: temp_max
                        }
                    });
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};


const getDailyWeather = (url:string) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {

                    const location = {
                        name: response.data.city.name,
                        latitude: response.data.city.coord.lat,
                        longitude: response.data.city.coord.lon
                    };                    

                    const dailyForecasts = response.data.list.map((fc: any) => {
                        return {
                            condition: fc.weather[0].description,
                            date: new Date(fc.dt * 1000),
                            icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
                            location,
                            temperature: {
                                minimum: fc.temp.min,
                                maximum: fc.temp.max
                            }
                        };
                    });
                    
                    resolve(dailyForecasts);
                } else {
                    reject('Weather data not found');
                }
            })
            .catch(error => reject(error.message));
    });
};


const getHourlyWeather = (url:string) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {

                    const location = {
                        name: response.data.city.name,
                        latitude: response.data.city.coord.lat,
                        longitude: response.data.city.coord.lon
                    };                    

                    const hourlyForecasts = response.data.list.map((fc: any) => {
                        return {
                            condition: fc.weather[0].description,
                            date: new Date(fc.dt * 1000),
                            icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
                            location,
                            temperature: {
                                current: fc.main.temp
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

        const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${OPEN_WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;
        
        return getWeather(url);
    }


    public getDailyWeatherByPosition({latitude, longitude}: any) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/forecast/daily?appid=${OPEN_WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric&cnt=7`;
        
        return getDailyWeather(url);
    }


    public getHourlyWeatherByPosition({latitude, longitude}: any) {
        if (!latitude) {
            throw Error('Latitude is required');
        }

        if (!longitude) {
            throw Error('Longitude is required');
        }

        const url = `${OPEN_WEATHER_BASE_URL}/forecast?appid=${OPEN_WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric&cnt=8`;
        
        return getHourlyWeather(url);
    }
}

export { WeatherService };