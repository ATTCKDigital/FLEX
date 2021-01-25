/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */
function BackgroundOptionsInlineStyles( props ) {
	// Don't return these if background image is set to wide
	if (props.attributes.backgroundType && props.attributes.backgroundImageWide) {
		return {};
	} else {
		return {
			backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
			backgroundImage: 'image' === props.attributes.backgroundType && props.attributes.backgroundImage ? `url(${ props.attributes.backgroundImage.url })` : null,
			backgroundImageWide: 'image' === props.attributes.backgroundType && props.attributes.backgroundImageWide ? `${ props.attributes.backgroundImage.url }` : null,
			backgroundSize: 'image' === props.attributes.backgroundType && props.attributes.backgroundSize ? `${ props.attributes.backgroundSize }` : null,
			backgroundRepeat: 'image' === props.attributes.backgroundType && props.attributes.backgroundRepeat ? `${ props.attributes.backgroundRepeat }` : null,
		};
	}
}

export default BackgroundOptionsInlineStyles;
