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
	'flexls/source',
	{
		title: __( 'Source/Code' ),
		description: __( 'Display code snippets that respect your spacing and tabs.' ),
		category: 'common',
		icon: icons.source,
		parent: 'flexls/column',
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'Source', 'flexls' ),
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
							`component-source`,
						)}>
					<PlainText
						value={ content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Write code…' ) }
						aria-label={ __( 'Code' ) }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
