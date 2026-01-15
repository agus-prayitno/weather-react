import { Component } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { HourlyWeatherForecastCard } from './HourlyWeatherForecastCard';


class HourlyWeatherDisplay extends Component {
    render(){
        return (
            <div className="hourly-weather-display">
                <div className="text-center h5 pt-2">Hourly</div>
                <div className="carousel">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation
                        breakpoints={{
                            320: {
                                slidesPerView: 1
                            },
                            768: {
                                slidesPerView: 2
                            },
                            1024: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        {
                            !!this.props.hourlyForecasts && this.props.hourlyForecasts.map((fc, i) => (
                                <SwiperSlide key={i}>
                                    <HourlyWeatherForecastCard forecast={fc} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        );
    }
}

HourlyWeatherDisplay.propTypes = {
    hourlyForecasts: PropTypes.array.isRequired
};

export { HourlyWeatherDisplay };