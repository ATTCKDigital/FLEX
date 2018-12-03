function LoadMore($el) {
	// Load more posts in a tab
	function initLoadMorePosts() {
		var $section = $el.find('.feed-items');
		var item = $section.find('.feed-item');
		var search = $section.attr('data-search');
		var filterType = $section.attr('data-filter-type');
		var selection = $section.attr('data-selection');
		var pageType = $section.attr('data-page-type');
		var pageCategory = $section.attr('data-page-category');

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
			'filterType': filterType, // filter type
			'selection': selection, // selection
			'pageType': pageType, // if we are on a category/tag page
			'pageCategory': pageCategory, // if we are on a category/tag page, the term
			'loadMore' : 'true' //
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
				if ($('.load-item:last-child').data('max-pages') === 1) {
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

	function openFilter() {
		//open filter for mobile
		$(this).parent().toggleClass('openFilter').siblings().removeClass('openFilter');
	}

	function openSubFilter() {
		//open sub filter for desktop
		$(this).toggleClass('openFilter').siblings().removeClass('openFilter');
	}

	function filterPosts() {
		var $postsSection = $el.find('.feed-items');
		var $filterSet = $(this).closest('.filter-items');
		var item = $(this);
		// var postType = $(this).attr('data-post-type');
		var search = $filterSet.attr('data-search');
		var filterType = $filterSet.attr('data-filter-type');
		var selection = $(this).attr('data-filter-selection');
		var pageCategory = $filterSet.attr('data-page-category');
		var pageType = $filterSet.attr('data-page-type');

		$el.find('.activeFilter').removeClass('activeFilter');
		$(item).addClass('activeFilter');

		$postsSection.attr('data-selection', selection);
		$postsSection.attr('data-filter-type', filterType);
		$postsSection.attr('data-page-category', pageCategory);
		$postsSection.attr('data-page-type', pageType);

		var data = {
			'action': 'filter_posts', // function to execute load-more.php
			'afp_nonce': afp_vars.afp_nonce, // wp_nonce
			'filterType': filterType, // filter type
			// 'postType': postType, // post type
			'selection': selection, // selection type
			'search': search, // search term
			'pageCategory': pageCategory, // used when on category/tag index
			'pageType': pageType, // used when on category/tag index
			'loadMore' : 'false'
		};


		$.ajax({
			'type': 'post',
			'dataType': 'json',
			'url': afp_vars.afp_ajax_url,
			'data': data,
			success: function (data, textStatus, XMLHttpRequest) {
				// Add new posts
				$postsSection.html( data.response );
				
				// Define new elements
				var $newElems = $('.new-elements');
				$newElems.addClass('fadeIn').removeClass('new-elements');
				

				// Deactivate load more button when there are no more posts to load
				if($('.loadMore').length) {
					if ($('.load-item:last-child').data('max-pages') === 1) {
						console.log('hello');
						$('.loadMore').text('End of posts').addClass('button-inactive');
					} else {
						$('.loadMore').text('Load more').removeClass('button-inactive');
					}
				} else if ($('.load-item:last-child').data('max-pages') === 0) {
						$('.loadMore').text('End of posts').addClass('button-inactive');
				} else {
					$('.cta').html('<span class="loadMore button">Load more</span>');

					if ($('.load-item:last-child').data('max-pages') === 1) {
						$('.cta').html('<span class="loadMore button button-inactive">End of posts</span>');
					} else {
						$('.cta').html('<span class="loadMore button">Load more</span>');
					}
				}
			},
			error: function(MLHttpRequest, textStatus, errorThrown) {
				$('.loadMore').text(errorThrown).addClass('button-inactive');
				
			},
			complete: function () {
				//update results count
				var resultsCount = $('.load-item:first-child').attr('data-results-count');
				if(resultsCount > 1 || resultsCount == 0) {
					var s = 's';
				} else {
					var s = '';
				}
				$el.find('.results').text(resultsCount+' Result'+s);
			}
			
		});				
	}

	function clearFilter() {
		$(this).removeClass('showFilter');
		location.reload();
		$el.find('.activeFilter').removeClass('activeFilter');
	}


	this.init = function ($el) {
		$el = $el;
		$el.find('.loadMore').on('click', initLoadMorePosts);
		$el.find('.filter').on('click', filterPosts);
		$el.find('.clearFilter').on('click', clearFilter);
		$el.find('.filter-item-header').on('click', openFilter);
		$el.find('.filter-item-parent span').on('click', openFilter);

		return this;
	}

	return this.init($el);
}

export default LoadMore;