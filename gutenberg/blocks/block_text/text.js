/**
 * WordPress dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js'
import edit from './text-edit';

/**
 * Internal dependencies
 */
const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;
const {
	InspectorControls,
	InnerBlocks,
} = wp.editor;

// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Background Options requirements.
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';


export default registerBlockType(
	'flexls/text',
	{
		title: __( 'Rich Text', 'block title' ),
		description: __( 'Use the classic WordPress editor.' ),
		icon: icons.text,
		category: 'common',
		parent: ['flexls/column'],
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'WYSIWYG', 'flexls' ),
			__( 'TinyMCE', 'flexls' ),
		],
		attributes: {
			content: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...BorderOptionsAttributes,
			...PaddingOptionsAttributes,
			...BackgroundColorOptionsAttributes
		},
		supports: {
			className: true,
			customClassName: true,
			// Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
			// confusing UX, because of its similarity to the 'Convert to Blocks' button.
			reusable: false,
		},

		edit,

		save() {
			return null;
		},
	},
);
