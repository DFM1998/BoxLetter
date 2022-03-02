
    <?php
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($cities);
    ?>
    <!--@foreach($cities as $city)
        <div>
            {{ $city->idCity }} {{ $city->city }} 
        </div>
    @endforeach-->