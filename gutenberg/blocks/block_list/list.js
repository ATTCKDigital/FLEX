/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js'
import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect, useRegistry } from '@wordpress/data';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	AlignmentToolbar,
	InspectorControls,
	RichTextToolbarButton,
	MediaUpload,
	URLInput,
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	ToolbarButton
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
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';

/**
 * Register block
 */
export default registerBlockType(
	'flexlayout/list',
	{
		title: __( 'List' ),
		description: __( 'A text list block' ),
		category: 'common',
		icon: 'editor-ul',
		example: {},
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'List', 'flexlayout' ),
		],
		attributes: {
			ordered: {
				type: 'boolean',
				default: false,
			},
			content: {
				type: 'array',
				default: [],
			},
			placeholder: {
				type: 'string',
			},
			align: {
				type: 'string',
				default: 'left'
			},

			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes

		},
		styles: [
			{ name: 'default', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'list-columns', label: __( '2 Column List', 'block style' ) },
		],

		edit: (props) => {
			const {
			  attributes: { content, align, ordered, placeholder },
			  setAttributes,
			  className,
			} = props;
		  
			const onChangeContent = (content) => setAttributes({ content });
			const toggleOrderedList = () => setAttributes({ ordered: !ordered });
		  
			return (
			  <>
				<InspectorControls>
				  <MarginOptions {...props} />
				  <PaddingOptions {...props} />
				  <BorderOptions {...props} />
				  <PanelBody title={__('List Settings')}>
					<AlignmentToolbar
					  value={align}
					  onChange={(nextAlign) => setAttributes({ align: nextAlign })}
					/>
					<PanelRow>
					  <label htmlFor="ordered-toggle">
						{__('List order:')}
					  </label>
					  <Button
						isPrimary={ordered}
						isSecondary={!ordered}
						onClick={toggleOrderedList}
						id="ordered-toggle"
					  >
						{ordered ? __('Ordered (ol)') : __('Unordered (ul)')}
					  </Button>
					</PanelRow>
				  </PanelBody>
				  <TextColorOptions {...props} />
				</InspectorControls>
				<div
				  className={classnames(
					`component-list`,
					`align-${align}`,
					className,
					...MarginOptionsClasses(props),
					...PaddingOptionsClasses(props),
					...BorderOptionsClasses(props),
					...TextColorClasses(props),
				  )}
				>
				  <RichText
				  	identifier="content"
					multiline="li"
					tagName={ordered ? 'ol' : 'ul'}
					value={content}
					onChange={(newContent) => setAttributes({ content: newContent })}
					placeholder={__('Write list…')}
					style={{
					  textAlign: align,
					  ...TextColorInlineStyles(props),
					}}
					className={classnames( // Apply text color classes directly to the list element
						...TextColorClasses(props)
					)}
					allowedFormats={[
					  'core/bold',
					  'core/italic',
					  'core/link',
					]}
					// __unstablePreserveWhiteSpace
				  />
				</div>
			  </>
			);
		  },

		save(data) {
			console.log('list.js > save(data:) "', data.attributes.content, '" ', data);

			return null;
		},

	},
);
