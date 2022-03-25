@extends('layouts.app')

@section('content')

<script>
    $(document).ready(function () {

    });
</script>
<style>
    .popup{
        border: 2px solid grey;
        width: 500px;
        height: 200px;
        text-align: center;
        background: #f2f2f2;
        margin: auto;
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
                    <div class="popup">
                        Edit the BoxLetter ID: 
                    </div>
                    <table id="dtBasicExample" class="table table-striped table-bordered table-sm"></table>

                    <script>
                        const obj = { "limit":10 };
                        const dbParam = JSON.stringify(obj);
                        const xmlhttp = new XMLHttpRequest();
                        xmlhttp.onload = function() {
                            myObj = JSON.parse(this.responseText);
                            let text = "<thead><tr><th>ID Boxletter</th><th>Type</th><th>Street</th><th>Pickup time</th><th>Coordinates</th><th>idcity->City</th><th>Edit/Delete</th></tr></thead><tbody>";
                            console.log(myObj);
                            for (let x in myObj) {
                                text += "<tr><td>"+myObj[x].idBoxLetter +"</td><td>"+ myObj[x].typeOfBoxLetter + "</td><td>"+myObj[x].street+"</td><td>"+myObj[x].pickUpTime+"</td><td>"+myObj[x].coordinates+"</td><td>"+myObj[x].fkCity+"->"+myObj[x].city+"</td><td><button class='editButton' id='"+myObj[x].idBoxLetter+"' style='width: 50%;'>Edit</button><button  class='deleteButton' id='"+myObj[x].idBoxLetter+"' style='width: 50%;'>Delete</button></td></tr>";
                            }
                            text += "</tbody>";
                            document.getElementById("dtBasicExample").innerHTML = text;
                            $(".deleteButton").click(function(){
                                console.log(this.id);
                                if (confirm("Are you sure that you want to delete the letter box with the ID " +this.id+" ?") == true) {
                                    console.log("DELETE");
                                }
                            })
                            $(".editButton").click(function(){
                                console.log(this.id);
                                if (confirm("Are you sure that you want to delete the letter box with the ID " +this.id+" ?") == true) {
                                    console.log("DELETE");
                                }
                            })
                        };
                        xmlhttp.open("GET", "api/boxletter/");
                        xmlhttp.send();
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
