// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal dependencies
const { wp } = window;
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const { AlignmentToolbar, InspectorControls, RichText, useBlockProps } =
	wp.blockEditor;

const { PanelBody } = wp.components;

// Internal dependencies
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import TextColorOptions, {
	TextColorClasses,
	TextColorInlineStyles,
} from '../../components/gb-component_text-colors';
import BackgroundColorOptions, {
	BackgroundColorOptionsInlineStyles,
} from '../../components/gb-component_background-color';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: { align, content, placeholder },
		onReplace,
		setAttributes,
	} = props;

	const onChangeMessage = ( newContent ) => {
		setAttributes( {
			content: newContent,
		} );
	};

	const blockProps = useBlockProps( {
		className: classnames(
			`component-paragraph`,
			`align-${ align }`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props ),
			...TextColorClasses( props )
		),
	} );

	return (
		<>
			<InspectorControls>
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
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					className={ classnames( ...TextColorClasses( props ) ) }
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
						'core/subscript',
						'core/suberscript',
					] }
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
			</div>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: icons.paragraph,
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
