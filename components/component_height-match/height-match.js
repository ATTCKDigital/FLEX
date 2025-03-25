import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX/\tcomponents/\tcomponent_height-match/\theight-match.js'); }

/**
 * Copies link URL to clipboard and optionally 
 * displays the copied URL under the copied link
 */
function HeightMatch($el) {
    var _tallestHeight = 0;
    var _$el = $el;

    function bindEvents() {
        // Recalculate on window resize
        $(document).on('FLEX.resize', render);

        // Recalculate on height resize event
        $(document).on('FLEX.matchHeight', render);
	}

	function render() {
        // Save local reference
        var $el = _$el;

        // Reset
        _tallestHeight = 0;

        console.log('/FLEX/\tcomponents/\tcomponent_height-match/\theight-match.js', 'render()');

        // Reset heights to find natural height
        $el.find('.matchHeight').css('height', 'auto');

        // Find tallest element in group
        $el.find('.matchHeight').each(function (index, el) {
            var thisElHeight = $(el).innerHeight();

            if (thisElHeight > _tallestHeight) {
                _tallestHeight = thisElHeight;
            }
        });

        // Set heights of all elements to tallest height
        $el.find('.matchHeight').each(function (index, el) {
            // Don't apply the height change if we're on mobile and the class is set on the element
            if (jQuery(el).hasClass('height20vhMaxMobile') && !jQuery('body .breakpoint.tablet-landscape').is(':visible')) {
                // Set height to default so CSS will override
                $(el).css('height', '');
            } else {
                $(el).css('height', _tallestHeight);

                // Can't do this because we're temporarily setting the height to 'auto' in order to recalculate the natural height
                // $(el).stop().animate({height: _tallestHeight}, 200);
            }
        });
	}

	this.init = function ($el) {
		console.log('/FLEX/\tcomponents/\tcomponent_height-match/\theight-match.js', 'HeightMatch.init()');

		bindEvents();
        render();

		return this;
	}

	return this.init($el);
}

export default HeightMatch;
