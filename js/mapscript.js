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
        gooURL = 'https://maps.googleapis.com/maps/api/streetview?size=500x150&location='+lat+','+lng+'&key='+googleK;
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
                $("#sideRight").css("right","-500px");
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
                console.log(feature.geometry.coordinates[1],feature.geometry.coordinates[0])
            }

            var lat = feature.geometry.coordinates[1],
                lng = feature.geometry.coordinates[0];


            var baseURL = 'https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/ACS_5_Year_Socioeconomic_Data_By_Tract_As_of_2012/FeatureServer/0/query?where=STATE+%3D+%2711%27&objectIds=&time=&geometry=%7B%22x%22%3A'+lng+'%2C%22y%22%3A'+lat+'%7D%0D%0A+&geometryType=esriGeometryPoint&inSR=%7B%22wkid%22+%3A+4326%7D&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='

            $.getJSON( baseURL, function( data ) {
                console.log(data.features[0].properties);
                $('#socio').empty();
                var shead = ['<tr><th>Field</th><th>Description</th></tr>'];
                var sdata = [];
                //travel vars
                var tLook = ["B08303_30MINUS_TTW","B08303_30TO59_TTW","B08303_60PLUS_TTW"];
                var travel = [];
                // poverty vars
                //var pLook = ["B08303_30MINUS_TTW","B08303_30TO59_TTW","B08303_60PLUS_TTW"];
                var pLook = ["B19001_LT15","B19001_15TO25","B19001_25TO35","B19001_35TO45","B19001_45TO60","B19001EST12","B19001EST13","B19001EST14","B19001EST15","B19001_GT150"]
                var poverty = [];
                // education vars
                var eLook = ["B20004EST2","B20004EST3","B20004EST4","B20004EST5","B20004EST6"];
                var education = [];

                $.each(data.features[0].properties,function(index, value) {
                    $.each(socio,function(si, sv) {
                        if(socio[si].Field==index){
                            //sdata.push("<li>" + socio[si].Alias+" = "+ value + "</li>")
                            sdata.push("<tr><td>" + socio[si].Alias+"</td><td>"+ value + "</td></tr>")
                            if($.inArray(socio[si].Field, tLook) > -1){
                                travel.push({"groups":socio[si].Alias, "name": "Workers", "total count":value})
                            }
                            if($.inArray(socio[si].Field, pLook) > -1){
                                poverty.push({"groups":socio[si].Alias, "name": "Workers", "total count":value})
                            }
                            if($.inArray(socio[si].Field, eLook) > -1){
                                education.push({"groups":socio[si].Alias, "name": "Residents", "total count":value})
                            }
                        }
                    });
                });
                $( "<thead/>", {
                    "class": "socioTable",
                    html: shead.join( "" )
                }).appendTo( "#socio" );
                $( "<tbody/>", {
                    "class": "socioTable",
                    html: sdata.join( "" )
                }).appendTo( "#socio" );

                visualization.data(travel).draw();
                eduVisualization.data(education).draw();
                povVisualization.data(poverty).draw();
            });


            var demoURL = 'https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/ACS_5_Year_Demographic_Data_by_Tract_as_of_2012/FeatureServer/0/query?where=STATE+%3D+%2711%27&objectIds=&time=&geometry=%7B%22x%22%3A'+lng+'%2C%22y%22%3A'+lat+'%7D%0D%0A+&geometryType=esriGeometryPoint&inSR=%7B%22wkid%22+%3A+4326%7D&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='

            $.getJSON( demoURL, function( data ) {
                $('#socio').empty();
                var ddata = [];
                //age vars
                var aLook = ["AGE_18TO24","AGE_25TO34","AGE_35TO44","AGE_45TO64","AGE_65UP"];
                var ages = [];

                //ethnicity
                var eLook = ["B03002EST3","B03002EST4","B03002EST5","B03002EST6","B03002EST7","B03002EST8","B03002EST12","B03002TMNH"];
                var binArray = ["B03002EST5","B03002EST7","B03002EST8","B03002TMNH"]
                var binCount = 0;
                var ethnicity = [];


                //{"Field":"AGE_18TO24","Alias":"Population Ages 18 to 24"},
                //{"Field":"AGE_25TO34","Alias":"Population Ages 25 to 34"},
                //{"Field":"AGE_35TO44","Alias":"Population Ages 35 to 44"},
                //{"Field":"AGE_45TO64","Alias":"Population Ages 45 to 64"},
                //{"Field":"AGE_65UP","Alias":"Population Ages 65 and older"},
                ////travel vars
                //var tLook = ["B08303_30MINUS_TTW","B08303_30TO59_TTW","B08303_60PLUS_TTW"];
                //var travel = [];
                //// poverty vars
                ////var pLook = ["B08303_30MINUS_TTW","B08303_30TO59_TTW","B08303_60PLUS_TTW"];
                //var pLook = ["B19001_LT15","B19001_15TO25","B19001_25TO35","B19001_35TO45","B19001_45TO60","B19001EST12","B19001EST13","B19001EST14","B19001EST15","B19001_GT150"]
                //var poverty = [];
                //// education vars
                //var eLook = ["B20004EST2","B20004EST3","B20004EST4","B20004EST5","B20004EST6"];
                //var education = [];

                $.each(data.features[0].properties,function(index, value) {
                    $.each(demo,function(si, sv) {
                        if(demo[si].Field==index){
                            ddata.push("<li>" + demo[si].Alias+" = "+ value + "</li>")
                            if($.inArray(demo[si].Field, aLook) > -1){
                                ages.push({"groups":demo[si].Alias, "name": "Population", "total count":value})
                            }
                            if($.inArray(demo[si].Field, eLook) > -1){
                                if($.inArray(demo[si].Field, binArray) > -1){
                                    binCount = binCount + value

                                } else {
                                    ethnicity.push({"groups":demo[si].Alias, "name": "Population", "total count":value})
                                }

                            }
                            //if($.inArray(socio[si].Field, eLook) > -1){
                            //    education.push({"groups":socio[si].Alias, "name": "Residents", "total count":value})
                            //}
                        }
                    });
                });
                ethnicity.push({"groups":"Other", "name": "Population", "total count":binCount})
                //$( "<ul/>", {
                //    "class": "my-new-list",
                //    html: ddata.join( "" )
                //}).appendTo( "#demo" );
                ageVisualization.data(ages).draw();
                ethVisualization.data(ethnicity).draw();
                //eduVisualization.data(education).draw();
                //povVisualization.data(poverty).draw();
            });


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


