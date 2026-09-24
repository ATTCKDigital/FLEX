import $ from 'jquery';

function LoadMore( $el ) {
	// Load more posts
	// See load-more.php for the query construction
	function initLoadMorePosts() {
		const $section = $el.find( '.load-items' );
		const item = $section.find( '.feed-item' );
		const postType = $section.attr( 'data-post-type' );
		const term = $section.attr( 'data-term' );
		const taxonomy = $section.attr( 'data-taxonomy' );
		// Add additional data attributes to refine or repurpose. ie. author.  These attributes should be added to ALL loadable feeds, even if left blank.

		const postIDs = [];

		$( item ).each( function () {
			const postID = $( this ).data( 'post-id' );
			postIDs.push( postID );
		} );

		const data = {
			action: 'filter_posts', // function to execute load-more.php
			afp_nonce: afp_vars.afp_nonce, // wp_nonce
			ids: postIDs, //excluded posts
			postType, // the post type of the load more
			term, // if we are on a category/tag page, the term
			taxonomy, // if we are on a category/tag page, the term
		};

		$.ajax( {
			type: 'post',
			dataType: 'json',
			url: afp_vars.afp_ajax_url,
			data,
			success( data, textStatus, XMLHttpRequest ) {
				// Add new posts
				$section.append( data.response );

				// Define new elements
				const $newElems = $( '.new-elements' );
				$newElems.addClass( 'fadeIn' ).removeClass( 'new-elements' );

				// Deactivate load more button when there are no more posts to load
				if (
					$( '.load-items .feed-item:last-child' ).data(
						'max-pages'
					) === 1
				) {
					$( '.loadMore' )
						.text( 'End of posts' )
						.addClass( 'button-inactive' )
						.removeClass( 'hidden' );
				} else if (
					$( '.load-items .feed-item:last-child' ).data(
						'max-pages'
					) === 0
				) {
					$( '.loadMore' ).text( 'No posts' ).addClass( 'hidden' );
				} else {
					$( '.loadMore' )
						.text( 'Show more' )
						.removeClass( 'button-inactive hidden' );
				}
			},
			error( MLHttpRequest, textStatus, errorThrown ) {
				$( '.loadMore' )
					.text( errorThrown )
					.addClass( 'button-inactive' );
			},
			complete() {},
		} );
	}

	function tabSwitcher() {
		//Load posts into tabs on click of tab
		const tabTerm = $( this ).attr( 'data-tab' ); //get the term of the clicked tab
		const tabText = $( this ).text(); //get the term of the clicked tab
		const tabCount = $( this ).attr( 'data-post-count' ); //get the term of the clicked tab
		const $section = $el.find( '.load-items' ); //find the section
		const postType = $section.attr( 'data-post-type' );

		$el.find( '.tabs' ).toggleClass( 'showTabs' );
		$el.find( '.selected-tab' ).text( tabText );

		// Set the data attributes for load more
		if ( tabTerm == 'all' ) {
			$section.attr( 'data-taxonomy', '' );
			$section.attr( 'data-term', '' );
		} else {
			$section.attr( 'data-taxonomy', 'category' );
			$section.attr( 'data-term', tabTerm );
		}

		const newTabTerm = $section.attr( 'data-term' );
		const newTabCategory = $section.attr( 'data-taxonomy' );

		// Change the active tab
		$( this ).addClass( 'activeTab' ).siblings().removeClass( 'activeTab' );

		const data = {
			action: 'filter_posts', // function to execute load-more.php
			afp_nonce: afp_vars.afp_nonce, // wp_nonce
			ids: '', //excluded posts
			postType, // the post type of the load more
			term: newTabTerm, // the term id
			taxonomy: newTabCategory, // the taxonomy type
			postCount: tabCount, // the taxonomy type
		};

		// console.log(data)

		$.ajax( {
			type: 'post',
			dataType: 'json',
			url: afp_vars.afp_ajax_url,
			data,
			success( data, textStatus, XMLHttpRequest ) {
				const $topItem = $el.find( '.feed-items-top' );
				const $twitter = $el.find( '.component-twitter' );

				const responseData = data.response;

				if ( tabTerm == 'all' ) {
					//slice the array
					const topPost = responseData.slice( 0, 1 );
					const otherPosts = responseData.slice( 1, tabCount );
					//replace the top post with new data
					$topItem.html( topPost );
					//replace the existing data with new data
					$section.html( otherPosts );
					//show the twitter feed and the top post
					$twitter.removeClass( 'hidePost' );
					$topItem.removeClass( 'hidePost' );
				} else {
					//replace the existing data with new data
					$section.html( responseData );
					//hide the twitter feed and the top post
					$twitter.addClass( 'hidePost' );
					$topItem.addClass( 'hidePost' );
				}

				// Define new elements
				const $newElems = $( '.new-elements' );
				$newElems.addClass( 'fadeIn' ).removeClass( 'new-elements' );

				// Deactivate load more button when there are no more posts to load
				if (
					$( '.load-items .feed-item:last-child' ).data(
						'max-pages'
					) === 1
				) {
					$( '.loadMore' )
						.text( 'End of posts' )
						.addClass( 'button-inactive' )
						.removeClass( 'hidden' );
				} else if (
					$( '.load-items .feed-item:last-child' ).data(
						'max-pages'
					) === 0
				) {
					$( '.loadMore' ).text( 'No posts' ).addClass( 'hidden' );
				} else {
					$( '.loadMore' )
						.text( 'Show more' )
						.removeClass( 'button-inactive hidden' );
				}
			},
			error( MLHttpRequest, textStatus, errorThrown ) {
				$( '.loadMore' )
					.text( errorThrown )
					.addClass( 'button-inactive' );
			},
			complete() {},
		} );
	}

	this.init = function ( $el ) {
		$el = $el;
		$el.find( '.loadMore' ).on( 'click', initLoadMorePosts );
		$el.find( '.tab-title' ).on( 'click', tabSwitcher );

		return this;
	};

	return this.init( $el );
}

export default LoadMore;
