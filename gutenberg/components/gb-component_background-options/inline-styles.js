/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */
function hexToRgba(hex, opacity = 100) {
	if (typeof hex !== 'string' || !hex.startsWith('#')) return hex;

	hex = hex.replace('#', '');
	
	let r, g, b;

	if (hex.length === 3) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 6) {
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);
	} else {
		return hex;
	}

	const alpha = Math.min(Math.max(opacity / 100, 0), 1);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function BackgroundOptionsInlineStyles( props ) {
	try {
		const { 
			backgroundType, 
			backgroundColor, 
			backgroundOpacity, 
			backgroundImage, 
			backgroundImageWide, 
			backgroundSize, 
			backgroundRepeat 
		} = props.attributes || {};

		// If image is wide, don't apply inline styles
		if (backgroundType === 'image' && backgroundImageWide) {
			return {};
		}

		const style = {};

		// Background color with opacity (RGBA)
		if (
			backgroundType === 'color' &&
			typeof backgroundColor === 'string' &&
			backgroundColor.startsWith('#')
		) {
			const safeOpacity = typeof backgroundOpacity === 'number' ? backgroundOpacity : 100;
			style.backgroundColor = hexToRgba(backgroundColor, safeOpacity);
		}

		// Background image
		if (backgroundType === 'image' && backgroundImage && backgroundImage.url) {
			style.backgroundImage = `url(${backgroundImage.url})`;
		}

		if (backgroundType === 'image' && backgroundSize) {
			style.backgroundSize = backgroundSize;
		}

		if (backgroundType === 'image' && backgroundRepeat) {
			style.backgroundRepeat = backgroundRepeat;
		}

		return style;
	} catch (err) {
		console.error('err: ', err);
		return {};
	}
}

export default BackgroundOptionsInlineStyles;