//travel graph
var travel = [
    {"groups": "1", "name":"alpha", "total count": 15}
];
var visualization = d3plus.viz()
    .container("#viz")
    .data(travel)
    .type("bar")
    .order({
        "value":"name"
    })
    .id("name")
    .x("groups")
    .y("total count")
    .background("rgba(0,0,0,0)")

var education = [
    {"groups": "1", "name":"alpha", "total count": 15}
];
var eduVisualization = d3plus.viz()
    .container("#vizEDU")
    .data(education)
    .type("bar")
    .order({
        "value":"name"
    })
    .id("name")
    .x("groups")
    .y("total count")
    .background("rgba(0,0,0,0)")
    //.draw()

var poverty = [
    {"groups": "1", "name":"alpha", "total count": 15}
];
var povVisualization = d3plus.viz()
    .container("#vizPOV")
    .data(poverty)
    .type("bar")
    .order({
        "value":"name"
    })
    .id("name")
    .x("groups")
    .y("total count")
    .background("rgba(0,0,0,0)")
//.draw()

var ages = [
    {"groups": "1", "name":"alpha", "total count": 15}
];
var ageVisualization = d3plus.viz()
    .container("#vizAGE")
    .data(ages)
    .type("bar")
    .order({
        "value":"name"
    })
    .id("name")
    .x("groups")
    .y("total count")
    .background("rgba(0,0,0,0)")
//.draw()

var ethnicity = [
    {"groups": "1", "name":"alpha", "total count": 15}
];
var ethVisualization = d3plus.viz()
    .container("#vizETH")
    .data(ethnicity)
    .type("bar")
    .order({
        "value":"name"
    })
    .id("name")
    .x("groups")
    .y("total count")
    .background("rgba(0,0,0,0)")
//.draw()


map.on('load', function () {
    $('#loader').fadeOut()
});
