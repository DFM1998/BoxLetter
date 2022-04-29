// if clicking on the direction button, move the map view to the pin
function buttonDirectionClicked(id) {

    $(".list_location_open").hide();
    $(".list_location_close").show();
    $("#location_" + id + " .list_location_close").hide();
    $("#location_" + id + " .list_location_open").show();

    document.getElementById("location_" + id).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}

// array containg the horraires that should be avaible in the selects
const horraire = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

// display the map
// the design of the map which can be find in the public/map_design.json
let mydata = JSON.parse(data);

// creating the map
let curMap = new lux.Map({
    target: 'map1',
    bgLayer: 'basemap_2015_global',
    bgLayerStyle: mydata,
    zoom: 14,
    position: [76825, 75133],
});


//console.log(curMap);
// display the pin of the current pisiton and move the view to it
function displayMyPosition(x, y) {
    curMap.showMarker(
        {
            position: [x, y],
            positionSrs: 4326,
            positioning: 'center-center',
            iconURL: './images/myPosition.svg',
            click: false
        });

        //console.log(x, y);
        var pin = ol.proj.fromLonLat([x, y]);
        curMap.getView().animate({
            center: pin,
            duration: 1000,
            zoom: 15
        });
}


//function to move the view
function moveView(coordinates) {
    //console.log(coordinates.split(","));
    var pin = ol.proj.fromLonLat([parseFloat(coordinates.split(",")[0]), parseFloat(coordinates.split(",")[1])]);
    curMap.getView().animate({
        center: pin,
        duration: 2000,
        zoom: 18
    });
}

// remove all the exising pins on the map
function clearMap() {
    curMap.getOverlays().clear();
    //console.log(curMap);
}

//displayMyPosition(6.11149,49.61062);
function displayPins(checkOutTowns, startTime, endTime, distance) {
    clearMap();
    // get the pins information and display them on the map
    $.getJSON("http://127.0.0.1:8000/api/boxletter/" + checkOutTowns, function (data) {
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            //console.log(element);
            let coordinates = element["coordinates"].split(",");
            const boxLetterId = element["idBoxLetter"];
            const pickUpTime = element["pickUpTime"];
            const street = element["street"];
            const city = element["city"];
            const postal = element["postal"];
            if (startTime !== undefined) {
                //console.log(horraire.indexOf(startTime));
                let indexStartTime = horraire.indexOf(startTime);
                let indexEndTime = horraire.length;
                if (endTime !== undefined) {
                    indexEndTime = horraire.indexOf(endTime) + 1;
                }
                const element = data[i];
                for (let i = indexStartTime; i < indexEndTime; i++) {
                    //console.log(horraire[i]);
                    if (distance == undefined) {
                        if (element["pickUpTime"] == horraire[i]) {
                            var output = '<div><div style="display: ruby-text;"><i class="fa-regular fa-clock fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left: 10px;"><p class="timePopup">' + pickUpTime + '</p><p class="smallTitle">Pickup time</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin-top:10px;"><div style="display: ruby-text;"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left:10px;"><p class="streetPopup" style="line-height: 12px;">' + street + '<br>L-' + postal + ' ' + city + '</p><p class="smallTitle">Street</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin: auto;border: 0;"><button class="directionButton" id="boxLetter_' + boxLetterId + '" onclick="buttonDirectionClicked(' + boxLetterId + ')">Direction</button></div>'
                            const res = curMap.showMarker(
                                {
                                    position: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
                                    positioning: 'center-center',
                                    iconURL: './images/pin.svg',
                                    click: true,
                                    html: output
                                });
                        }
                    }else{
                        if (element["pickUpTime"] == horraire[i]) {
                            if (element["pickUpTime"] == horraire[i]) {
                                if (parseFloat(calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2))<=parseInt(distance)) {
                                    var output = '<div><div style="display: ruby-text;"><i class="fa-regular fa-clock fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left: 10px;"><p class="timePopup">' + pickUpTime + '</p><p class="smallTitle">Pickup time</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin-top:10px;"><div style="display: ruby-text;"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left:10px;"><p class="streetPopup" style="line-height: 12px;">' + street + '<br>L-' + postal + ' ' + city + '</p><p class="smallTitle">Street</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin: auto;border: 0;"><button class="directionButton" id="boxLetter_' + boxLetterId + '" onclick="buttonDirectionClicked(' + boxLetterId + ')">Direction</button></div>'
                                    const res = curMap.showMarker(
                                        {
                                            position: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
                                            positioning: 'center-center',
                                            iconURL: './images/pin.svg',
                                            click: true,
                                            html: output
                                        });
                                }
                            }
                        }
                    }
        
                }
            } else {
                var output = '<div><div style="display: ruby-text;"><i class="fa-regular fa-clock fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left: 10px;"><p class="timePopup">' + pickUpTime + '</p><p class="smallTitle">Pickup time</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin-top:10px;"><div style="display: ruby-text;"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left:10px;"><p class="streetPopup" style="line-height: 12px;">' + street + '<br>L-' + postal + ' ' + city + '</p><p class="smallTitle">Street</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin: auto;border: 0;"><button class="directionButton" id="boxLetter_' + boxLetterId + '" onclick="buttonDirectionClicked(' + boxLetterId + ')">Direction</button></div>'
                const res = curMap.showMarker({
                        position: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
                        positioning: 'center-center',
                        iconURL: './images/pin.svg',
                        click: true,
                        html: output
                    });
            }
        };
        $(".ol-overlay-container").click(function(){
            console.log(this.id);
        })
    });
    //console.log(curMap);
}
