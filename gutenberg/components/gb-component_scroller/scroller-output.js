/**
 * Set scroller output.
 * @param {Object} props - The block object.
 * @return {Element|undefined} The scroller output container, or undefined when the scroller is off.
 */
function ScrollerOptionsOutput( props ) {
	if ( props.attributes.showScroller ) {
		return (
			<mark
				className="scrollerActive icon-scroller"
				data-scroller-id={ props.attributes.scrollerId }
			></mark>
		);
	}
}

export default ScrollerOptionsOutput;
