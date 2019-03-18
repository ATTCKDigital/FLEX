/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from 'icons';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	PlainText,
	InspectorControls,
	InnerBlocks,
} = wp.editor;
const {
	Toolbar,
	Tooltip,
	Dashicon

} = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';


/**
	* Register block
 */
export default registerBlockType(
	'flexls/shortcode',
	{
		title: __( 'Shortcode' ),
		description: __( 'Display Wordpress shortcodes.' ),
		category: 'common',
		icon: 'plus',
		parent: 'flexls/column',
		keywords: [
			__( 'Shortcode', 'flexls' ),
			__( 'Code', 'flexls' ),
		],
		attributes: {
			content: {
				type: 'string',
				default: '',
			},
			...MarginOptionsAttributes
		},

		supports: {
			html: true,
		},

		edit: props => {
			const { attributes: { content},
				className, setAttributes } = props;

			return [

				<InspectorControls>
					<MarginOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div className={ classnames(
							`component-shortcode`,
						)}>
					<PlainText
						value={ content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Paste shortcode…' ) }
						aria-label={ __( 'shortcode' ) }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
