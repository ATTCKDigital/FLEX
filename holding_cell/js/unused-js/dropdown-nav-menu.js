function DropdownNavMenu ($el) {
	this.init = function ($el) {
		this.$el = $el;

		this.$el.find('.dropdown-nav-toggle').on("click", function (e) {
			e.preventDefault();
			this.$el.toggleClass('open');
		}.bind(this));

		this.$el.find('.dropdown-nav-items a').on("click", function (e) {
			this.$el.removeClass('open');
		}.bind(this));

		return this;
	}

	return this.init($el);
}

export default DropdownNavMenu;
