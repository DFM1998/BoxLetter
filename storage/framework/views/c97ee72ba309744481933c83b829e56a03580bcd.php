
    <?php
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($cities);
    ?>
    <!--<?php $__currentLoopData = $cities; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $city): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div>
            <?php echo e($city->idCity); ?> <?php echo e($city->city); ?> 
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>--><?php /**PATH /Applications/MAMP/htdocs/myProject/resources/views/city/getCities.blade.php ENDPATH**/ ?>