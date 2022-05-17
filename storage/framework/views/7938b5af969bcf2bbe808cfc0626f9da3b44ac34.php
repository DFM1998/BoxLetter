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
    <?php $__currentLoopData = $boxletters; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $boxletter): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div>
            <?php echo e($boxletter->street); ?> <?php echo e($boxletter->fkCity); ?> 
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</body>
</html><?php /**PATH /Applications/MAMP/htdocs/myProject/resources/views/boxletter/getBoxLetter.blade.php ENDPATH**/ ?>