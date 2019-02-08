<?php

//Allow SVGs to be uploaded via WordPress Media Uploader
function flexls_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'flexls_mime_types');