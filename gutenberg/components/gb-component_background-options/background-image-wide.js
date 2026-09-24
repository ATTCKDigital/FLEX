/**
 * Embedded style tags
 * @param {Object} props - The block object.
 * @return {string} The style output container.
 */
function BackgroundOptionsImageWide( props ) {
	if (
		'image' === props.attributes.backgroundType &&
		props.attributes.backgroundImageWide &&
		props.attributes.backgroundImageWide === true
	) {
		const backgroundImageMobile = props.attributes.backgroundImageMobile
			? `${ props.attributes.backgroundImageMobile.url }`
			: 'inherit';
		const backgroundSizeMobile = props.attributes.backgroundSizeMobile
			? `${ props.attributes.backgroundSizeMobile }`
			: 'inherit';
		const backgroundRepeatMobile = props.attributes.backgroundRepeatMobile
			? `${ props.attributes.backgroundRepeatMobile }`
			: 'inherit';
		const backgroundPositionXMobile = props.attributes
			.backgroundPositionXMobile
			? `${ props.attributes.backgroundPositionXMobile }`
			: 'inherit';
		const backgroundPositionYMobile = props.attributes
			.backgroundPositionYMobile
			? `${ props.attributes.backgroundPositionYMobile }`
			: 'inherit';

		const backgroundImage = props.attributes.backgroundImage
			? `${ props.attributes.backgroundImage.url }`
			: 'inherit';
		const backgroundSize = props.attributes.backgroundSize
			? `${ props.attributes.backgroundSize }`
			: 'inherit';
		const backgroundRepeat = props.attributes.backgroundRepeat
			? `${ props.attributes.backgroundRepeat }`
			: 'inherit';
		const backgroundPositionX = props.attributes.backgroundPositionX
			? `${ props.attributes.backgroundPositionX }`
			: 'inherit';
		const backgroundPositionY = props.attributes.backgroundPositionY
			? `${ props.attributes.backgroundPositionY }`
			: 'inherit';

		let styles = '';

		styles += `.component-image-background.component-image-background-wide[data-section-id='${ props.attributes.dataSectionId }']:before {`;
		styles += `		background-image: ${ backgroundImageMobile };`;
		styles += `		background-size: ${ backgroundSizeMobile };`;
		styles += `		background-repeat: ${ backgroundRepeatMobile };`;
		styles += `		background-position-x: ${ backgroundPositionXMobile };`;
		styles += `		background-position-y: ${ backgroundPositionYMobile };`;
		styles += `}`;

		styles += `@media only screen and (min-width: 768px) {`;
		styles += `	.component-image-background.component-image-background-wide[data-section-id='${ props.attributes.dataSectionId }']:before {`;
		styles += `		background-image: url(${ backgroundImage });`;
		styles += `		background-size: ${ backgroundSize };`;
		styles += `		background-repeat: ${ backgroundRepeat };`;
		styles += `		background-position-x: ${ backgroundPositionX };`;
		styles += `		background-position-y: ${ backgroundPositionY };`;
		styles += `	}`;
		styles += `}`;

		return <style>{ styles }</style>;
	}
	return false;
}

export default BackgroundOptionsImageWide;
