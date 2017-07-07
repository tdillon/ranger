export class LatLong {
    latitude: number;
    longitude: number;

    constructor(coords: Coordinates) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
    }
}
