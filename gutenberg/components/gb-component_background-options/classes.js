/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function BackgroundOptionsClasses( props ) {
	return [
		{ 'component-image-background component-background': 'image' === props.attributes.backgroundType },
		{ 'component-color-background component-background': 'color' === props.attributes.backgroundType },
		{ 'component-video-background component-background': 'video' === props.attributes.backgroundType },
		{ 'component-background-left-center': 'left' === props.attributes.backgroundPositionX && 'center' === props.attributes.backgroundPositionY },
		{ 'component-background-left-top': 'left' === props.attributes.backgroundPositionX && 'top' === props.attributes.backgroundPositionY },
		{ 'component-background-left-bottom': 'left' === props.attributes.backgroundPositionX && 'bottom' === props.attributes.backgroundPositionY },
		{ 'component-background-right-center': 'right' === props.attributes.backgroundPositionX && 'center' === props.attributes.backgroundPositionY },
		{ 'component-background-right-top': 'right' === props.attributes.backgroundPositionX && 'top' === props.attributes.backgroundPositionY },
		{ 'component-background-right-bottom': 'right' === props.attributes.backgroundPositionX && 'bottom' === props.attributes.backgroundPositionY },
		{ 'component-background-center-center': 'center' === props.attributes.backgroundPositionX && 'center' === props.attributes.backgroundPositionY },
		{ 'component-background-center-top': 'center' === props.attributes.backgroundPositionX && 'top' === props.attributes.backgroundPositionY },
		{ 'component-background-center-bottom': 'center' === props.attributes.backgroundPositionX && 'bottom' === props.attributes.backgroundPositionY },

	];
}

export default BackgroundOptionsClasses;
