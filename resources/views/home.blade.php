@extends('layouts.app')

@section('content')

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
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="popup">
                        Edit the BoxLetter ID:
                        <div id='alertWarning' class="alert alert-danger" style='display: none; padding: 0; margin-left: 15px;margin-right: 15px;'>All input field needs to be filled out</div>

                        <hr>
                        <table class="table">
                            <tr><td>ID City</td><td><input type="text" id="idInput" disabled></td></tr>
                            <tr><td>City</td><td><input type="text" id="cityInput"></td></tr>
                            <tr><td>Population</td><td><input type="text" id="populationInput"></td></tr>
                            <tr><td><button id='cancelPopup'>Cancel</button></td><td><button id="submitButton">Submit</button></td></tr>
                        </table>
                    </div>
                    <div id="cover"></div>
                    <div id='alertSuccess' class="alert alert-success" style='display: none'>Update has been done successfully</div>
                    <table id="dtBasicExample" class="table table-striped table-bordered table-sm"></table>

                    <script>
                        const obj = { "limit":10 };
                        const dbParam = JSON.stringify(obj);
                        const xmlhttp = new XMLHttpRequest();
                        xmlhttp.onload = function() {
                            myObj = JSON.parse(this.responseText);
                            let text = "<thead><tr><th>ID City</th><th>City</th><th>Population</th><th>Edit/Delete</th></tr></thead><tbody>";
                            console.log(myObj);
                            for (let x in myObj) {
                                text += "<tr><td>"+myObj[x].idCity +"</td><td>"+ myObj[x].city + "</td><td>"+myObj[x].population+"</td><td><button class='editButton' id='"+myObj[x].idCity+"' style='width: 50%;'>Edit</button><button  class='deleteButton' id='"+myObj[x].idCity+"' style='width: 50%;'>Delete</button></td></tr>";
                            }
                            text += "</tbody>";
                            document.getElementById("dtBasicExample").innerHTML = text;

                            $(".deleteButton").click(function(){
                                console.log(this.id);
                                if (confirm("Are you sure that you want to delete the city with the ID " +this.id+" ?") == true) {
                                    console.log("DELETE");
                                }
                            })

                            $(".editButton").click(function(){
                                $.getJSON('api/cities/'+this.id, function(data){
                                    if (data) {
                                        $("#cityInput").val(data[0]["city"]);
                                        $("#populationInput").val(data[0]["population"]);
                                    }
                                });
                                $("#idInput").val(this.id);
                                $(".popup").show();
                                $("#cover").show();
                            });

                            $("#submitButton").click(function(){
                                $("#alertWarning").hide();
                                let idCity = $("#idInput").val();
                                let cityInput = $("#cityInput").val();
                                let populationInput = $("#populationInput").val();
                                
                                if (cityInput != "" && populationInput!= "") {
                                    let stringToSend = idCity + "," + cityInput + "," + populationInput;
                                    $.getJSON('api/cities/updateCity/'+stringToSend, function(data){
                                        if (data) {
                                            $(".popup").hide();
                                            $("#cover").hide();
                                            $("#alertSuccess").show().delay(5000).fadeOut();
                                        }
                                    })
                                }else{
                                    $("#alertWarning").show();
                                }
                            });

                            $("#cancelPopup").click(function(){
                                $(".popup").hide();
                                $("#cover").hide();
                            })
                        };
                        xmlhttp.open("GET", "api/cities/");
                        xmlhttp.send();
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
