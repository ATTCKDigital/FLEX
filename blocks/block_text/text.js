/**
 * WordPress dependencies
 */
import classnames from 'classnames';
import icons from 'icons';
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
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../gb-components/gb-component_/margin';


export default registerBlockType(
	'flexls/text',
	{
		title: __( 'Rich Text', 'block title' ),
		description: __( 'Use the classic WordPress editor.' ),
		icon: icons.text,  
		category: 'common',
		parent: 'column',
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'WYSIWYG', 'flexls' ),
			__( 'TinyMCE', 'flexls' ),
		],
		attributes: {
			content: {
				type: 'string',
			},
			...MarginOptionsAttributes
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
