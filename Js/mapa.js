
// MAPA DE GOOGLE

// Iniciar y añadir mapa
function initMap() {
    // CÁLCULO DE RUTAS
    navigator.geolocation.getCurrentPosition(function(position){
        let latitud= position.coords.latitude;
        let longitud= position.coords.longitude;

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
    
        let inicio = new google.maps.LatLng(latitud, longitud);
        let final = new google.maps.LatLng(37.1932703, -5.8052677);

        let indicaciones= document.getElementById('indicaciones')
    
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: inicio,
        });
    
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(indicaciones);
        
        // CÁLCULO DE RUTAS
        directionsService.route({
            origin: inicio,
            destination: final,
            travelMode: google.maps.TravelMode.DRIVING, // WALKING, TRANSIT
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                alert("No es posible calcular esa ruta");
            }
        });
                
       

        // Contenido del marcador
        let contenido = '<div id="cajitamapa">' +
            '<h2>Calle Falsa 123</h2>' +
            '<img src="../Images/fakestreet.jpg" alt="calle falsa">' +
            '<p><strong>Dirección:</strong> Calle Falsa, 123, 41710 Utrera, Sevilla</p>' +
            '</div>';

        // Marcador
        let marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: final,
            title: "Calle Falsa 123",
        });

        // InfoWindow
        let info = new google.maps.InfoWindow({
            content: contenido,
        });

        // Agregar evento de clic al marcador

            marker.addListener("myInfo", () => {
            info.open(map, marker);
        });
        google.maps.event.trigger(marker, "myInfo");
        })


    }
