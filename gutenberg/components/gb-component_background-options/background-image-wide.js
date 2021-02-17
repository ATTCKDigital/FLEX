/**
 * Embedded style tags
 * @param {object} props - The block object.
 * @return {string} The style output container.
 */
function BackgroundOptionsImageWide( props ) {
	if ( 'image' === props.attributes.backgroundType && props.attributes.backgroundImageWide && props.attributes.backgroundImageWide == true ) {

		var backgroundImageWide = props.attributes.backgroundImageWide ? `${props.attributes.backgroundImageWide}` : 'inherit';

		var backgroundImageMobile = props.attributes.backgroundImageMobile ? `${props.attributes.backgroundImageMobile.url}` : 'inherit';
		var backgroundSizeMobile = props.attributes.backgroundSizeMobile ? `${props.attributes.backgroundSizeMobile}` : 'inherit';
		var backgroundRepeatMobile = props.attributes.backgroundRepeatMobile ? `${props.attributes.backgroundRepeatMobile}` : 'inherit';
		var backgroundPositionXMobile = props.attributes.backgroundPositionXMobile ? `${props.attributes.backgroundPositionXMobile}` : 'inherit';
		var backgroundPositionYMobile = props.attributes.backgroundPositionYMobile ? `${props.attributes.backgroundPositionYMobile}` : 'inherit';

		var backgroundImage = props.attributes.backgroundImage ? `${props.attributes.backgroundImage.url}` : 'inherit';
		var backgroundSize = props.attributes.backgroundSize ? `${props.attributes.backgroundSize}` : 'inherit';
		var backgroundRepeat = props.attributes.backgroundRepeat ? `${props.attributes.backgroundRepeat}` : 'inherit';
		var backgroundPositionX = props.attributes.backgroundPositionX ? `${props.attributes.backgroundPositionX}` : 'inherit';
		var backgroundPositionY = props.attributes.backgroundPositionY ? `${props.attributes.backgroundPositionY}` : 'inherit';

		var styles = '';

		styles += `.component-image-background.component-image-background-wide[data-section-id='${ props.attributes.dataSectionId }']:before {`;
		styles += `		background-image: ${backgroundImageMobile};`;
		styles += `		background-size: ${backgroundSizeMobile};`;
		styles += `		background-repeat: ${backgroundRepeatMobile};`;
		styles += `		background-position-x: ${backgroundPositionXMobile};`;
		styles += `		background-position-y: ${backgroundPositionYMobile};`;
		styles += `}`;

		styles += `@media only screen and (min-width: 768px) {`;
		styles += `	.component-image-background.component-image-background-wide[data-section-id='${ props.attributes.dataSectionId }']:before {`;
		styles += `		background-image: url(${backgroundImage});`;
		styles += `		background-size: ${backgroundSize};`;
		styles += `		background-repeat: ${backgroundRepeat};`;
		styles += `		background-position-x: ${backgroundPositionX};`;
		styles += `		background-position-y: ${backgroundPositionY};`;
		styles += `	}`;
		styles += `}`;

		return (
			<style>
				{ styles }
			</style>
		);
	} else {
		return false;
	}
}

export default BackgroundOptionsImageWide;
