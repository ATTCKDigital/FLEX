// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';

// Internal dependencies
const { wp } = window;
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

// Added 3/26/20 - https://ibenic.com/enable-inner-blocks-gutenberg/
// wp.editor.InnerBlocks.Content is deprecated.
// Please use wp.blockEditor.InnerBlocks.Content instead.
// const { InnerBlocks } = wp.editor;

const { AlignmentToolbar, InspectorControls, RichText } = wp.blockEditor;

const { PanelBody } = wp.components;

// Internal dependencies
import MarginOptions, {
	MarginOptionsAttributes,
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsAttributes,
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
import BorderOptions, {
	BorderOptionsAttributes,
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import TextColorOptions, {
	TextColorAttributes,
	TextColorClasses,
	TextColorInlineStyles,
} from '../../components/gb-component_text-colors';
import BackgroundColorOptions, {
	BackgroundColorOptionsAttributes,
	BackgroundColorOptionsInlineStyles,
} from '../../components/gb-component_background-color';

// Register block
export default registerBlockType( 'flexlayout/paragraph', {
	title: __( 'Paragraph', 'flexlayout' ),
	description: __( 'A simple text block', 'flexlayout' ),
	category: 'common',
	icon: icons.paragraph,
	example: {},
	// parent: ['flexlayout/column'],
	keywords: [
		__( 'Text', 'flexlayout' ),
		__( 'a', 'flexlayout' ),
		__( 'p', 'flexlayout' ),
		__( 'Paragraph', 'flexlayout' ),
		__( 'WYSIWYG', 'flexlayout' ),
		__( 'TinyMCE', 'flexlayout' ),
	],
	attributes: {
		align: {
			type: 'string',
			default: 'left',
		},
		content: {
			type: 'string',
			default: '',
		},
		placeholder: {
			type: 'string',
		},
		...MarginOptionsAttributes,
		...PaddingOptionsAttributes,
		...BorderOptionsAttributes,
		...TextColorAttributes,
		...BackgroundColorOptionsAttributes,
	},

	innerBlocks: [],

	styles: [
		{
			name: 'body1',
			label: __( 'Body 1', 'block style' ),
			isDefault: true,
		},
		{ name: 'body2', label: __( 'Body 2', 'block style' ) },
		{ name: 'body3', label: __( 'Body 3', 'block style' ) },
		{ name: 'body4', label: __( 'Body 4', 'block style' ) },
		{ name: 'subheadline1', label: __( 'Subheadline 1', 'block style' ) },
		{ name: 'subheadline2', label: __( 'Subheadline 2', 'block style' ) },
		{ name: 'eyebrow', label: __( 'Eyebrow', 'block style' ) },
		{ name: 'eyebrow-small', label: __( 'Eyebrow Small', 'block style' ) },
		{ name: 'text-columns', label: __( '2 Column Text', 'block style' ) },
	],

	edit: ( props ) => {
		const {
			attributes: { align, content, placeholder },
			className,
			onReplace,
			setAttributes,
		} = props;

		const onChangeMessage = ( newContent ) => {
			setAttributes( {
				content: newContent,
			} );
		};

		return [
			<InspectorControls key="inspector">
				<BackgroundColorOptions { ...props } />
				<TextColorOptions { ...props } />
				<BorderOptions { ...props } />
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<PanelBody
					title={ __( 'Paragraph Alignment', 'flexlayout' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Alignment', 'flexlayout' ) }</p>
					<AlignmentToolbar
						value={ align }
						initialOpen={ false }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</PanelBody>
			</InspectorControls>,
			<div
				key="block"
				className={ classnames(
					`component-paragraph`,
					`align-${ align }`,
					className,
					...MarginOptionsClasses( props ),
					...PaddingOptionsClasses( props ),
					...BorderOptionsClasses( props ),
					...TextColorClasses( props )
				) }
			>
				<RichText
					className={ classnames(
						// `align-${align}`,
						// ...MarginOptionsClasses(props),
						// ...PaddingOptionsClasses(props),
						// ...BorderOptionsClasses(props),
						...TextColorClasses( props )
					) }
					identifier="content"
					formattingControls={ [
						'bold',
						'italic',
						'strikethrough',
						'link',
					] }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/strikethrough',
						'core/link',
						'core/list',
						'core/list-item',
						'core/code',
						'core/underline',
						'core/text-color',
						// 'core/image',
						'core/subscript',
						'core/suberscript',
					] }
					// multiline='p' // <-- This is a critical differentiatorfrom the heading block
					tagName="p"
					onChange={ onChangeMessage }
					onRemove={ () => onReplace( [] ) }
					placeholder={ placeholder || __( 'Paragraph text…' ) }
					style={ {
						textAlign: align,
						...TextColorInlineStyles( props ),
						...BackgroundColorOptionsInlineStyles( props ),
					} }
					value={ content }
				/>
			</div>,
		];
	},

	save() {
		return null;
	},
} );
