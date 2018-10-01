document.addEventListener('DOMContentLoaded', function(){
	var mapOneNameId = document.getElementById('map');

	var styles = [
		{
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#ffffff"
				}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#5c94d1"
				}
			]
		},
		{
			"featureType": "administrative.land_parcel",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.business",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#c9fed2"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#f8f8f8"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#7d7b7c"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#fadba4"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#fadba4"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#414246"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road.local",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#ecf9ff"
				}
			]
		}
	];

	function initMap(id,universities) {
		var map = new google.maps.Map(id, {
			zoom: 13,
			center: {lat: 32.702768, lng: -117.200434},
			scrollwheel: false,
			styles: styles
		});

		setMarkers(map,universities);
	}

	var pinCoord = [
		['<div class="gm-style-iw__title">California University</div><div class="gm-style-iw__route">United States, California LA, Sarigza Avenue 234, 44A</div>', 32.702768, -117.200434, 3]
	];

	function setMarkers(map, universities) {
		var infowindow = new google.maps.InfoWindow({
			content: 'text'
		});

		var icon1 = 'img/ico-pin.png';

		let sizeX = 182;
		let sizeY = 182;

		var image = {
			url: icon1,
			size: new google.maps.Size(sizeX, sizeY),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(sizeX / 2, sizeY / 2)
		};

		for (var i = 0; i < universities.length; i++) {
			var unvsty = universities[i];
			var marker = new google.maps.Marker({
				position: {lat: unvsty[1], lng: unvsty[2]},
				map: map,
				icon: image,
				title: unvsty[0],
				zIndex: unvsty[3]
			});

			google.maps.event.addListener(marker, 'click', (function(marker) {
				return function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				};
			})(marker, i));


			google.maps.event.addListener(marker, 'mouseover', (function(marker) {
				return function() {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					
				};
			})(marker, i));

			google.maps.event.addListener(marker, 'mouseout', (function(marker) {
				return function() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null);
					}
				};
			})(marker, i));
		}
	}

	if (mapOneNameId) {
		initMap(mapOneNameId, pinCoord);
	}


	var copyInBufferBtn = document.querySelector('.js-buffer-btn');

	copyInBufferBtn.addEventListener('click', function(event) {
		var universityId = document.querySelector('.js-university-id'),
			range = document.createRange();

		range.selectNode(universityId);
		window.getSelection().addRange(range);

		try {
			document.execCommand('copy');
		} catch(err) {
			console.log('Oops, unable to copy');
		}

		window.getSelection().removeAllRanges();
	});
});