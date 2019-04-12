// Test Component. Use this as a template for future components.
//
// After creating and exporting a component, add an entry for it in utils.js
// so that it exists in the FLEXLAYOUT.Components namespace.

function TestComponent ($el) {
	function privateFunction() {

	}

	this.init = function ($el) {
		this.$el = $el;
		privateFunction();

		return this;
	}

	return this.init($el);
}

export default TestComponent;
