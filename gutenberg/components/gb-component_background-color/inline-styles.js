/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */
function BackgroundColorOptionsInlineStyles( props ) {
	const { backgroundColor, backgroundOpacity } = props.attributes;

	let style = {};
	
	if (backgroundColor) {
		// Convert hex to rgba
		const hexToRgba = (hex, opacity) => {
			let r = 0, g = 0, b = 0;
			
			if (hex.length === 4) {
				r = parseInt(hex[1] + hex[1], 16);
				g = parseInt(hex[2] + hex[2], 16);
				b = parseInt(hex[3] + hex[3], 16);
			} else if (hex.length === 7) {
				r = parseInt(hex[1] + hex[2], 16);
				g = parseInt(hex[3] + hex[4], 16);
				b = parseInt(hex[5] + hex[6], 16);
			}

			const alpha = (opacity || 100) / 100;

			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		};

		style.backgroundColor = hexToRgba(backgroundColor, backgroundOpacity);
	}

	return style;

	// return {
	// 	backgroundColor: props.attributes.backgroundColor ? props.attributes.backgroundColor : null,
	// };
}

export default BackgroundColorOptionsInlineStyles;
