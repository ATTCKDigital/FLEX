function Feed($el) {
	this.initMasonry = function() {
		var $grid = $('.masonryFeed').masonry({
            itemSelector: '.feed-item',
            //use element for option
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            percentPosition: true,
            transitionDuration: 0,
        });


		// layout Masonry after each image loads
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry('layout');
		});			


		return this;
	};

	/**
	 * Listen for page-level events.
	 * @return {Function} Returns this Feed instance.
	 */
	this.subscribe = function () {
		$(document).on("FLEXLAYOUT.feed-toggle.list", this.activateListView.bind(this));
		$(document).on("FLEXLAYOUT.feed-toggle.grid", this.activateGridView.bind(this));

		return this;
	};

	/**
	 * Remove page-level event handlers.
	 * @return {Function} Returns this Feed instance.
	 */
	this.unsubscribe = function () {
		$(document).off("FLEXLAYOUT.feed-toggle.list", this.activateListView.bind(this));
		$(document).off("FLEXLAYOUT.feed-toggle.grid", this.activateGridView.bind(this));

		return this;
	};

	/**
	 * Enables the list view.
	 * @return {Function} Returns this Feed instance.
	 */
	this.activateListView = function () {
		this.destroyGrid();
		this.$el.addClass("view-list");

		return this;
	};

	/**
	 * Enables the grid view (Masonry).
	 * @return {Function} Returns this Feed instance.
	 */
	this.activateGridView = function () {
		this.$el.removeClass("view-list");
		//add set timeout to allow transition to complete before reinitializing masonry to prevent overlap
		setTimeout(this.initMasonry, 200);
	};

	this.init = function ($el) {
		this.$el = $el;
		this.initMasonry();
		this.subscribe();

		return this;
	};

	/**
	 * Removes the Masonry.js events.
	 * @return {Function} Returns this Feed instance.
	 */
	this.destroyGrid = function() {
		$('.masonryFeed').masonry('destroy');

		// This is necessary to re-initialize, since Masonry doesn't remove it.
		$('.masonryFeed').data('masonry', null);

		return this;
	};

	return this.init($el);
}

export default Feed;
