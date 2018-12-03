<?php
    $resources = get_field('resources');
    if($resources){
?>
    <section class="component component-resource-download">
        <div class="resources">
            <ul class="resource-items">

                <?php
                    foreach ($resources as $resource) {

                ?>
                    <li class="resource-item">
                        <?php if($resource['resource_thumbnail']) { ?>
                            <a href="<?= $resource['resource_file']['url'];?>" role="presentation" target="_blank"><img src="<?= $resource['resource_thumbnail']['url'];?>" alt="<?= $resource['resource_thumbnail']['title'];?> thumbnail" title="<?= $resource['resource_thumbnail']['title'];?> thumbnail" class="resource-thumbnail" /><span class="sr-only"><?= $resource['resource_thumbnail']['title'];?> thumbnail</span></a>

                        <?php } ?>
                        <?php if($resource['resource_file']) { ?>
                            <p class="small-text"><a href="<?= $resource['resource_file']['url'];?>" target="_blank"><?= $resource['resource_title'];?></a></p>
                            <a href="<?= $resource['resource_file']['url'];?>" target="_blank" class="button"><?php _e( 'Download', '_isoc' );?></a>
                        <?php } ?>
                    </li>

                <?php
                        } //endforeach
                ?>
            </ul>
        </div>
    </section>
<?php 
    } //endif
?>
