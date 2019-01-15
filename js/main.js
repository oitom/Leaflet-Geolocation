function loadPlaces() { 
    var locales = [
        {lat: -22.857416297999976, lng: -47.05584349999998},
        {lat: -22.925916139564013, lng: -47.1258442252867},
        {lat: -23.200629814005918, lng: -45.892245080553764},
        {lat: -23.200599943303605, lng: -45.88042000129706},
        {lat: -23.705150348160114, lng: -46.530042373904855},
        {lat: -23.727579999999932, lng: -46.682549999999935},
        {lat: -23.471064, lng: -47.42813475000001},
        {lat: -23.51392999999996, lng: -47.46093999999994},
        {lat: -23.5564695, lng: -47.44252125000001},
        {lat: -23.49716297270314, lng: -46.87299331974024},
        {lat: -23.591502, lng: -46.820072249999996},
        {lat: -23.52965999999998, lng: -46.57567999999998},
        {lat: -23.524145999999995, lng: -46.59578775},
        {lat: -23.503479034970283, lng: -46.6152213569162},
        {lat: -23.547807, lng: -46.65869775},
        {lat: -23.543999999999983, lng: -46.64230999999995},
        {lat: -22.881463563739743, lng: -47.04863221131699},
        {lat: -23.559954443245392, lng: -46.65828976103639},
        {lat: -23.561681605055075, lng: -46.657840065497176},
        {lat: -23.572709999999972, lng: -46.62925999999993},
        {lat: -23.601969999999937, lng: -46.609339999999975},
        {lat: -23.587029000000005, lng: -46.65252599999998},
        {lat: -23.590073713078006, lng: -46.68859400263225},
        {lat: -23.58878407878894, lng: -46.738588423875},
        {lat: -23.63385999999997, lng: -46.72170999999997},
        {lat: -23.63632999999993, lng: -46.662319999999966},
        {lat: -23.635808999999995, lng: -46.64273849999999},
        {lat: -23.573306232846768, lng: -46.69507454691549},
        {lat: -23.572492166253078, lng: -46.62893078711986}
    ];

    var locals = L.layerGroup().addTo(map);

    for (var i = 0; i < locales.length; i++) {
        locals.addLayer(L.marker(locales[i]).bindPopup('Info location'));
    }
}

function getLocate() { 
    // get current location
    var current_position, current_accuracy;

    function onLocationFound(e) {
        // if position defined, then remove the existing position marker and accuracy circle from the map
        if (current_position) {
            map.removeLayer(current_position);
            map.removeLayer(current_accuracy);
        }

        var radius = e.accuracy / 8;

        current_accuracy = L.circle(e.latlng, {
                                color: 'blue',
                                fillColor: '#00f',
                                fillOpacity: 0.5,
                                radius: 200
                            })
                            .addTo(map)
                            .bindPopup("Você está aquui")
                            .openPopup();

        current_accuracy = L.circle(e.latlng, radius)
                            .addTo(map)
                            .bindPopup("Você está aquui")
                            .openPopup();

       localAtual = e.latlng;
    }

    function onLocationError(e) {
        //alert(e.message);
        alert("Impossível encontrar a sua localização!");
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // wrap map.locate in a function    
    function locate() {
        map.locate({setView: true, maxZoom: 12});
    }

    setTimeout(function() { locate(); }, 300);
}
