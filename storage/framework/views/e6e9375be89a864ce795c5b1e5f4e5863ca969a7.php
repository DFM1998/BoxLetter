<?php $__env->startSection('content'); ?>

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
        top: 50%;
        transform: translate(-50%, -50%);
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
                <div class="card-header"><?php echo e(__('Dashboard')); ?></div>

                <div class="card-body">
                    <?php if(session('status')): ?>
                        <div class="alert alert-success" role="alert">
                            <?php echo e(session('status')); ?>

                        </div>
                    <?php endif; ?>
                    <button id="buttonInsert">Insert data</button>
                    <br>
                    <br>
                    <div class="popup">
                        Edit the BoxLetter:
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
                    <div id='alertSuccessDelete' class="alert alert-success" style='display: none'>Delete has been done successfully</div>
                    <div id='alertSuccessInsert' class="alert alert-success" style='display: none'>Insert has been done successfully</div>
                    <div id='alertSuccess' class="alert alert-success" style='display: none'>Update has been done successfully</div>
                    <table id="dtBasicExample" class="table table-striped table-bordered table-sm"></table>

                    <script>
                        $("#buttonInsert").click(function(){
                            $(".popup").show();
                            $("#cover").show();

                            $("#idInput").val("");
                            $("#cityInput").val("");
                            $("#populationInput").val("");
                            $("#submitButton").click(function(){
                                const city = $("#cityInput").val();
                                const population = $("#populationInput").val();

                                if (city != "" && population != "") {
                                    const dataInsert = city + ";" + population ;
                                    $.getJSON("api/cities/insertCity/"+dataInsert, function(data){
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
                            let text = "<thead><tr><th>ID City</th><th>City</th><th>Population</th><th>Edit/Delete</th></tr></thead><tbody>";
                            console.log(myObj);
                            for (let x in myObj) {
                                text += "<tr><td>"+myObj[x].idCity +"</td><td>"+ myObj[x].city + "</td><td>"+myObj[x].population+"</td><td><button class='editButton' id='"+myObj[x].idCity+"' style='width: 50%;'>Edit</button><button  class='deleteButton' id='"+myObj[x].idCity+"' style='width: 50%;'>Delete</button></td></tr>";
                            }
                            text += "</tbody>";
                            document.getElementById("dtBasicExample").innerHTML = text;

                            $(".deleteButton").click(function(){
                                console.log(this.id);
                                if (confirm("Are you sure that you want to delete the city with the ID " +this.id+" ? (This row could affect other data, all the data in a relation is going to be deleted too)") == true) {
                                    $.getJSON('api/cities/deleteCity/'+this.id, function(){
                                        sessionStorage.setItem("alertWarning", "delete");
                                        location.reload();
                                    })
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
                                
                                if (idCity != "" && cityInput != "" && populationInput!= "") {
                                    let stringToSend = idCity + "," + cityInput + "," + populationInput;
                                    $.getJSON('api/cities/updateCity/'+stringToSend, function(data){
                                        if (data) {
                                            $(".popup").hide();
                                            $("#cover").hide();
                                            sessionStorage.setItem("alertWarning", "update");
                                            location.reload(); 
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
                </div>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Applications/MAMP/htdocs/myProject/resources/views/home.blade.php ENDPATH**/ ?>