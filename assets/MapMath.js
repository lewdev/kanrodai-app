function t0Radians(value) {
	retum value * Math.PI / 180.0;
}
function toDegrees(value) {
	retum value * 180.0 / Math.PI;
}
var EARTH_RADIUS_METERS = 6371000;
var GreatCircle = {
	/**
	 * Retums the distance, in meters, between the two points.
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} meters.
	 */
	getDistance : function (loc1, loc2) {
		var dLat = toRadians(loc2.]at() - locl.lat());
		var dLon = t0Radians(loc2.]ng() - locl.lng());
		var latl = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.lat());
		var sinDeltaLat2 = Math.sin(dLat / 2);
		var sinDeltaLon2 = Math.sin(dL0n / 2);
		I var a = sinDeltaLat2 * sinDeltaLat2 +
			sinDeltaLon2 * sinDeltaLon2 * Math.cos(latl) * Math.cos(lat2)
			var c = 2 * Math.atan2(Math.sq1t(a), Math.sqrt(l - a));
		retum c * EARTH_RADIUS_METERS;
	}
	/**
	 * Retums the course between the two points (in degrees).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} degrees.
	 */
	getCourse : function (locl, loc2) {
		var dLon = toRadians(loc2.lng() - locl.lng());
		var latl = toRadians(loc1.lat());
		var lat2 = toRadia.ns(loc2.lat());
		var cosLat2 = Math.cos(lat2);
		var y = Math.sin(dLon) * cosLat2;
		var x = Math.cos(latl) *  \ Math.sin(lat2) -
			Math.sin(lat1) * cosLat2 * Math.cos(dLon);
		retum toDegrees(Math.atan2(y, x));
	}
	7
	/**
	 * Returns the midpoint (as a google.maps.LatLng object).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {google.maps.LatLng} The midpoint.
	 */
	getMidPoint : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - locl.lng());
		var latl = toRadians(locl.lat());
		var lat2 = toRadians(loc2.lat());
		var lonl = toRadians(loc 1.lng());

		var cosLat2 = Math.cos(lat2);
		var cosLatl = Math.cos(latl);
		var Bx = cosLat2 * Math.cos(dLon);
		var By = cosLat2 * Math.sin(dLon);
		var lat3 = Math.atan2(Math.sin(latl) + Math.sin(lat2),
				Math.sqrt((cosLatl + Bx) * (cosLat1 + Bx) + By * By));
		var 1on3 = lonl + Math.atan2(By, cosLatl + Bx);
		return new google.maps.LatLng(toDegrees(lat3), toDegrees(l0n3));
	},
	/**
	 * Returns the destination point from ‘latLng’ point having traveled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationP0int in "latlon.js"
	 * which was modiﬁed for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @retums {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.c0s(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.c0s(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+l 80°
		retum new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}
	9
	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @retum {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.1at()),
		lngInRadians = toRadians(startingP0int.lng());
		var lat = Math.asin(Math.sin(latlnRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians)

				var cosLat2 = Math.cos(lat2);
				var cosLatl = Math.cos(latl);
				var Bx = cosLat2 * Math.cos(dLon);
				var By = cosLat2 * Math.sin(dLon);
				var lat3 = Math.atan2(Math.sin(latl) + Math.sin(lat2),
						Math.sqrt((cosLatl + Bx) * (cosLat1 + Bx) + By * By));
				var 1on3 = lonl + Math.atan2(By, cosLatl + Bx);
				return new google.maps.LatLng(toDegrees(lat3), toDegrees(l0n3));
	},
	/**
	 * Returns the destination point from ‘latLng’ point having traveled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationP0int in "latlon.js"
	 * which was modiﬁed for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @retums {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.c0s(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.c0s(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+l 80°
		retum new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}
	9
	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @retum {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.1at()),
		lngInRadians = toRadians(startingP0int.lng());
		var lat = Math.asin(Math.sin(latlnRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians)

				Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(1at));
		// normalize to -1 80...+1 80
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new google.maps.LatLng(toDegrees(lat), toDegrees(1ng));
	}
};
var RhumbLine = {
	/*=k
	 * Retums the distance, in meters, between the two points.
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} meters.
	 */
	getDistance : function (loc1, loc2) {
		var dLat = toRadians(loc2.lat() - loc l.lat());
		var dLon = toRadians(1oc2.lng() - locl.lng());
		var latl = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.1at());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + latl / 2));
		var q = (isFinite(dLat / dPhi))‘.7 dLat / dPhi : Math.cos(lat1); // E-W line gives dPhi = O
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return Math.sqrt(dLat * dLat + q * q * dLon * dLon) * EARTH_RADIUS_METERS;
	}
	7
	/**
	 * Returns the course between the two points (in degrees).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} degrees.
	 */
	getCourse : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - locl.lng());
		var latl = toRadians(loc1.1at());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + latl / 2));
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return toDegrees(Math.atan2(dLon, dPhi));
	}
	3
	/**
	 * Returns the midpoint (as a GLatLng object).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} l0c2 The second location.
	 * @retum {google.maps.LatLng} The midpoint.
	 */
	getMidPoint : function (loc1, loc2) {
		var latl = toRadians(locl.lat());
		var lat2 = toRadians(loc2.1at());

		var cosLat2 = Math.cos(lat2);
		var cosLatl = Math.cos(latl);
		var Bx = cosLat2 * Math.cos(dLon);
		var By = cosLat2 * Math.sin(dLon);
		var lat3 = Math.atan2(Math.sin(latl) + Math.sin(lat2),
				Math.sqrt((cosLatl + Bx) * (cosLat1 + Bx) + By * By));
		var 1on3 = lonl + Math.atan2(By, cosLatl + Bx);
		return new google.maps.LatLng(toDegrees(lat3), toDegrees(l0n3));
	},
	/**
	 * Returns the destination point from ‘latLng’ point having traveled the given a
	 * location, distance, and initial bearing (or angle. Bearing normally varies around path followed).
	 *
	 * This function originated from LatLon.prototype.destinationP0int in "latlon.js"
	 * which was modiﬁed for readability. Used for creating circles.
	 *
	 * @param {google.maps.LatLng} latLng - Starting point.
	 * @param {number} bearing - Initial bearing in degrees.
	 * @param {number} distance - Distance in meters.
	 * @retums {google.maps.LatLng} Destination point.
	 */
	getDestination : function (latLng, bearing, distance) {
		var angle = toRadia.ns(bearing);
		var dist = toRadians(distance) / EARTH_RADIUS_METERS; // angular distance in radians
		var startLat = toRadians(latLng.lat());
		var startLng = toRadians(latLng.lng());
		var destLat = Math.asin(Math.sin(startLat) * Math.cos(dist) +
				Math.c0s(startLat) * Math.sin(dist) * Math.cos(angle)),
		destLng = startLng + Math.atan2(Math.sin(angle) * Math.sin(dist) * Math.cos(startLat),
				Math.c0s(dist) - Math.sin(staltLat) * Math.sin(destLat));
		destLng = (destLng + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l80..+l 80°
		retum new google.maps.LatLng(toDegrees(destLat), toDegrees(destLng));
	}
	9
	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @retum {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : function (startingPoint, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingPoint.1at()),
		lngInRadians = toRadians(startingP0int.lng());
		var lat = Math.asin(Math.sin(latlnRadians) * Math.cos(angularDistance) + _
				Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(angle)),
		lng = lngInRadians + Math.atan2(Math.sin(angle) * Math.sin(angularDistance) - Math.cos(latInRadians)

				Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(1at));
		// normalize to -1 80...+1 80
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new google.maps.LatLng(toDegrees(lat), toDegrees(1ng));
	}
};
var RhumbLine = {
	/*=k
	 * Retums the distance, in meters, between the two points.
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} meters.
	 */
	getDistance : function (loc1, loc2) {
		var dLat = toRadians(loc2.lat() - loc l.lat());
		var dLon = toRadians(1oc2.lng() - locl.lng());
		var latl = toRadians(loc1.lat());
		var lat2 = toRadians(loc2.1at());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + latl / 2));
		var q = (isFinite(dLat / dPhi))‘.7 dLat / dPhi : Math.cos(lat1); // E-W line gives dPhi = O
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return Math.sqrt(dLat * dLat + q * q * dLon * dLon) * EARTH_RADIUS_METERS;
	}
	7
	/**
	 * Returns the course between the two points (in degrees).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {number} degrees.
	 */
	getCourse : function (loc1, loc2) {
		var dLon = toRadians(loc2.lng() - locl.lng());
		var latl = toRadians(loc1.1at());
		var lat2 = toRadians(loc2.lat());
		var dPhi = Math.log(Math.tan(Math.PI / 4 + lat2 / 2) / Math.tan(Math.PI / 4 + latl / 2));
		if (Math.abs(dLon) > Math.PI) {
			dLon = dLon > 0 ? (2 * Math.PI - dLon) : (2 * Math.PI + dLon);
		}
		return toDegrees(Math.atan2(dLon, dPhi));
	}
	3
	/**
	 * Returns the midpoint (as a GLatLng object).
	 * @param {google.maps.LatLng} locl The ﬁrst location.
	 * @param {google.maps.LatLng} loc2 The second location.
	 * @retum {google.maps.LatLng} The midpoint.
	 */
	getMidPoint : function (loc1, loc2) {
		var latl = toRadians(locl.lat());
		var lat2 = toRadians(loc2.1at());

		var lonl = t0Radians(l0cl.lng());
		var l0n2 = toRadians(loc2.lng());
		if (lonl > lon2) {
			var tlat = lat2;
			lat2 = latl;
			latl = tlat;
			var tlon = 1on2;
			lon2 = lonl;
			lonl = tlon;
		}
		if (Math.abs(l0n2 - lonl) > Math.PI) {
			lonl += 2 * Math.PI;
		}
		var 1at3 = (latl + lat2) / 2;
		var fl = Math.tan(Math.PI / 4 + latl / 2);
		var f2 = Math.tan(Math.PI / 4 + lat2 / 2);
		var f3 = Math.tan(Math.PI / 4 + 1at3 / 2);
		var 1on3 = ((l0n2 - lonl) * Math.log(f3) + lonl * Math.log(f2) - l0n2 * Math.log(ﬂ)) / Math.l0g(f2 / fl);
		if (!isFinite(l0n3)) {
			1on3 = (lonl + 1on2) / 2;
		}
		1on3 = (lon3 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalize to -l 80.. 1 80
		return new google.maps.LatLng(toDegrees(lat3), t0Degrees(l0n3));
	}
	9
	/**
	 * Returns the distance, in meters, between the two points on a Great Circle.
	 * @param {google.maps.LatLng} startingPoint The start point.
	 * @param {number} bearing Initial bearing in degrees.
	 * @param {number} distance Distance from startPoint in kilometers.
	 * @return {google.maps.LatLng}
	 */
	getPointGivenDistanceAndBearing : functi0n(staningP0int, bearing, distance) {
		var angle = toRadians(bearing),
		angularDistance = distance / (EARTH_RADIUS_METERS / 1000),
		latInRadians = toRadians(startingP0int.lat()),
		lngInRadians = t0Radians(startingPoint.lng()),
		latDelta = angularDistance * Math.cos(angle),
		lat = latInRadians + latDelta;
		if (Math.abs(lat) > Math.PI / 2) {
			lat = lat > 0 ? Math.PI - lat : -Math.PI - lat;
		}
		var deltaDifference = Math.log(Math.tan(lat / 2 + Math.PI / 4) / Math.tan(latlnRadians / 2 + Math.PI / 4)),
		q = Math.abs(deltaDifference) > l0e - l2 ? latDelta / deltaDifference : Math.cos(latInRadians);
		var lngDelta = angularDistance * Math.sin(angle) / q;
		var lng = 1ngInRadians + lngDelta;
		// normalize to -18O...+180
		lng = (lng + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		retum new google.maps.LatLng(toDegrees(1at), t0Degrees(lng));
	}
