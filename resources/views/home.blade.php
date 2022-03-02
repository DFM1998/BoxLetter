@extends('layouts.app')

@section('content')
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
                    <table id="demo" class="table table-light"></table>

                    <script>
                        const obj = { "limit":10 };
                        const dbParam = JSON.stringify(obj);
                        const xmlhttp = new XMLHttpRequest();
                        xmlhttp.onload = function() {
                        myObj = JSON.parse(this.responseText);
                        let text = "<thead><tr><th>ID City</th><th>City</th><th>Population</th></tr></thead><tbody>";
                        console.log(myObj);
                        for (let x in myObj) {
                            text += "<tr><td>"+myObj[x].idCity +"</td><td>"+ myObj[x].city + "</td><td>"+myObj[x].population+"</td></tr>";
                        }
                        text += "</tbody>";
                        document.getElementById("demo").innerHTML = text;
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
