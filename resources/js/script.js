let longitude = 6.130578;
let latitude = 49.611205;

//different language support
$(document).ready(function(){
    $(".languageButton").click(function(){
        switchLanguage(this.id);
    });
});

function switchLanguage(language) {
    $.ajax({
        url: 'js/json/' + language + '.json',
        dataType: 'json', async: false
    }).done(function (lang) {
        
        console.log(lang);
    })
}


checkInputSearch();
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
//this function has been taken from the https://www.codegrepper.com/code-examples/javascript/haversine+formula+javascript
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

// display the time in the filter select
$(document).ready(function(){
    let output = "<option selected disabled>??:??</option>";
    horraire.forEach(value => {
        output += "<option>" + value + "</option>";
    });
    $("#startTime").html(output);
});

$("#startTime").change(function () {
    //console.log(this.value);
    let value = this.value;
    let index = horraire.indexOf(value);
    let output = "<option selected disabled>??:??</option>";
    for (let i = index; i < horraire.length; i++) {
        const element = horraire[i];
        output += "<option>" + element + "</option>";
        //console.log(element);
    }
    $("#endTime").html(output);
    checkInputSearch(value, "19:00");
});
// end of display time in the filter select

$("#endTime").change(function () {
    //console.log(this.value);
    let valueSelect1 = $("#startTime").val();
    let value = this.value;
    checkInputSearch(valueSelect1, value);
});

// if clicking enter in the input field search field, to trigger the button to-do the research
$('#inputFieldSearch').keyup(function (e) {
    if (e.keyCode == 13) {
        $(".searchIcon").click();
    }
});

// slider that should display the distance 
$(".sliderDistance").on("change mousemove", function () {
    $("#distanceValueDisplay").html(this.value);
});

//reset button
$(".resetDefault").click(function(){
    $("#inputFieldSearch").val('');
    $("#checkBoxEmptied").prop( "checked", false );
    $(".sliderDistance").val("5");
    $("#distanceValueDisplay").html("5");
    $("#startTime").val("??:??").change();
    $("#endTime").val("??:??").change();
});

// check box for emptied yet
$("#checkBoxEmptied").click(function(){
    let isChecked = $(this)[0].checked;
    if (isChecked) {
        let currentTime = new Date();
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        if (minute < 30) {
            minute = 30;
        }
        if (minute > 30) {
            minute = "00";
        }

        if (hour > 19 || hour < 7) {
            hour = 7;
            minute = 0;
        }

        let endTime = "";
        if (hour < 10) {
            endTime = "0" + hour;
        }else{
            endTime += hour;
        }

        endTime += ":" + minute;
        checkInputSearch(endTime, "19:00");
        $("#startTime").val(endTime).change();
    }else{
        checkInputSearch("07:30", "19:00");
        $("#startTime").val("??:??").change();
    }
});

// distance slider
let kmDistance = "5";
$(".sliderDistance").on("change", function () {
    if(kmDistance != this.value) {
        let startingTime = "07:30";
        let endingTime = "19:00";
        let valueSelect1 = $("#startTime").val();
        if (valueSelect1 !== null) {
            startingTime = valueSelect1;
            let valueSelect2 = $("#endTime").val();
            if (valueSelect2 !== null) {
                endingTime = valueSelect2;
            }
        }
        checkInputSearch(startingTime, endingTime, this.value);
        kmDistance = this.value;
    }
});

// for the mobile version, map only or list only view
let check = true;
$(".showMapButton").click(function () {
    if (check) {
        $("main").css("grid-template-columns", "minmax(376px,100%) 0%");
        check = false;
    } else {
        $("main").css("grid-template-columns", "0% minmax(376px,100%)");
        check = true;
    }
});

