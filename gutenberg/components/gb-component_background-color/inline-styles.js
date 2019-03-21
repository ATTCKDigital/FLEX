/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */
function BackgroundColorOptionsInlineStyles( props ) {
	return {
		backgroundColor: props.attributes.backgroundColor ? props.attributes.backgroundColor : null,
	};
}

export default BackgroundColorOptionsInlineStyles;
