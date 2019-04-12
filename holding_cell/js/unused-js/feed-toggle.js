// Feed Toogle component. Buttons for switching between grid view and list view.
//

function FeedToggle ($el) {
	this.setActive = function (view) {
		// Remove the active class, unless we're clicking the link that is
		//  already active. In that case, do nothing.
		if (this.$active.length && this.$active.children("a").data("view") === view) {
			return
		}

		// Add the active class to containing LI.
		this.$active.removeClass("active");
		this.$active = this.$el.find("a[data-view="+view+"]").closest("li");
		this.$active.addClass("active");
	};

	this.publish = function ( view ) {
		$(document).trigger("FLEXLAYOUT.feed-toggle." + view);
	};

	this.init = function ($el) {
		this.$el = $el;
		this.$active = this.$el.find("li.active");

		this.$el.on("click", "a[data-view]", function (e) {
			e.preventDefault();

			let view = $(e.currentTarget).data("view");

			// Toggle UI state.
			this.setActive( view );
			this.publish( view );
		}.bind(this));

		return this;
	}

	return this.init($el);
}

export default FeedToggle;
