<!-- single images -->

<section class="component component-story-images">
    <div class="content-wrapper">
        <?php 
            if($this->imageLayout == 'one') {
        ?>
            <div class="one-image">
                <?php 
                    foreach ($this->images as $image) {
                ?>
                    <div class="image-wrapper">
                        <img src="<?= $image['url'];?>" alt="<?= $image['title'];?>" title="<?= $image['title'];?>" />
                    </div>
                <?php } ?>
            </div>            
        <?php } ?>

        <?php 
            if($this->imageLayout == 'two') {
        ?>
            <div class="two-images">
                <?php 
                    foreach ($this->images as $image) {
                ?>
                    <div class="image-wrapper">
                        <img src="<?= $image['url'];?>" alt="<?= $image['title'];?>" title="<?= $image['title'];?>" />
                    </div>
                <?php } ?>
            </div>
        <?php } ?>

        <?php 
            if($this->imageLayout == 'three') {
        ?>
            <div class="three-images">
                <div class="image-wrapper">
                    <img src="<?= $this->images[0]['url'];?>" alt="<?= $this->images[0]['title'];?>" title="<?= $this->images[0]['title'];?>" />
                </div>
                <div class="image-wrapper image-stack">
                    <img src="<?= $this->images[1]['url'];?>" alt="<?= $this->images[1]['title'];?>" title="<?= $this->images[1]['title'];?>" />
                    <img src="<?= $this->images[2]['url'];?>" alt="<?= $this->images[2]['title'];?>" title="<?= $this->images[2]['title'];?>" />
                </div>
            </div>
        <?php } ?>            
    </div>
</section>


