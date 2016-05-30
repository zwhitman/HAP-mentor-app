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
map.addControl(new mapboxgl.Navigation());

//demo selectize
var gen = [
    {id: 1, gen: 'Male'},
    {id: 2, gen: 'Female'},
];

var genSelect = $("#gen").selectize({
    placeholder: 'Gender',
    maxItems: 1,
    valueField: 'id',
    labelField: 'gen',
    searchField: 'gen',
    options: gen
});
var genControl = genSelect[0].selectize;

//demo selectize
var demos = [
    {id: 1, demo: 'Black'},
    {id: 2, demo: 'White'},
    //{id: 3, demo: 'Hispanic'},
    //{id: 4, demo: 'Asian'},
    //{id: 5, demo: 'Other'}
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
    {id: 1, age: '<30'},
    {id: 2, age: '30-40'},
    {id: 3, age: '40+'},
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
//var incs = [
//    {id: 1, inc: '<20k'},
//    {id: 2, inc: '<50k'},
//    {id: 3, inc: '<75k'},
//    {id: 4, inc: '<100k'},
//    {id: 5, inc: '>100k'}
//];
//
//var incSelect = $("#inc").selectize({
//    placeholder: 'Income Bracket',
//    maxItems: 1,
//    valueField: 'id',
//    labelField: 'inc',
//    searchField: 'inc',
//    options: incs
//});
//var incControl = incSelect[0].selectize;

//poi selectize
var pois = [
    {id: 1, poi: 'Centers'},
    {id: 2, poi: 'Capital Bike Shares'},
    {id: 3, poi: 'Grocery Stores'},
    {id: 4, poi: 'Metro Stations'},
    {id: 5, poi: 'Places of Worship'},
    {id: 6, poi: 'Recreation Fields'},
    {id: 7, poi: 'Companies'},
    {id: 8, poi: 'Universities'}
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
    {id: 5, ward: 'Ward 5'},
    {id: 6, ward: 'Ward 6'},
    {id: 7, ward: 'Ward 7'},
    {id: 8, ward: 'Ward 8'}
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


function Query (gen, eth, age, poi, ward) {
    this.gen = gen;
    this.eth = eth;
    this.age = age;
    this.poi = poi;
    this.ward = ward;
}


function renderSide(lat,lng){
    var googleK = 'AIzaSyDTt2wHwHjSlAd14BarF95r7GCfxPUKD84',
        gooURL = 'https://maps.googleapis.com/maps/api/streetview?size=500x150&location='+lat+','+lng+'&key='+googleK;
    $('#sRImg').attr('src',gooURL)
}


// clear function
function clear(){
    if(map.getLayer('worship') != null) {
        $("#sideRight").css("right", "-500px");
        $('#sideRContent').empty()
        map.removeLayer('worship')
        map.removeLayer('worship_cluster')
        map.removeSource('worship')
        //visualization.data(dummyD).draw();
        //eduVisualization.data(dummyD).draw();
        //povVisualization.data(dummyD).draw();
        //ageVisualization.data(dummyD).draw();
        //ethVisualization.data(dummyD).draw();
        //makeGraphs();
    }
}

//clear button
$( "#clearBtn" ).click(function() {
    clear()
    genControl.clear(),
    ethControl.clear(),
    ageControl.clear(),
    poiControl.clear(),
    wardControl.clear()
});

var global;
var gquery;
var ll;
//render button
$( "#goBtn" ).click(function() {
    clear();
    var query = new Query(
        genControl.getValue(),
        ethControl.getValue(),
        ageControl.getValue(),
        poiControl.getValue(),
        wardControl.getValue()
    );
    //console.log(query)
    gquery = query
    $.getJSON( "data/worship.json", function( data ) {
        var placeholder = [];
        var n=0;

        $.each(data.features,function(index, value) {
            var check = true
            if(query.eth != ""){
                if(value.properties.bayeswhite>.5 && query.eth!="2" ){
                    check = false
                }
                if(value.properties.bayesblack>.5 && query.eth!="1" ){
                    check = false
                }
            }
            if(query.gen != ""){
                if(value.properties.malevfemal>.5 && query.gen!="1" ){
                    check = false
                }
                if(value.properties.malevfemal<.5 && query.gen!="2" ){
                    check = false
                }
            }
            if(query.age != ""){
                if(value.properties.bayseagege <= 30 && query.age!="1"){
                    check = false
                }
                if(value.properties.bayseagege>30 && value.properties.bayseagege<=40 && query.age!="2" ){
                    check = false
                }
                if(value.properties.bayseagege>40 && query.age!="3" ){
                    check = false
                }
            }
            if(query.poi.length != 0){
                var lLookup = {
                        "1":"Center",
                        "2":"Capital Bike Share",
                        "3":"Grocery Stores",
                        "4":"Metro Station",
                        "5":"Places of Worship",
                        "6":"Recreation Fields",
                        "7":"Companies",
                        "8":"Universities"
                    };
                ll = lLookup;

                for(i in lLookup){
                    if(value.properties.Type==lLookup[i] && query.poi.indexOf(i) == -1 ){
                        check = false
                    }
                }
            }

            if(query.ward.length != 0) {
                //if (value.properties.WARD_ID != '1' && query.ward.indexOf("1") > -1) {
                //    check = false
                //}
                var lLookup = {
                    "1":"Ward 1",
                    "2":"Ward 2",
                    "3":"Ward 3",
                    "4":"Ward 4",
                    "5":"Ward 5",
                    "6":"Ward 6",
                    "7":"Ward 7",
                    "8":"Ward 8",
                };

                for(i in lLookup){
                    if(value.properties.LABEL==lLookup[i] && query.ward.indexOf(i) == -1 ){
                        check = false
                    }
                }

            }

            if($("#menCheck").is(':checked')){
                if(value.properties.mentorhot1<0){
                    check=false
                }
            }
            if($("#schCheck").is(':checked')){
                if(value.properties.scholarHOT<0){
                    check=false
                }
            }
            if($("#highCheck").is(':checked')){
                if(value.properties.msDIff1<0){
                    check=false
                }
            }

            if(check == true){
                placeholder[n] = data.features[index];
                n+=1;
            }



        });

        delete data.features;
        data.features = placeholder;
        //console.log(data)

        global = data;
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
            try{
                $('#sideRContent').empty(); var clusterFeatures = map.queryRenderedFeatures(e.point, { layers: ['worship_cluster'] });
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
                    var props = JSON.parse(feature.properties.Properties)


                    // recommendation logic
                    //console.log(feature.properties)

                    var recBlurb,
                        ageBlurb,
                        genBlurb,
                        menBlurb,
                        schBlurb,
                        demBlurb;


                    console.log(feature)
                    if(feature.properties.bayesblack > feature.properties.bayeswhite){
                        if(feature.properties.bayesblack>0.5){
                            recBlurb = "Our model predicts that this location will be most successful in recruiting black mentors."
                        } else {
                            recBlurb = "This location isn't a strong predictor of any one race, but the model leans slightly more favorably in recruiting black mentors."
                        }
                    } else {
                        if(feature.properties.bayeswhite>0.5){
                            recBlurb = "Our model predicts that this location will be most successful in recruiting white mentors."
                        } else {
                            recBlurb = "This location isn't a strong predictor of any one race, but the model leans slightly more favorably in recruiting white mentors."
                        }
                    }
                    if(feature.properties.malevfemal<.5){
                        genBlurb = " We're estimating that mentors from this area will probably be women"
                    } else {
                        genBlurb = " We're estimating that mentors from this area will probably be men"
                    }

                    recBlurb = recBlurb + genBlurb;

                    if(feature.properties.bayseagege<30){
                        ageBlurb = "the under 30 crowd"
                    } else if(feature.properties.bayseagege>=40){
                        ageBlurb = "folks over 40 as well as retirees"
                    } else {
                        ageBlurb = "mid-career folks in their 30's"
                    }

                    recBlurb = recBlurb + " and from our model, we're predicting that you'll have the greatest success recruiting "+ageBlurb+".";


                    if(feature.properties.mentorhot1<2.3){
                        menBlurb = "</p><p>In terms of the supply side of things, from our historic data we've had little success recruiting mentors who live near here."

                    } else if(feature.properties.mentorhot1<5.2){
                        menBlurb = "</p><p>In terms of the supply side of things, from our historic data we've had some success recruiting mentors who live near here."

                    } else if(feature.properties.mentorhot1<5.2){
                        menBlurb = "</p><p>In terms of the supply side of things, from our historic data we've had a lot of success recruiting mentors who live near here."
                    } else if(feature.properties.mentorhot1>8.1){
                        menBlurb = "</p><p>In terms of the supply side of things, from our historic data we've been extremely successful in recruiting mentors who live near here."
                    }

                    recBlurb = recBlurb+menBlurb;

                    if(feature.properties.scholarHOT < .47){
                        schBlurb = " As for the demand, we've had relatively few scholars living near this location."

                    } else if(feature.properties.scholarHOT < 3.2){
                        schBlurb = " As for the demand, we've had a moderate number of scholars living near this location."

                    } else if(feature.properties.scholarHOT > 3.2){
                        schBlurb = " As for the demand, we've had a relatively high number of scholars living near this location."
                    }

                    recBlurb = recBlurb + schBlurb;

                    if(feature.properties.msDIff1 < 0){
                        demBlurb = " </p><p>Overall, we're predicting that we have strong mentor representation in this area."

                    } else {
                        demBlurb = " </p><p>Overall, this is an area where we have more scholars than mentors and improving our presence in this area would be beneficial."
                    }

                    recBlurb = recBlurb + demBlurb


                    //$('#recs').append("<h5>Predicted Target Ethnicity</h5><p>"+recBlurb+"</p>")
                    $('#recs').empty()
                    $( "<div/>", {
                        "class": "my-new-list",
                        html: "<p>"+recBlurb+"</p>"
                    }).appendTo( "#recs" );

                    //$('#sideRTitle').text(feature.properties.NAME);
                    var sV = 'http://maps.google.com/maps?q=&layer=c&cbll='+ e.lngLat.lat+','+ e.lngLat.lng
                    $('#sideRTitle').text(props.Name);
                    var attrList = [];
                    for(i in props){
                        if(i == "Website" || i == "url" && props[i]!=""){
                            if(props[i].search("www")!=-1 || props[i].search("http")!=-1){
                                //attrList.push("<div><a target='_blank' href='" + props[i]+"'>Website</a></div>")
                                attrList.push("<a target='_blank' href='" + props[i] + "'><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-globe' aria-hidden='true'></span> Website</div></a><br>")
                            }
                        } else if(i == "Address" || i == "address" && props[i]!="") {

                            //var gAd = 'https://www.google.com/maps/place/'+props[i]
                            var gAd = 'https://www.google.com/maps/dir/Current+Location/'+props[i]
                            attrList.push("<a target='_blank' href='" + gAd + "'><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-map-marker' aria-hidden='true'></span> "+props[i]+"</div></a><br>")

                            var pAd = 'http://en.parkopedia.com/parking/'+props[i]+', Washington DC'
                            attrList.push("<a target='_blank' href='" + pAd + "'><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-road' aria-hidden='true'></span> Nearby Parking</div></a><br>")
                        }
                        else if(i == 'Phone' || i == 'tel') {
                            //attrList.push("<div><a target='_blank' href='tel:" + props[i]+"'>Phone</a></div>")
                            attrList.push("<a target='_blank' href='tel:" + props[i] + "'><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-earphone' aria-hidden='true'></span> "+props[i]+"</div></a><br>")
                        }
                        else if(i == 'Religion') {
                            //attrList.push("<div><a target='_blank' href='tel:" + props[i]+"'>Phone</a></div>")
                            attrList.push("<a><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-home' aria-hidden='true'></span> "+props[i]+"</div></a><br>")
                        }
                        else if(i == 'Line') {
                            //attrList.push("<div><a target='_blank' href='tel:" + props[i]+"'>Phone</a></div>")
                            var lColor = props[i].split(', ')
                            var mColorDivs = '';
                            for(i in lColor){
                                if(lColor[i]=='yellow'){
                                    mColorDivs = mColorDivs+'<div style="color:black;background-color:'+lColor[i]+';text-transform:uppercase;padding:5px;flex-grow:1">'+lColor[i]+'</div>'
                                } else {
                                    mColorDivs = mColorDivs+'<div style="background-color:'+lColor[i]+';text-transform:uppercase;padding:5px;flex-grow:1">'+lColor[i]+'</div>'
                                }
                            }
                            //attrList.push("<a><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-home' aria-hidden='true'></span> "+props[i]+"</div></a><br>")
                            attrList.push("<a><div class='demo-card-wide mdl-shadow--2dp' style='background-color:white;color:green'>Metro Services</span><div class='text-center' style='color:white;margin:10px;display:flex;justify-content:center'>"+mColorDivs+"</div></div></a><br>")
                        }
                        //else if(i != 'Name') {
                        //    attrList.push("<div>" + i+": "+ props[i] + "</div>")
                        //}
                    }
                    attrList.push("<a href='"+sV+"' target='_blank'><div class='demo-card-wide mdl-shadow--2dp'><span class='glyphicon glyphicon-picture' aria-hidden='true'></span> StreetView</div></a><br>")

                    $( "<div/>", {
                        "class": "addInfo-list",
                        html: attrList.join( "" )
                    }).appendTo( "#sideRContent" );
                    renderSide(feature.geometry.coordinates[1],feature.geometry.coordinates[0])


                    // ward info section
                    $('#wTitle').empty()
                    $('#wTitle').text(feature.properties.LABEL + ' Rep');
                    var rHeadimg = 'images/'+feature.properties.LABEL+'.jpg';
                    document.getElementById("rHead").src=rHeadimg;

                    $('#wInfo').empty()
                    var wardData = '<div>' +
                            '<b style="font-size:1.5em">'+feature.properties.REP_NAME+'</b>' +
                            '<p><a href="tel:'+feature.properties.REP_PHONE+'"><span class="glyphicon glyphicon-phone" aria-hidden="true" style="margin-right:5px"></span>'+feature.properties.REP_PHONE+'</a><br>' +
                            '<a href="mailto:'+feature.properties.REP_EMAIL+'"><span class="glyphicon glyphicon-envelope" aria-hidden="true" style="margin-right:5px"></span>'+feature.properties.REP_EMAIL+'</a></p>' +
                            //'<li>Address: '+feature.properties.REP_OFFICE+'</li>' +
                        '</div>'

                    $( "<div/>", {
                        "class": "addInfo-list",
                        html: wardData
                    }).appendTo( "#wInfo" );


                }


            } catch(err){
                console.log(err)
                $("#sideRight").css("right","-500px");
                map.flyTo({
                    center: [e.lngLat.lng, e.lngLat.lat],
                    zoom: map.style.z+1
                });
                return;


            }

            var lat = feature.geometry.coordinates[1],
                lng = feature.geometry.coordinates[0];

            //console.log(feature)


            var baseURL = 'https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/ACS_5_Year_Socioeconomic_Data_By_Tract_As_of_2012/FeatureServer/0/query?where=STATE+%3D+%2711%27&objectIds=&time=&geometry=%7B%22x%22%3A'+lng+'%2C%22y%22%3A'+lat+'%7D%0D%0A+&geometryType=esriGeometryPoint&inSR=%7B%22wkid%22+%3A+4326%7D&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token='

            $.getJSON( baseURL, function( data ) {
                //console.log(data.features[0].properties);
                $('#socio').empty();
                var shead = ['<tr><th>Field</th><th>Description</th></tr>'];
                var sdata = [];
                //travel vars
                var tLook = ["B08303_30MINUS_TTW_PCT","B08303_30TO59_TTW_PCT","B08303_60PLUS_TTW_PCT"];
                var travel = [];
                // poverty vars
                //var pLook = ["B08303_30MINUS_TTW","B08303_30TO59_TTW","B08303_60PLUS_TTW"];
                //var pLook = ["B19001_LT15","B19001_15TO25","B19001_25TO35","B19001_35TO45","B19001_45TO60","B19001EST12","B19001EST13","B19001EST14","B19001EST15","B19001_GT150"]
                var pLook = ["B19001_LT15_PCT","B19001_15TO25_PCT","B19001_25TO35_PCT","B19001_35TO45_PCT","B19001_45TO60_PCT","B19001EST12_PCT","B19001EST13_PCT","B19001EST14_PCT","B19001EST15_PCT","B19001_GT150_PCT"]
                var poverty = [];
                // education vars
                //var eLook = ["B20004EST2","B20004EST3","B20004EST4","B20004EST5","B20004EST6"];
                var eLook = ["B23006EST13_PCT","B23006EST20_PCT","B23006EST27_PCT","B23006EST6_PCT"];
                //{"Field":"B23006EST13","Alias":"Population ages 25 to 64 Civilian Employed having High School Graduate education"},
                //{"Field":"B23006EST20","Alias":"Population ages 25 to 64 Civilian Employed having Some College or Associate's Degree"},
                //{"Field":"B23006EST27","Alias":"Population ages 25 to 64 Civilian Employed having Bachelor's degree or higher"},
                //{"Field":"B23006EST6","Alias":"Population ages 25 to 64 Civilian Employed having Less than High School education"},

                var education = [];

                //console.log(travel)

                $.each(data.features[0].properties,function(index, value) {
                    $.each(socio,function(si, sv) {
                        if(socio[si].Field==index){
                            //sdata.push("<li>" + socio[si].Alias+" = "+ value + "</li>")
                            sdata.push("<tr><td>" + socio[si].Alias+"</td><td>"+ value + "</td></tr>")
                            if($.inArray(socio[si].Field, tLook) > -1){
                                travel.push({"groups":socio[si].Alias, "name": "Workers", "total count":value})
                                //travel.push(value)
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
                //$( "<thead/>", {
                //    "class": "socioTable",
                //    html: shead.join( "" )
                //}).appendTo( "#socio" );
                //$( "<tbody/>", {
                //    "class": "socioTable",
                //    html: sdata.join( "" )
                //}).appendTo( "#socio" );

                chComm.load({
                    json: travel,
                    keys: {
                        value: ['total count']
                    }
                });
                chEdu.load({
                    json: education,
                    keys: {
                        value: ['total count']
                    }
                });
                chPov.load({
                    json: poverty,
                    keys: {
                        value: ['total count']
                    }
                });
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
                            //ddata.push("<li>" + demo[si].Alias+" = "+ value + "</li>")
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
                //ageVisualization.data(ages).draw();

                chEth.load({
                    json: ethnicity,
                    keys: {
                        value: ['total count']
                    }
                });
                chAge.load({
                    json: ages,
                    keys: {
                        value: ['total count']
                    }
                });
                //ethVisualization.data(ethnicity).draw();
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
    if(window.innerWidth <= 500){
        $('.sidebar').css('left','-500px')
    };

});

//window.onload = function(){
//
//}


makeGraphs();


function makeGraphs(){
//travel graph
//    visualization = d3plus.viz()
//        .container("#viz")
//        .data(dummyD)
//        .type("bar")
//        .order({
//            "value":"name"
//        })
//        .id("name")
//        .x("groups")
//        .y("total count")
//        //.background("rgba(0,0,0,0)")
//
//    eduVisualization = d3plus.viz()
//        .container("#vizEDU")
//        .data(dummyD)
//        .type("bar")
//        .order({
//            "value":"name"
//        })
//        .id("name")
//        .x("groups")
//        .y("total count")
//        //.background("rgba(0,0,0,0)")
//
//    povVisualization = d3plus.viz()
//        .container("#vizPOV")
//        .data(dummyD)
//        .type("bar")
//        .order({
//            "value":"name"
//        })
//        .id("name")
//        .x("groups")
//        .y("total count")
//        //.background("rgba(0,0,0,0)")
//
//    ageVisualization = d3plus.viz()
//        .container("#vizAGE")
//        .data(dummyD)
//        .type("bar")
//        .order({
//            "value":"name"
//        })
//        .id("name")
//        .x("groups")
//        .y("total count")
//        //.background("rgba(0,0,0,0)")
//
//    ethVisualization = d3plus.viz()
//        .container("#vizETH")
//        .data(dummyD)
//        .type("bar")
//        .order({
//            "value":"name"
//        })
//        .id("name")
//        .x("groups")
//        .y("total count")
//        //.background("rgba(0,0,0,0)")

}

var barWidth;
if(window.innerWidth <= 500){
    barWidth = window.innerWidth-50
} else {
    barWidth = 448
}

var dummyD = [
    {"groups":"Less than 30 minutes","name":"Workers","total count":1306},
    {"groups":"30 to 59 minutes","name":"Workers","total count":1092},
    {"groups":"60 or more minutes","name":"Workers","total count":107}
];
var EdummyD = [
    {"groups":"Less than High School","name":"Residents","total count":null},
    {"groups":"High school graduate","name":"Residents","total count":null},
    {"groups":"Some college or associate's","name":"Residents","total count":57986},
    {"groups":"Bachelor's or higher","name":"Residents","total count":63720},
    {"groups":"Graduate or professional degree","name":"Residents","total count":131515}
];
var PdummyD = [
    {"groups":"<$14k","name":"Workers","total count":68},
    {"groups":"$15k-$24k","name":"Workers","total count":14},
    {"groups":"$25k-$34k","name":"Workers","total count":58},
    {"groups":"$35k-$44k","name":"Workers","total count":48},
    {"groups":"$45k-$59k","name":"Workers","total count":90},
    {"groups":"$60k-$74k","name":"Workers","total count":77},
    {"groups":"$75k-$99k","name":"Workers","total count":83},
    {"groups":"$100k-$124k","name":"Workers","total count":161},
    {"groups":"$125k-$149k","name":"Workers","total count":139},
    {"groups":"$150k+","name":"Workers","total count":1349}
];
var EthdummyD = [
    {"groups":"White","name":"Population","total count":4689},
    {"groups":"Black","name":"Population","total count":781},
    {"groups":"Asian","name":"Population","total count":151},
    {"groups":"Hispanic","name":"Population","total count":276},
    {"groups":"Other","name":"Population","total count":169}
];
var AdummyD = [
    {"groups":"18 to 24","name":"Population","total count":155},
    {"groups":"25 to 34","name":"Population","total count":413},
    {"groups":"35 to 44","name":"Population","total count":712},
    {"groups":"45 to 64","name":"Population","total count":1901},
    {"groups":">65","name":"Population","total count":1294}
];

var chComm = c3.generate({
    bindto: '#chComm',
    data: {
        json: dummyD,
        keys: {
            x: 'groups', // it's possible to specify 'x' when category axis
            value: ['total count']
        },
        type: 'bar',
        colors: {
            'total count':'#6fbb44'
        }
    },
    axis: {
        x: {
            type: 'category'
        },
        y: {
            tick: {
                format: function(d){
                    //d3.format(",%")
                    return d+"%"
                }
            }
        }
    },
    bar: {
        width: {
            ratio: .8
        }
    },
    legend: {
        show: false
    },
    size: {
        width: barWidth
    }
});

var chEdu = c3.generate({
    bindto: '#chEdu',
    data: {
        json: EdummyD,
        keys: {
            x: 'groups', // it's possible to specify 'x' when category axis
            value: ['total count']
        },
        type: 'bar',
        colors: {
            'total count':'#6fbb44'
        }
    },
    axis: {
        x: {
            type: 'category'
        },
        y: {
            tick: {
                format: function(d){
                    //d3.format(",%")
                    return d+"%"
                }
            }
        }
    },
    bar: {
        width: {
            ratio: .8
        }
    },
    legend: {
        show: false
    },
    size: {
        width: barWidth
    }
});

var chPov = c3.generate({
    bindto: '#chPov',
    data: {
        json: PdummyD,
        keys: {
            x: 'groups', // it's possible to specify 'x' when category axis
            value: ['total count']
        },
        type: 'bar',
        colors: {
            'total count':'#6fbb44'
        }
    },
    axis: {
        x: {
            type: 'category'
        },
        y: {
            tick: {
                format: function(d){
                    //d3.format(",%")
                    return d+"%"
                }
            }
        }
    },
    bar: {
        width: {
            ratio: .8
        }
    },
    legend: {
        show: false
    },
    size: {
        width: barWidth
    }
});

var chEth = c3.generate({
    bindto: '#chEth',
    data: {
        json: EthdummyD,
        keys: {
            x: 'groups', // it's possible to specify 'x' when category axis
            value: ['total count']
        },
        type: 'bar',
        colors: {
            'total count':'#6fbb44'
        }
    },
    axis: {
        x: {
            type: 'category'
        }
    },
    bar: {
        width: {
            ratio: .8
        }
    },
    legend: {
        show: false
    },
    size: {
        width: barWidth
    }
});

var chAge = c3.generate({
    bindto: '#chAge',
    data: {
        json: AdummyD,
        keys: {
            x: 'groups', // it's possible to specify 'x' when category axis
            value: ['total count']
        },
        type: 'bar',
        colors: {
            'total count':'#6fbb44'
        }
    },
    axis: {
        x: {
            type: 'category'
        }
    },
    bar: {
        width: {
            ratio: .8
        }
    },
    legend: {
        show: false
    },
    size: {
        width: barWidth
    }
});

map.on('load', function () {
    $('#loader').fadeOut()
});

$( window ).resize(function() {
    if(window.innerWidth > 500){
        $('.sidebar').css('left','0')
    };
});
