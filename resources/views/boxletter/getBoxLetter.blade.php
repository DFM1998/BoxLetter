<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Letters</title>

</head>
<body>
    <h1>Boxletter</h1>
    @foreach($boxletters as $boxletter)
        <div>
            {{ $boxletter->street }} {{ $boxletter->fkCity }} 
        </div>
    @endforeach
</body>
</html>