/**
 * Set data attributes.
 * @param {Object} props - The block object.
 * @return {Array} The data attribute.
 */
function LogoColorOptionsDataAttr( props ) {
	return [
		props.attributes.logoColor
			? `logo-color-${ props.attributes.logoColor }`
			: null,
	];
}

export default LogoColorOptionsDataAttr;
