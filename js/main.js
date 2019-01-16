function loadPlaces() { 
    $.getJSON( "data/base.json", function( data ) {
        var locals = L.layerGroup().addTo(map);

        $.each(data.places, function(index, obj) {
            var htmlPop = ` <h6 class="tit-pop">${obj.name}</h6>
                            <p class="line-pop"><i class="fa fa-map-marker blue" aria-hidden="true"></i> ${obj.end}</p>
                            <p class="line-pop"><i class="fa fa-clock-o blue" aria-hidden="true"></i> ${obj.horario}</p>
                            <p class="line-pop"><i class="fa fa-info-circle blue" aria-hidden="true"></i> ${obj.info}</p>
                            <a class="a-pop" href="${obj.link}" target="_blank">Rota</a>`;

            var position = [obj.lat, obj.lng];
            locals.addLayer(L.marker(position).bindPopup(htmlPop).on('click', clickZoom));
        });
    });
}

function clickZoom(e) {
    map.setView(e.target.getLatLng(), 15);
}


function getLocate() { 
    function onLocationFound(e) {
        if(map.hasLayer(current_accuracy))
            map.removeLayer(current_accuracy);
        
        if(map.hasLayer(layer_origem))
            map.removeLayer(layer_origem);

        if (current_position) {
            map.removeLayer(current_position);
            map.removeLayer(current_accuracy);
        }

        var radius = 0 * 1000; // km

        //point
        var greenIcon = L.icon({
            iconUrl: 'img/marker-icon.png',
            shadowUrl: 'img/marker-shadow.png',
            iconSize:     [25, 41],
            shadowSize:   [41, 41],
            iconAnchor:   [15, 35],
            shadowAnchor: [15, 35],
            popupAnchor:  [-1, -30]
        });
        layer_local = L.marker(e.latlng, {icon: greenIcon}).addTo(map).bindPopup("Você está aquui");

        //circ
        current_accuracy = L.circle(e.latlng, {
                                radius: radius,
                            })
                            .addTo(map)
                            .on('click', clickZoom);

       localAtual = e.latlng;
    }

    function onLocationError(e) {
        //alert(e.message);
        alert("Impossível encontrar a sua localização!");
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function locate() {
        map.locate({setView: true, maxZoom: 15});
    }
    setTimeout(function() { locate(); }, 300);
}

function findPlace(lat, lng, dis) { 
    $.getJSON( "data/base.json", function( data ) {
        $.each(data.places, function(index, obj) {
            var dif =  parseFloat(distance(lat, lng, obj.lat, obj.lng, 'K').toFixed(2));
            // dentro da distancia selecionada
            if(dif <= dis) { 
                var place = {"dis": dif, "place": obj};
                drawItem(place);
            }
        });
    });
}

function drawItem(place) { 
    var html = `<div class="place">
                    <h5>${place.place.name}</h5>
                    <p>${place.place.end}</p>
                    <p>Distância: ${place.dis} KM</p>
                </div>`;
    $("#itens-place").append(html);
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        if (dist > 1) {
			dist = 1;
        }
        
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        
		return dist;
	}
}