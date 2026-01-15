/**
 * GeolocationService - Uses browser's built-in Geolocation API
 * No API key required - completely free
 */
class GeolocationService {

    public getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation is not supported by this browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({
                        latitude,
                        longitude
                    });
                },
                (error) => {
                    let errorMessage = 'Unable to retrieve current location';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Permission denied. Please enable location access.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information is unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Location request timed out.';
                            break;
                    }
                    console.error(`Geolocation Error: ${errorMessage}`);
                    reject(errorMessage);
                },
                {
                    timeout: 10000,
                    maximumAge: 0,
                    enableHighAccuracy: false
                }
            );
        });
    }
}

export { GeolocationService };