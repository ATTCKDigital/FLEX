<?php

add_filter('excerpt_more', function() {
    return '...';
});
add_filter('excerpt_length', function() {
    return 300; // or 60, or whatever you like
});


