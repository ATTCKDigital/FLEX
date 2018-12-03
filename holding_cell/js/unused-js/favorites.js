// Form interactions for buddypress

function Favorites ($el) {
	function removeFavorites() {
		//the plugin does not remove favorites from the "favorites" list. 
		//hide the saved report when a user clicks the x, it will be removed from the dom on refresh
		$(document).on('favorites-updated-single', function(event, favorites, post_id, site_id, status){

			if(status == 'inactive') {
				$('body').find('.single-item[data-post-id="'+post_id+'"]').hide();
			}
		});
	}
	
	this.init = function($el) {
		removeFavorites();
		return this;
	}

	return this.init($el);
}

export default Favorites;
