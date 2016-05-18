/**
 * Created by zwhitman on 5/17/2016.
 */


mapboxgl.accessToken = 'pk.eyJ1IjoiendoaXRtYW4iLCJhIjoieEZNeHdNQSJ9.mXXZjIJ2PYMZ6le-o3f90A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v8',
    center: [-77.0369, 38.9072],
    zoom: 11
});


//demo selectize
var demos = [
    {id: 1, demo: 'Black'},
    {id: 2, demo: 'White'},
    {id: 3, demo: 'Hispanic'},
    {id: 4, demo: 'Asian'},
    {id: 5, demo: 'Other'}
    ];

var ethSelect = $("#eth").selectize({
    placeholder: 'Ethnicity',
    maxItems: 1,
    valueField: 'id',
    labelField: 'demo',
    searchField: 'demo',
    options: demos
});

var ethControl = ethSelect[0].selectize;

//age selectize
var ages = [
    {id: 1, age: '18-29'},
    {id: 2, age: '30-40'},
    {id: 3, age: '40-50'},
    {id: 4, age: '50+'}
];

var ageSelect = $("#age").selectize({
    placeholder: 'Age Group',
    maxItems: 1,
    valueField: 'id',
    labelField: 'age',
    searchField: 'age',
    options: ages
});
var ageControl = ageSelect[0].selectize;

//income selectize
var incs = [
    {id: 1, inc: '<20k'},
    {id: 2, inc: '<50k'},
    {id: 3, inc: '<75k'},
    {id: 4, inc: '<100k'},
    {id: 5, inc: '>100k'}
];

var incSelect = $("#inc").selectize({
    placeholder: 'Income Bracket',
    maxItems: 1,
    valueField: 'id',
    labelField: 'inc',
    searchField: 'inc',
    options: incs
});
var incControl = incSelect[0].selectize;

//poi selectize
var pois = [
    {id: 1, poi: 'Coffee Shops'},
    {id: 2, poi: 'Schools'},
    {id: 3, poi: 'Rec Centers'},
    {id: 4, poi: 'Religious Centers'},
    {id: 5, poi: 'Supermarkets'}
];

var poiSelect = $("#poi").selectize({
    placeholder: 'Points of Interest',
    maxItems: null,
    valueField: 'id',
    labelField: 'poi',
    searchField: 'poi',
    options: pois
});
var poiControl = poiSelect[0].selectize;

//ward selectize
var wards = [
    {id: 1, ward: 'Ward 1'},
    {id: 2, ward: 'Ward 2'},
    {id: 3, ward: 'Ward 3'},
    {id: 4, ward: 'Ward 4'},
    {id: 5, ward: 'Ward 5'}
];
var wardSelect = $("#wards").selectize({
    placeholder: 'Wards',
    maxItems: null,
    valueField: 'id',
    labelField: 'ward',
    searchField: 'ward',
    options: wards
});
var wardControl = wardSelect[0].selectize;


function Query (eth, age, inc, poi) {
    this.eth = eth;
    this.age = age;
    this.inc = inc;
    this.poi = poi;
}


function renderSide(lat,lng){
    var googleK = 'AIzaSyDTt2wHwHjSlAd14BarF95r7GCfxPUKD84',
        gooURL = 'https://maps.googleapis.com/maps/api/streetview?size=300x150&location='+lat+','+lng+'&key='+googleK;
    $('#sRImg').attr('src',gooURL)
}

//render button
$( "#goBtn" ).click(function() {
    var query = new Query(ethControl.getValue(),ageControl.getValue(),incControl.getValue(),poiControl.getValue());
    console.log(query)
    $.getJSON( "data/worship.json", function( data ) {
        //var items = [];
        //$.each( data, function( key, val ) {
            //items.push( "<li id='" + key + "'>" + val + "</li>" );
            //console.log(val)
        //});
        console.log(data);
        map.addSource("worship", {
            "type": "geojson",
            "data": data,
            "cluster": true
        });

        map.addLayer({
            "id": "worship",
            "type": "circle",
            "source": "worship",
            "paint": {
                "circle-color": "#6FBB44",
                "circle-radius": 18
            }
        });
        map.addLayer({
            "id": "worship_cluster",
            "type": "symbol",
            "source": "worship",
            "layout": {
                "icon-image": "marker-18",
                "text-field": "{point_count}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                //"text-offset": [0, 0.6],
                //"text-anchor": "top"
            },
            "paint": {
                "text-color":"white"
            }

        });
        map.on('click', function (e) {
            $('#sideRContent').empty();



            var clusterFeatures = map.queryRenderedFeatures(e.point, { layers: ['worship_cluster'] });
            var features = map.queryRenderedFeatures(e.point, { layers: ['worship'] });

            if (!clusterFeatures.length && !features.length) {
                return;
            }

            if (clusterFeatures.length>0){
                $("#sideRight").css("right","-300px");
                map.flyTo({
                    center: [e.lngLat.lng, e.lngLat.lat],
                    zoom: map.style.z+1
                });
                return;
            }

            if (features.length>0 && clusterFeatures.length==0) {
                $("#sideRight").css("right","0px");
                var feature = features[0];

                // Populate the popup and set its coordinates
                // based on the feature found.
                $('#sideRTitle').text(feature.properties.NAME);
                $('#sideRContent').append(
                    "<ul>" +
                    "<li>Religion: "+feature.properties.RELIGION+"</li>" +
                    "<li>Address: "+feature.properties.ADDRESS+"</li>" +
                    "<li><a href='"+feature.properties.WEB_URL+"' target='_blank'>Website</a></li>" +
                    "</ul>");
                renderSide(feature.geometry.coordinates[1],feature.geometry.coordinates[0])
            }


            //var popup = new mapboxgl.Popup()
            //    .setLngLat(feature.geometry.coordinates)
            //    .setHTML(feature.properties.NAME)
            //    .addTo(map);
        });

        // Use the same approach as above to indicate that the symbols are clickable
        // by changing the cursor style to 'pointer'.
        map.on('mousemove', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['worship'] }),
                clusterFeatures = map.queryRenderedFeatures(e.point, { layers: ['worship'] });
            map.getCanvas().style.cursor = (features.length || clusterFeatures.length) ? 'pointer' : '';
        });
    });

});



map.on('load', function () {
    $('#loader').fadeOut()
});
