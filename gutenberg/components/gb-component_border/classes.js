/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function BorderOptionsClasses( props ) {
	return [
		props.attributes.borderTop ? `component-top-border-${ props.attributes.borderTop }` : null,
		props.attributes.borderRight ? `component-right-border-${ props.attributes.borderRight }` : null,
		props.attributes.borderBottom ? `component-bottom-border-${ props.attributes.borderBottom }` : null,
		props.attributes.borderLeft ? `component-left-border-${ props.attributes.borderLeft }` : null,
	];
}

export default BorderOptionsClasses;
