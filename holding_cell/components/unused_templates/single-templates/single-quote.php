<!-- singe quote -->

<section class="component component-quote">
    <div class="content-wrapper">
        <div class="quote<?php if($this->quoteImage){ echo ' has-image';}?>">
            <div class="quote-text">
                <mark class="quotation-mark">&ldquo;</mark>
                <p class="serif16"><?= $this->quoteText;?></p>
                <?php if($this->quoteSource) { ?>
                    <cite class="sans-serif13 uppercase align-left"><strong><?= $this->quoteSource;?></strong></cite>
                <?php } ?>
                <?php if($this->quoteTitle) { ?>
                    <small class="sans-serif13 align-left"><?= $this->quoteTitle;?></small>
                <?php } ?>
            </div>
            <?php if($this->quoteImage){ ?>
                <img src="<?= $this->quoteImage['url'];?>" alt="<?= $this->quoteImage['title'];?>" title="<?= $this->quoteImage['title'];?>" />
            <?php } ?>
        </div>
    </div>
</section>


