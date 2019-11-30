/**
 * Set scroller output.
 * @param {object} props - The block object.
 * @return {string} The scroller output container.
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
