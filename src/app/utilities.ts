import { LatLong } from "./lat-long";

export class Utilities {

    /**
     * Get the 'tunnel distance' to the nearest yard between two latitude/longitudes.
     * null is returned if l1 or l2 are not LatLong objects.
     * 
     * http://en.wikipedia.org/wiki/Geographical_distance#Tunnel_distance
     * 
     * @param l1 Point A
     * @param l2 Point B
     * @returns Distance between l1 and l2 rounded to the nearest yard.
     */
    static getDistance(l1: LatLong, l2: LatLong): number {
        if (l1 && l2) {
            //radians are needed for calculations
            const lat1 = l1.latitude * Math.PI / 180,
                lon1 = l1.longitude * Math.PI / 180,
                lat2 = l2.latitude * Math.PI / 180,
                lon2 = l2.longitude * Math.PI / 180,
                R = 6371.009,  //earth's radius in KM
                X = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1),
                Y = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1),
                Z = Math.sin(lat2) - Math.sin(lat1),
                C = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2) + Math.pow(Z, 2)),
                D = R /*KM*/ * C * 1000 /*M/KM*/ / .9144 /*M/Y*/;
            return Math.round(D);  //YARDS
        } else {
            return null;
        }
    }

}
