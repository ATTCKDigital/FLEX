/**
 * Set data attributes.
 * @param {object} props - The block object.
 * @return {array} The data attribute.
 */
function LogoColorOptionsDataAttr( props ) {
	return [
		props.attributes.logoColor ? `logo-color-${ props.attributes.logoColor }` : null,

	];
}

export default LogoColorOptionsDataAttr;
