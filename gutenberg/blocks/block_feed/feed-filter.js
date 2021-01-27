// Feed Block
function FeedFilter($el) {

  let $filter;

	// Cache the body
	function bindEvents() {
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_feed.js/\tfeed-filter.js', 'bindEvents()');
    $filter.on('change', submitForm);
  }

  function submitForm() {
    this.form.submit();
  }

	function render() {
    console.log('/FLEX/\tgutenberg/\tblocks/\tblock_feed.js/\tfeed-filter.js', 'render()');
    
    $form = $('.filter-form', $el);

    return true;
	}

	this.init = function ($el) {
    console.log('/FLEX/\tgutenberg/\tblocks/\tblock_feed.js/\tfeed-filter.js', 'init()');

    if(!render()) return;
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default FeedFilter;