// if clicking on a location on the list, open it and display more information
let checkListLocation = true;
let firstRun = true;
let count = 0;
$(".showListTowns").click(function () {
    if (checkListLocation && firstRun) {
        $(this).css({ "background-color": "#002641", "color": "white" });
        checkListLocation = false;
        firstRun = false;
        $(".list_location_all").hide();
        $(".descriptionText").html(" Filter by Town");
        $.getJSON("http://127.0.0.1:8000/api/cities", function (data) {
            //console.log(data);
            let output = "<div class='filterTownDiv'><table style='width: 100%'>";
            output += "<tr><td style='width: 25%'></td><td style='width: 50%'>Select all:</td><td style='width: 25%'><input type='checkbox' id='checkBoxSelectAll'></td></tr>";
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element["city"] == "LUXEMBOURG") {
                    output += "<tr><td></td><td>" + element["city"] + "</td><td><input type='checkbox' class='townCheckBox' id='checkBoxIdCity_" + element["idCity"] + "' value='" + element["city"] + "' checked></td></tr>";
                } else {
                    output += "<tr><td></td><td>" + element["city"] + "</td><td><input type='checkbox' class='townCheckBox' id='checkBoxIdCity_" + element["idCity"] + "' value='" + element["city"] + "'></td></tr>";
                }
            }
            output += "</table></div>";
            $(".filterByTownContent").html(output);

            $("#checkBoxSelectAll").click(function () {
                if (this.checked) {
                    $(".townCheckBox").prop("checked", true);
                } else {
                    $(".townCheckBox").prop("checked", false);
                }
                let towns = "";
                $(".townCheckBox:checkbox:checked").each(function () {
                    //console.log(this.value);
                    towns += this.value + ",";
                });
                if (towns != "") {
                    displayPins(towns);
                    showLocationList(towns);
                } else {
                    clearMap();
                }
            });

            $(".townCheckBox").click(function () {
                if ($(".townCheckBox:checkbox:checked").length >= data.length) {
                    $("#checkBoxSelectAll").prop("checked", true);
                } else {
                    $("#checkBoxSelectAll").prop("checked", false);
                }
                let towns = "";
                $(".townCheckBox:checkbox:checked").each(function () {
                    //console.log(this.value);
                    towns += this.value + ",";
                });

                if (towns != "") {
                    displayPins(towns);
                    showLocationList(towns);
                } else {
                    clearMap();
                }
            });

        })
    } else if (checkListLocation) {
        $(this).css({ "background-color": "#002641", "color": "white" });
        checkListLocation = false;
        $(".list_location_all").hide();
        $(".filterByTownContent").show();
        $(".descriptionText").html(" Filter by Town");
    } else {
        $(this).css({ "background-color": "", "color": "#002641" });
        checkListLocation = true;
        $(".list_location_all").show();
        $(".filterByTownContent").hide();
        $(".descriptionText").html('<span id="totalBoxLettersFound">' + count + '</span> box letters found</p>');
    }
});

function showLocationList(city, startTime, endTime, distance) {
    // display location from the database
    $.getJSON("http://127.0.0.1:8000/api/boxletter/" + city + "", function (data) {
        //console.log(data);
        let output = "";
        count = 0;
        for (let i = 0; i < data.length; i++) {
            if (startTime !== undefined && startTime !== null) {
                //console.log(horraire.indexOf(startTime));
                let indexStartTime = horraire.indexOf(startTime);
                let indexEndTime = horraire.length;
                if (endTime !== undefined) {
                    indexEndTime = horraire.indexOf(endTime) + 1;
                }
                const element = data[i];
                for (let i = indexStartTime; i < indexEndTime; i++) {
                    let html = `
                    <span class="list_location_all" id="location_`+ element["idBoxLetter"] + `">
                    <div class="list_location_close">
                        <span class="pickupTime">
                        Pickup Time<br>
                        <span class="time">`+ element["pickUpTime"] + `</span>
                        </span>
                        <span class="pickupAddress">
                        Address<br>
                        <span class="address">`+ element["street"] + ` <br>L-` + element["postal"] + ` ` + element["city"] + `</span>
                        </span>
                        <span class="pickupDistance">
                        Distance<br>
                        <span class="distance">`+ calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2) + ` km</span>
                        </span>
                    </div>
                    <div class="list_location_open" hidden>
                        <table style="width: 100%;border-collapse: collapse;">
                        <tr style="border-bottom: 0.2px solid #9B9B9B">
                            <td style="text-align:center;width: 25%;">
                                <i class="fa-regular fa-clock" style="font-size: 30px"></i>
                            </td>
                            <td>
                                <span style="font-size: 35px;">`+ element["pickUpTime"] + `</span>
                            </td>
                        </tr>
                        <tr style="border-bottom: 0.2px solid #9B9B9B">
                            <td style="text-align: center;">
                                <i class="fa-solid fa-map-location-dot" style="font-size: 30px"></i>
                            </td>
                            <td>
                                <span style="font-size: 18px;line-height: 18px;font-family: RajdhaniRegular;"><p>`+ element["street"] + `</p><p>L-` + element["postal"] + ` ` + element["city"] + `</p></span>
                            </td>
                        </tr>
                        <tr style="border-bottom: 0.2px solid #9B9B9B">
                            <td style="text-align: center;">
                                <i class="fa-solid fa-location-arrow" style="font-size: 30px"></i>
                            </td>
                            <td>
                                <span>`+ calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2) + ` km</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' style="text-align:center;">
                                <button class="directionButton" style="width: 60%; font-size: 20px;margin-top:5px;" >Direction</button>
                            </td>
                        </tr>
                        </table></div></span>`;
                    //console.log(horraire[i]);
                    if (distance == undefined){
                        if (element["pickUpTime"] == horraire[i]) {
                            count++;
                            output += html;
                        }
                    }else{
                        if (element["pickUpTime"] == horraire[i]) {
                            if (parseFloat(calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2))<=parseInt(distance)) {
                                count++;
                                output += html;
                            }
                        }
                    }
                }

            } else {
                count++;
                const element = data[i];
                output += `
                        <span class="list_location_all" id="location_`+ element["idBoxLetter"] + `">
                        <div class="list_location_close">
                            <span class="pickupTime">
                            Pickup Time<br>
                            <span class="time">`+ element["pickUpTime"] + `</span>
                            </span>
                            <span class="pickupAddress">
                            Address<br>
                            <span class="address">`+ element["street"] + ` <br>L-` + element["postal"] + ` ` + element["city"] + `</span>
                            </span>
                            <span class="pickupDistance">
                            Distance<br>
                            <span class="distance">`+ calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2) + ` km</span>
                            </span>
                        </div>
                        <div class="list_location_open" hidden>
                            <table style="width: 100%;border-collapse: collapse;">
                            <tr style="border-bottom: 0.2px solid #9B9B9B">
                                <td style="text-align:center;width: 25%;">
                                    <i class="fa-regular fa-clock" style="font-size: 30px"></i>
                                </td>
                                <td>
                                    <span style="font-size: 35px;">`+ element["pickUpTime"] + `</span>
                                </td>
                            </tr>
                            <tr style="border-bottom: 0.2px solid #9B9B9B">
                                <td style="text-align: center;">
                                    <i class="fa-solid fa-map-location-dot" style="font-size: 30px"></i>
                                </td>
                                <td>
                                    <span style="font-size: 18px;line-height: 18px;font-family: RajdhaniRegular;"><p>`+ element["street"] + `</p><p>L-` + element["postal"] + ` ` + element["city"] + `</p></span>
                                </td>
                            </tr>
                            <tr style="border-bottom: 0.2px solid #9B9B9B">
                                <td style="text-align: center;">
                                    <i class="fa-solid fa-location-arrow" style="font-size: 30px"></i>
                                </td>
                                <td>
                                    <span>`+ calcCrow(element["normalCoordinates"].split(",")[1], element["normalCoordinates"].split(",")[0], latitude, longitude).toFixed(2) + ` km</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2' style="text-align:center;">
                                    <button class="directionButton" style="width: 60%; font-size: 20px;margin-top:5px;" >Direction</button>
                                </td>
                            </tr>
                            </table></div></span>`;
            }
        }
        $(".list_lo").html(output);
        $("#totalBoxLettersFound").html(count);
        // when clicking on a location display
        $(".list_location_all").click(function () {
            if ($("#" + this.id + " .list_location_close").css('display') != 'none') {
                $(".list_location_open").hide();
                $(".list_location_close").show();
                $("#" + this.id + " .list_location_close").hide();
                $("#" + this.id + " .list_location_open").show("slow");
            }
        });
    });
}



