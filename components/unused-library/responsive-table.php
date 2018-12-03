<?php
/**
 * Responsive Table Component
 *
 */


?>

<section class="component component-responsive-table">
    <h1 class="sans-serif78 align-left fade-me-in faded-in table-title">
        <?=$globalColumn['table_title']?>
    </h1>

    <?php
    $table = $globalColumn['responsive_table'];

    if ($table) {
        echo '<table class="pure-table" border="0" >';

        if ($table['header']) {
            echo '<thead>';
            echo '<tr>';

            foreach ($table['header'] as $th) {
                echo '<th>';
                echo $th['c'];
                echo '</th>';
            }

            echo '</tr>';
            echo '</thead>';
        }

        echo '<tbody>';

        foreach ($table['body'] as $tr) {
            echo '<tr>';

            foreach ($tr as $td) {
                echo '<td>';
                echo $td['c'];
                echo '</td>';
            }

            echo '</tr>';
        }

        echo '</tbody>';
        echo '</table>';
    }
    ?>

    <div class="table-footer align-center">
        <?=$globalColumn['text_copy2']?>
    </div>
</section>
