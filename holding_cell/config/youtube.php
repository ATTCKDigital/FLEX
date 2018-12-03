<script>
      // 1. This code loads the IFrame Player API code asynchronously.
      
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


      // 2. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      
      var players = {};
      var playerID;

      function onYouTubeIframeAPIReady() {
        $('.video-popup').each(function(){ 
            player = this;
            playerID = $(player).data('video-id');
            var identifier = $(player).attr('id');
            if (playerID) { 
                players[playerID] = new YT.Player(playerID, {
                    events: {
                        "onReady": createYTEvent(playerID, identifier)
                    }
                });
            }           
         })
      }

      //3. play and pause functions

      function createYTEvent(playerID, identifier) {
          return function (event) {
               // Set player reference

              var playButton = document.getElementById('playButton-'+playerID);
              playButton.addEventListener('click', function() {
                  
                  playerID = $(this).data('video-id');
                  var player = players[playerID];
                  player.playVideo();
                  $('body').find('.video-popup[data-video-id="'+playerID+'"]').addClass('playVideo');
              });

              var closeButton = document.getElementById('closeVideo-'+playerID);
              closeButton.addEventListener('click', function() {
                  playerID = $(this).parent().data('video-id');
                  var player = players[playerID];
                  player.pauseVideo();
                  $('body').find('.playVideo').removeClass('playVideo');
             });

          }
      }

</script>