function success(position) {
    $.getJSON("https://apiv3.geoportail.lu/geocode/reverse?lon=" + position.coords.longitude + "&lat=" + position.coords.latitude, function (data) {
        //console.log(data["results"][0]);
        const arrayAddress = data["results"][0];
        let output = arrayAddress["number"] + ", " + arrayAddress["street"] + " L-" + arrayAddress["postal_code"] + " " + arrayAddress["locality"];
        $("#inputFieldSearch").val(output);
        displayPins(arrayAddress["locality"]);
        showLocationList(arrayAddress["locality"]);
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        displayMyPosition(position.coords.longitude, position.coords.latitude);
    })
}

$(".pinSearchIconBar").click(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});


$(".searchIcon").click(function () {
    checkInputSearch();
});

function checkInputSearch(startTime, endTime, distance) {
    let inputValue = $("#inputFieldSearch").val();
    if (distance !== "") {
        if (inputValue !== "") {
            $.getJSON("https://apiv3.geoportail.lu/geocode/search?queryString=" + inputValue, function (data) {
                //console.log(data["results"][0]["AddressDetails"]["locality"]);
                const address = data["results"][0]["name"];
                $("#inputFieldSearch").val(address);
                longitude = data["results"][0]["geomlonlat"]["coordinates"][0];
                latitude = data["results"][0]["geomlonlat"]["coordinates"][1];
    
                //console.log(latitude);
    
                showLocationList(data["results"][0]["AddressDetails"]["locality"], startTime, endTime, distance)
                displayPins(data["results"][0]["AddressDetails"]["locality"], startTime, endTime, distance)
                displayMyPosition(longitude, latitude);
            })
        }else{
            showLocationList("Luxembourg", startTime, endTime, distance)
            displayPins("Luxembourg", startTime, endTime, distance);
            displayMyPosition(longitude, latitude);
        }
    }else if (inputValue !== "") {
        $.getJSON("https://apiv3.geoportail.lu/geocode/search?queryString=" + inputValue, function (data) {
            //console.log(data["results"][0]["AddressDetails"]["locality"]);
            const address = data["results"][0]["name"];
            $("#inputFieldSearch").val(address);
            longitude = data["results"][0]["geomlonlat"]["coordinates"][0];
            latitude = data["results"][0]["geomlonlat"]["coordinates"][1];

            //console.log(latitude);

            showLocationList(data["results"][0]["AddressDetails"]["locality"], startTime, endTime)
            displayPins(data["results"][0]["AddressDetails"]["locality"], startTime, endTime)
            displayMyPosition(longitude, latitude);
        })
    } else {
        showLocationList("Luxembourg", startTime, endTime)
        displayPins("Luxembourg", startTime, endTime);
        displayMyPosition(longitude, latitude);
    }
}

