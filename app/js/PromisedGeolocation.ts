export default class PromisedGeolocation {
    static GetPosition(): Promise<Position> {
        return new Promise((resolve, reject) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                })
            } else {
                reject("Geoposition is not defined");
            }
        });
    }
};
