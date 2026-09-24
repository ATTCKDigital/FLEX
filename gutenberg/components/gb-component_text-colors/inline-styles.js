/**
 * Set inline styles.
 * @param {Object} props - The block object.
 * @return {Object} The inline background type CSS.
 */
function TextColorInlineStyles( props ) {
	return {
		color: props.attributes.textColor ? props.attributes.textColor : null,
	};
}

export default TextColorInlineStyles;
