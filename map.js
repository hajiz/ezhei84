var LatLng = google.maps.LatLng;
var Map = google.maps.Map;
var Marker = google.maps.Marker;
var InfoWindow = google.maps.InfoWindow;
var EventManager = google.maps.event;

var esfahan = "Esfahan";
var tehran = "Tehran";
var vancouver = "Vancouver";
var losangeles = "Los Angeles";
var orangecounty = "Orange County";
var newjersey = "New Jersey";
var newyork = "New York";
var newark = "Newark";
var shahinshahr = "Shahinshahr";
var ardakan = "Ardakan";

function ll (lat, lng) {
	return new LatLng(lat, lng);
}

var cityCoordinates = {};
cityCoordinates[esfahan] = ll(32.654627, 51.667983);
cityCoordinates[tehran] = ll(35.689197, 51.388974);
cityCoordinates[vancouver] = ll(49.282729, -123.120738);
cityCoordinates[losangeles] = ll(34.052234, -118.243685);
cityCoordinates[orangecounty] = ll(33.717471, -117.831143);
cityCoordinates[newjersey] = ll(40.486216, -74.451819);
cityCoordinates[newyork] = ll(40.712784, -74.005941);
cityCoordinates[newark] = ll(39.683723, -75.749657);
cityCoordinates[shahinshahr] = ll(32.873455, 51.545747);
cityCoordinates[ardakan] = ll(32.306283, 54.016042);

function o (name, location, married) {
	return {
		name: name,
		location: location,
		married: married
	};
}

var married = true,
	single = false;

var kids = [
	o("Hamid Pourjam", tehran, married),
	o("Amir Hossein Hajizadeh", vancouver, single),
	o("Matin Shirani", esfahan, single),
	o("Ali Shirvani", esfahan, single),
	o("Aliakbar Nasr Esfahani", esfahan, married),
	o("Faramarz Safazadeh", esfahan, single),
	o("Koorosh Khanjani", losangeles, married),
	o("Amir Khajavinia", tehran, single),
	o("Nima Noori", esfahan, married),
	o("Mohsen Niknadaf", esfahan, single),
	o("Mohsen Niknadaf", tehran, single),
	o("Amir Mazaheri", esfahan, married),
	o("Mohammad Asghari", orangecounty, married),
	o("Pooya Mansouri", tehran, married),
	o("Meysam Adimi", esfahan, single),
	o("Aria Basirnia", newjersey, single),
	o("Mohammad Soroush", tehran, single),
	o("Hadi Dehghani", ardakan, married),
	o("Hamid Mirmojarabian", esfahan, single),
	o("Aref Bolandnazar", newyork, married),
	o("Shahrokh Hatefi", esfahan, single),
	o("Masoud Bateni", esfahan, single),
	o("Pooya Fotouhi", newark, married),
	o("Mohammad Shafiee", tehran, single),
	o("Amir Akbari", esfahan, single),
	o("Ali Kharaji", esfahan, single),
	o("Hesam Pourpirali", tehran, single),
	o("Mohammad Hashemi", esfahan, single),
	o("Mohsen Bakhtiar", shahinshahr, married),
	o("Mohsen Bakhtiar", esfahan, married),
	o("Amir Golmakani", tehran, married),
	o("Hamidreza Tabesh", tehran, single),
	o("Hamidreza Tabesh", esfahan, single),
	o("Mohammad Javad MollaKouchakian", tehran, single),
	o("Hamid Hosseini", esfahan, married),
	o("Arash Mehrkesh", tehran, married),
	o("Masoud Seyyedana", esfahan, married),
	o("Armin Mazaheri", tehran, married)
];


function initialize() {
  	var origin = new LatLng(41.77131167976406, -5.625);

	var mapOptions = {
		center: origin,
		zoom: 3
	};

	var map = new Map(document.getElementById("map-canvas"), mapOptions);

	var infowindow = new InfoWindow({
		content: ''
	});

	function generateInfoWindowHTML(city) {
		return "<b>" + city + "</b><br>" + kids.filter(function(kiddo) {
			return kiddo.location === city;
		}).map(function(kiddo) {
			return kiddo.name + (kiddo.married === married ? "&nbsp;<img src='couple.png'>" : "");
		}).join("<br>");
	}

	function showInfoWindow(marker, city) {
		infowindow.setContent(generateInfoWindowHTML(city));
		infowindow.open(map, marker);
	}

	function closeInfoWindow() {
		infowindow.close();
		infowindow.setContent("");
	}

	Object.keys(cityCoordinates).forEach(function(city) {
		var marker = new Marker({
			position: cityCoordinates[city],
			map: map
		});
		EventManager.addListener(marker, 'click', showInfoWindow.bind(null, marker, city));
	});




	EventManager.addListener(map, 'click', closeInfoWindow);
}

EventManager.addDomListener(window, 'load', initialize);