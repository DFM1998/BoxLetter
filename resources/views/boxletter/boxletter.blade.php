@extends('layouts.app')

@section('content')
<script>
    function getCities(city){
        let output = "<select id='cityInput'>"
        $.getJSON("api/cities/", function(data){
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    if (city == element["city"]) {
                        output += "<option id='"+element["idCity"]+"' selected>"+element["city"]+"</option>";
                    }else{
                        output += "<option id='"+element["idCity"]+"'>"+element["city"]+"</option>";
                    }
                }
                output += "</select>";
                $("#cityOutput").html(output);
            }
        });
    }

    function pickUpTimeSelect(){
        const horraire = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
        
        let output = "<select id='pickUpTimeInput'>"
        horraire.forEach(value => {
            output += "<option>" + value + "</option>";
        });
        output += "</select>";
        $("#pickUpTimeOutput").html(output);
    }
</script>
<style>
    .popup{
        border: 2px solid grey;
        width: 500px;
        min-height: 200px;
        text-align: center;
        background: #f2f2f2;
        margin: auto;
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
        display:none;
    }
    #cover{
      position:fixed;
      top:0;
      left:0;
      background:rgba(0,0,0,0.6);
      z-index:5;
      width:100%;
      height:100%;
      display: none;
    }
</style>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <button id="buttonInsert">Insert data</button>
                    <br><br>
                    <div class="popup">
                        Edit the BoxLetter ID:
                        <div id='alertWarning' class="alert alert-danger" style='display: none; padding: 0; margin-left: 15px;margin-right: 15px;'>All input field needs to be filled out</div>
                        <hr>
                        <table class="table">
                            <tr><td>ID BoxLetter</td><td><input type="text" id="idInput" disabled></td></tr>
                            <tr><td>Type</td><td><input type="text" id="typeInput"></td></tr>
                            <tr><td>Street</td><td><input type="text" id="streetInput"></td></tr>
                            <tr><td>Postal</td><td><input type="text" id="postalInput"></td></tr>
                            <tr><td>Pickup time</td><td><div id="pickUpTimeOutput"></div></td></tr>
                            <tr><td>Coordinates (EPSG:2169)</td><td><input type="text" id="coordinatesInput"></td></tr>
                            <tr><td>Coordinates</td><td><input type="text" id="normalCoordinatesInput"> <div id="showMapT" style="width: 300px;height:300px;"></div><span id='linkCoordinates'></span></td></tr>
                            <tr><td>City</td><td><div id="cityOutput"></div></td></tr>
                            <tr><td><button id='cancelPopup'>Cancel</button></td><td><button id="submitButton">Submit</button></td></tr>
                        </table>
                    </div>
                    <div id="cover"></div>
                    <div id='alertSuccessDelete' class="alert alert-success" style='display: none'>Delete has been done successfully</div>
                    <div id='alertSuccessInsert' class="alert alert-success" style='display: none'>Insert has been done successfully</div>
                    <div id='alertSuccess' class="alert alert-success" style='display: none'>Update has been done successfully</div>
                    <table id="dtBasicExample" class="table table-striped table-bordered table-sm"></table>

                    <script>
                        let marker;
                        let map;

                        function initMap() {
                            map = new google.maps.Map(document.getElementById("showMapT"), {
                                zoom: 16,
                                streetViewControl: true,
                                center: { lat: 49.611919, lng: 6.131373 },
                            });

                            marker = new google.maps.Marker({
                                map,
                                draggable: true,
                                animation: google.maps.Animation.DROP,
                                position: { lat: 49.611919, lng: 6.131373 },
                            });

                            //console.log(marker);
                            google.maps.event.addListener(marker, 'dragend', function (evt) {
                                $("#normalCoordinatesInput").val(evt.latLng.lng()+","+evt.latLng.lat())
                                $.getJSON("https://apiv3.geoportail.lu/geocode/reverse?lon=" + evt.latLng.lng() + "&lat=" + evt.latLng.lat(), function(data){
                                    console.log(data["results"][0]["geom"]["coordinates"][1]);

                                    $("#coordinatesInput").val(data["results"][0]["geom"]["coordinates"][0]+","+data["results"][0]["geom"]["coordinates"][1]);
                                })
                                map.panTo(evt.latLng);
                            });
                        }


                        function changeMapPinAndView(lat, lng){
                            map.panTo({ lat: lat, lng: lng });
                            marker.setPosition({ lat: lat, lng: lng });
                        }

                        window.initMap = initMap;

                        $("#buttonInsert").click(function(){
                            $(".popup").show();
                            $("#cover").show();
                            getCities();
                            pickUpTimeSelect();

                            $("#idInput").val("");
                            $("#typeInput").val("");
                            $("#streetInput").val("");
                            $("#postalInput").val("");
                            $("#coordinatesInput").val("");
                            $("#normalCoordinatesInput").val("");
                            $("#linkCoordinates").html("");
                            $("#submitButton").click(function(){
                                const typeOfBoxLetter = $("#typeInput").val();
                                const street = $("#streetInput").val();
                                const postal = $("#postalInput").val();
                                const pickUpTime = $("#pickUpTimeInput").val();                                    
                                const coordinates = $("#coordinatesInput").val();
                                const normalCoordinates = $("#normalCoordinatesInput").val();
                                const city = $("#cityInput").children(":selected").attr("id");

                                if (typeOfBoxLetter != "" && street != "" && postal != "" && pickUpTime != "" && coordinates != "" && normalCoordinates !=  "" && city != "") {
                                    console.log("insert");
                                    const dataInsert = typeOfBoxLetter + ";" + street + ";" + pickUpTime + ";" + coordinates + ";" + normalCoordinates + ";" + city + ";" + postal;
                                    $.getJSON("api/boxletter/insertBoxLetter/"+dataInsert, function(data){
                                        if (data) {
                                            $(".popup").hide();
                                            $("#cover").hide();
                                            sessionStorage.setItem("alertWarning", "insert");
                                            location.reload(); 
                                        }
                                    });
                                }else{
                                    $("#alertWarning").show();
                                }
                            })
                        })


                        const obj = { "limit":10 };
                        const dbParam = JSON.stringify(obj);
                        const xmlhttp = new XMLHttpRequest();
                        xmlhttp.onload = function() {
                            myObj = JSON.parse(this.responseText);
                            let text = "<thead><tr><th>ID Boxletter</th><th>Type</th><th>Street</th><th>Postal</th><th>Pickup time</th><th>Coordinates</th><th>idcity->City</th><th>Edit/Delete</th></tr></thead><tbody>";
                            //console.log(myObj);
                            for (let x in myObj) {
                                text += "<tr><td>"+myObj[x].idBoxLetter +"</td><td>"+ myObj[x].typeOfBoxLetter + "</td><td>"+myObj[x].street+"</td><td>"+myObj[x].postal+"</td><td>"+myObj[x].pickUpTime+"</td><td>"+myObj[x].coordinates+"</td><td>"+myObj[x].fkCity+"-> "+myObj[x].city+"</td><td><button class='editButton' id='"+myObj[x].idBoxLetter+"' style='width: 50%;'>Edit</button><button  class='deleteButton' id='"+myObj[x].idBoxLetter+"' style='width: 50%;'>Delete</button></td></tr>";
                            }
                            text += "</tbody>";
                            document.getElementById("dtBasicExample").innerHTML = text;
                            $(".deleteButton").click(function(){
                                //console.log(this.id);
                                if (confirm("Are you sure that you want to delete the letter box with the ID " +this.id+" ?") == true) {
                                    $.getJSON('api/boxletter/deleteBoxLetter/'+this.id, function(){
                                        sessionStorage.setItem("alertWarning", "delete");
                                        location.reload();
                                    })
                                }
                            })

                            $(".editButton").click(function(){
                                $("#alertWarning").hide();
                                $.getJSON("api/boxletter/getById/"+this.id, function(data){
                                    if (data) {
                                        $("#typeInput").val(data[0]["typeOfBoxLetter"]);
                                        $("#streetInput").val(data[0]["street"]);
                                        $("#postalInput").val(data[0]["postal"]);
                                        $("#pickUpTimeInput").val(data[0]["pickUpTime"]);
                                        $("#coordinatesInput").val(data[0]["coordinates"]);
                                        $("#normalCoordinatesInput").val(data[0]["normalCoordinates"]);
                                        var coordinates = data[0]["normalCoordinates"].split(",");
                                        $("#linkCoordinates").html("<a target='_blank' href='http://www.google.com/maps/place/"+coordinates[1]+","+coordinates[0]+"'>Link</a>");
                                        getCities(data[0]["city"]);
                                        pickUpTimeSelect();
                                        $("#pickUpTimeInput").val(data[0]["pickUpTime"]).change();

                                        const coordinatesArray = data[0]["normalCoordinates"].split(",");
                                        changeMapPinAndView(parseFloat(coordinatesArray[1]), parseFloat(coordinatesArray[0]));

                                        $("#submitButton").click(function(){
                                            const boxLetterId = $("#idInput").val();
                                            const typeOfBoxLetter = $("#typeInput").val();
                                            const street = $("#streetInput").val();
                                            const postal = $("#postalInput").val();
                                            const pickUpTime = $("#pickUpTimeInput").val();
                                            const coordinates = $("#coordinatesInput").val();
                                            const normalCoordinates = $("#normalCoordinatesInput").val();
                                            const city = $("#cityInput").children(":selected").attr("id");

                                            if (typeOfBoxLetter != "" && street != "" && postal != "" && pickUpTime != "" && coordinates != "" && normalCoordinates !=  "" && city != "") {
                                                const stringToSend = boxLetterId + ";" + typeOfBoxLetter + ";" + street + ";" + pickUpTime + ";" + coordinates + ";" + normalCoordinates + ";" +  city + ";" +postal;
                                                $.getJSON("api/boxletter/updateBoxLetter/"+stringToSend, function(data){
                                                    if (data) {
                                                        $(".popup").hide();
                                                        $("#cover").hide();
                                                        sessionStorage.setItem("alertWarning", "update");
                                                        location.reload(); 
                                                    }
                                                });   
                                            }else{
                                                $("#alertWarning").show();
                                            }
                                        })
                                    }
                                })
                                //console.log(this.id);
                                $("#idInput").val(this.id);
                                $(".popup").show();
                                $("#cover").show();
                            });

                            $("#cancelPopup").click(function(){
                                $(".popup").hide();
                                $("#cover").hide();
                            })
                        };
                        xmlhttp.open("GET", "api/boxletter/");
                        xmlhttp.send();

                        if (sessionStorage.getItem("alertWarning")) {
                            if(sessionStorage.getItem("alertWarning") == "insert") {
                                $("#alertSuccessInsert").show().delay(5000).fadeOut();
                            }else if(sessionStorage.getItem("alertWarning") == "delete"){
                                $("#alertSuccessDelete").show().delay(5000).fadeOut();
                            }else{
                                $("#alertSuccess").show().delay(5000).fadeOut();
                            }

                            sessionStorage.clear();
                        }

                    </script>
                                        <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBifIMpQ58cSNbj0f-qwY7qCHt_TCBFips&callback=initMap"></script>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
