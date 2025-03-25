import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/components\t/component_accordion\t/accordion.js'); }

function Accordion($el) {
	console.log('/accordion.js', 'Accordion()');

    var _listItems;
    var _listHeaders;
    var _listContent;

	function bindEvents() {
        // Finr list items
        _listItems = $('.accordionItem', $el);

		// Find list headers
        _listHeaders = $('.accordionHeader', $el);

        // Find list content
        _listContent = $('.accordionContent', $el);

        // Get list content item's heights
        _listContent.each(function (index, el) {
            var originalHeight = $(el).outerHeight();

            // Save original content height
            $(el).attr('data-height', originalHeight);

            // Hide content items on load
            $(el).css('height', '0px');
        });

        // Expand/contract content on click
        $(_listItems).each(function (index, el) {
            $(el).on('click', function (e) {
                console.log('accordion clicked: ', $('.accordionContent', this).text());

                $(this).toggleClass('open');

                if ($(this).hasClass('open')) {
                    // Open
                    $('.accordionContent', this).css('height', $('.accordionContent', this).attr('data-height') + 'px');
                } else {
                    // Close
                    $('.accordionContent', this).css('height', '0px');
                }

                // Wait until height animation has completed 
                setTimeout(function () {
                    render();
                }, 200);
            });
        });
	}

	function render() {
        $(document).trigger('FLEX.matchHeight');
    }

	this.init = function INIT($el) {
		console.log('/FLEX/\tcomponents/\tcomponent-accordion/\taccordion.js', 'init()');

		bindEvents();
        render();

		return this;
	}

	return this.init($el);
}

export default Accordion;
