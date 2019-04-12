/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js'

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
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';


/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/source',
	{
		title: __( 'Source/Code' ),
		description: __( 'Display code snippets that respect your spacing and tabs.' ),
		category: 'common',
		icon: icons.source,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Source', 'flexlayout' ),
			__( 'Code', 'flexlayout' ),
		],
		attributes: {
			content: {
				type: 'string',
				default: '',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,		
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
					<PaddingOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div className={ classnames(
					`component-source`,
					...MarginOptionsClasses( props ),
					...PaddingOptionsClasses( props ),
					...BorderOptionsClasses( props ),
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
