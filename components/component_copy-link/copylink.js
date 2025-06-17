import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/js\t/components\t/component_copy-link\t/copylink.js'); }

/**
 * Copies link URL to clipboard and optionally 
 * displays the copied URL under the copied link
 */
function CopyLink($el) {
	function bindEvents() {
		$el = $el;

		// TODO: Add support for turning this off. -DP
		$el.on('click', renderCopyMagic);
	}

	function copyLink(e, successCallback) {
		e.preventDefault();

		var linkText = e.target.getAttribute('href');

		navigator.clipboard.writeText(linkText).then((a, b, c) => {
			successCallback(e, linkText);
			}, (w, t, f) => {
			console.log('failed', w, t, f);

			return false;
		});
	}

	function displayCopiedLinkURL(e, linkText) {
		var copiedLinkURL = '';

		// Prompts user to access clipboard, which
		// we don't want. -DP
		// navigator.clipboard.readText().then(function(data) {
		// 	console.log("Copied text: ", data);

		// 	copiedLinkURL = data;
		// });

		// Prevent duplicate duplications
		if (e.target.textContent !== 'Link Copied') {
			// Change link text to indicate success
			e.target.textContent = 'Link Copied';

			// Append link text to page underneath link
			$('<p class="text-align-center is-style-body3 margin-top-2x"><a href="' + linkText + '">' + linkText + '</a></p>').insertAfter($el);
		}
	}

	function renderCopyMagic(e) {
		e.preventDefault();

		copyLink(e, displayCopiedLinkURL);
	}

	this.init = function ($el) {
		console.log('/FLEX\t/js\t/components\t/component_copy-link\t/copylink.js', 'CopyLink.init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default CopyLink;
