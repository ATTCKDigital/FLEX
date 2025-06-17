import $ from 'jquery';

function LoadMore($el) {
	// Load more posts
	// See load-more.php for the query construction
	function initLoadMorePosts() {
		var $section = $el.find('.load-items');
		var item = $section.find('.feed-item');
		var postType = $section.attr('data-post-type');
		var term = $section.attr('data-term');
		var taxonomy = $section.attr('data-taxonomy');
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
			'postType': postType, // the post type of the load more
			'term': term, // if we are on a category/tag page, the term
			'taxonomy': taxonomy, // if we are on a category/tag page, the term
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
				if ($('.load-items .feed-item:last-child').data('max-pages') === 1) {
					$('.loadMore').text('End of posts').addClass('button-inactive').removeClass('hidden');
				} else if ($('.load-items .feed-item:last-child').data('max-pages') === 0) {
					$('.loadMore').text('No posts').addClass('hidden');
				} else {
					$('.loadMore').text('Show more').removeClass('button-inactive hidden');
				}
			},
			error: function(MLHttpRequest, textStatus, errorThrown) {
				$('.loadMore').text(errorThrown).addClass('button-inactive');
				
			},
			complete: function () {
			}
			
		});				
	}

	function tabSwitcher() {
		//Load posts into tabs on click of tab
		var tabTerm = $(this).attr('data-tab'); //get the term of the clicked tab
		var tabText = $(this).text(); //get the term of the clicked tab
		var tabCount = $(this).attr('data-post-count'); //get the term of the clicked tab
		var $section = $el.find('.load-items'); //find the section
		var postType = $section.attr('data-post-type');

		$el.find('.tabs').toggleClass('showTabs');
		$el.find('.selected-tab').text(tabText);

		// Set the data attributes for load more
		if(tabTerm == 'all') {
			$section.attr('data-taxonomy', '');
			$section.attr('data-term', '');
			
		} else {
			$section.attr('data-taxonomy', 'category');
			$section.attr('data-term', tabTerm);
		}

		var newTabTerm = $section.attr('data-term');
		var newTabCategory = $section.attr('data-taxonomy');

		// Change the active tab
		$(this).addClass('activeTab').siblings().removeClass('activeTab');

		var data = {
			'action': 'filter_posts', // function to execute load-more.php
			'afp_nonce': afp_vars.afp_nonce, // wp_nonce
			'ids': '', //excluded posts
			'postType': postType, // the post type of the load more
			'term': newTabTerm, // the term id
			'taxonomy': newTabCategory, // the taxonomy type
			'postCount': tabCount, // the taxonomy type
		};

		// console.log(data)

		$.ajax({
			'type': 'post',
			'dataType': 'json',
			'url': afp_vars.afp_ajax_url,
			'data': data,
			success: function (data, textStatus, XMLHttpRequest) {
				var $topItem = $el.find('.feed-items-top');
				var $twitter = $el.find('.component-twitter')

				var responseData = data.response;

				if(tabTerm == 'all') {
					//slice the array 
					var topPost = responseData.slice(0, 1)
					var otherPosts = responseData.slice(1, tabCount)
					//replace the top post with new data
					$topItem.html(topPost);
					//replace the existing data with new data
					$section.html( otherPosts );
					//show the twitter feed and the top post
					$twitter.removeClass('hidePost');
					$topItem.removeClass('hidePost');

				} else {
					//replace the existing data with new data
					$section.html( responseData );
					//hide the twitter feed and the top post
					$twitter.addClass('hidePost');
					$topItem.addClass('hidePost');
				}
			
				// Define new elements
				var $newElems = $('.new-elements');
				$newElems.addClass('fadeIn').removeClass('new-elements');

				// Deactivate load more button when there are no more posts to load
				if ($('.load-items .feed-item:last-child').data('max-pages') === 1) {
					$('.loadMore').text('End of posts').addClass('button-inactive').removeClass('hidden');
				} else if ($('.load-items .feed-item:last-child').data('max-pages') === 0) {
					$('.loadMore').text('No posts').addClass('hidden');
				} else {
					$('.loadMore').text('Show more').removeClass('button-inactive hidden');
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
		$el.find('.tab-title').on('click', tabSwitcher);

		return this;
	}

	return this.init($el);
}

export default LoadMore;