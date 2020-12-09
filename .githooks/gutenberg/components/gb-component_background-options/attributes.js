/**
 * Set the attributes to be displayed in the Background Options panel.
 * @type {Object}
 */
const BackgroundOptionsAttributes = {
	backgroundType: {
		type: 'string',
	},
	backgroundImage: {
		type: 'object',
	},
	backgroundImageMobile: {
		type: 'object',
	},
	backgroundVideo: {
		type: 'object',
	},
	backgroundVideoThumb: {
		type: 'object',
	},
	backgroundColor: {
		type: 'string',
	},
	backgroundPositionX: {
		type: 'string',
		default: 'center',
	},
	backgroundPositionY: {
		type: 'string',
		default: 'center',
	},
	backgroundSize: {
		type: 'string',
		default: 'cover',
	},
	backgroundRepeat: {
		type: 'string',
		default: 'no-repeat',
	},
	backgroundPositionXMobile: {
		type: 'string',
		default: 'center',
	},
	backgroundPositionYMobile: {
		type: 'string',
		default: 'center',
	},
	backgroundSizeMobile: {
		type: 'string',
		default: 'cover',
	},
	backgroundRepeatMobile: {
		type: 'string',
		default: 'no-repeat',
	},
};

export default BackgroundOptionsAttributes;
