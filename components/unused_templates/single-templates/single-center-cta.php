                <!-- center cta -->
                <?php if(get_field('center_photo')) { ?>
                    <div class="component-center-cta" style="background-image: url('<?= get_field('center_photo')['url'];?>');">
                        <div class="background-gradient"></div>
                        <div class="content-wrapper">
                            <div class="center-info align-center">
                                <?php 
                                    $centerName = get_field('center_name');
                                    $centerLocation = get_field('center_location');
                                    $centerLink = get_field('center_link');
                                ?>
                                <?php if($centerName){ ?>
                                    <h4 class="sans-serif28 align-center white-text"><?= $centerName;?></h4>
                                <?php } ?> 
                                <?php if($centerLocation){ ?>
                                    <p class="white-text align-center uppercase"><?= $centerLocation;?></p>
                                <?php } ?> 
                                <?php if($centerLink){ ?>
                                    <a class="button button-white" href="<?= $centerLink;?>">See Property</a>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>
                <?php } ?>