function LoadMore($el) {
	// Load more posts in a tab
	// See load-more.php for the query construction
	function initLoadMorePosts() {
		var $section = $el.find('.feed-items');
		var item = $section.find('.feed-item');
		var search = $section.attr('data-search');
		var postType = $section.attr('data-post-type');
		var pageCategory = $section.attr('data-page-category');
		// Add additional data attributes to refine or repurpose. ie. author.  These attributes should be added to ALL loadable feeds, even if left blank.


		var postIDs = [];

		$(item).each(function () {
			var postID = $(this).data('post-id');
			postIDs.push(postID);
		});

		var data = {
			'action': 'filter_posts', // function to execute load-more.php
			'afp_nonce': afp_vars.afp_nonce, // wp_nonce
			'ids': postIDs, //excluded posts
			'search': search, // search term
			'postType': postType, // the post type of the load more
			'pageCategory': pageCategory, // if we are on a category/tag page, the term
		};


		$.ajax({
			'type': 'post',
			'dataType': 'json',
			'url': afp_vars.afp_ajax_url,
			'data': data,
			success: function (data, textStatus, XMLHttpRequest) {
				// Add new posts
				$section.append( data.response );
			
				// Define new elements
				var $newElems = $('.new-elements');
				$newElems.addClass('fadeIn').removeClass('new-elements');

				// Deactivate load more button when there are no more posts to load
				if ($('.feed-item:last-child').data('max-pages') === 1) {
					$('.loadMore').text('End of posts').addClass('button-inactive');
				} else {
					$('.loadMore').text('Load more').removeClass('button-inactive');
				}
			},
			error: function(MLHttpRequest, textStatus, errorThrown) {
				$('.loadMore').text(errorThrown).addClass('button-inactive');
				
			},
			complete: function () {
			}
			
		});				
	}

	this.init = function ($el) {
		$el = $el;
		$el.find('.loadMore').on('click', initLoadMorePosts);

		return this;
	}

	return this.init($el);
}

export default LoadMore;