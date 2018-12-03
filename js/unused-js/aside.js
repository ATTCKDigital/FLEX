/**
 * Aside Component
 * Needs JavaScript to break out of non-full-bleed rows
 */ 
function Aside($el) {
	function render() {
		// Find closest container row 
		// Move Aside before it
		$el.insertBefore($el.closest('.component-row-inner'));
	}
	
	this.init = function () {
		render();

		return this;
	};

	return this.init($el);
}

export default Aside;