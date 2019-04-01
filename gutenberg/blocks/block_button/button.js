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
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	URLInput
} = wp.editor;
const {
	Toolbar,
	Button,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,
	Dashicon,
	IconButton

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
	'flexls/button',
	{
		title: __( 'Button' ),
		description: __( 'Prompt visitors to take action with a custom button.' ),
		category: 'common',
		icon: icons.button,
		parent: ['flexls/column'],
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'Button', 'flexls' ),
			__( 'CTA', 'flexls' ),
		],
		attributes: {
			content: {
				type: 'string',
			},
			content2: {
				type: 'string',
			},
			url: {
				type: 'string',
			},
			url2: {
				type: 'string',
			},
			align: {
				type: 'string',
				default: 'left'
			},
			placeholder: {
				type: 'string',
			},
			...MarginOptionsAttributes
		},
		styles: [
			{ name: 'button-primary', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'button-secondary', label: __( 'Secondary', 'block style' ) },
			{ name: 'button-tertiary', label: __( 'Tertiary', 'block style' ) },
			{ name: 'button-negative', label: __( 'Negative', 'block style' ) },
		],

		edit: props => {
			const { attributes: { content, align, placeholder, url, content2, url2},
				className, setAttributes, isSelected } = props;
			const tagName = 'span';

			return ([
				<InspectorControls>
					<PanelBody title={ __( 'Button Alignment' ) }>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</PanelBody>
					<MarginOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div className={classnames(
							`component-button-editor`,
							`component-button`,
							`align-${align}`,
							...MarginOptionsClasses( props ),)}>
					<RichText
						identifier="content"
						className={ classnames('wp-block-button__link', className)}
						tagName={ tagName }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onRemove={ () => onReplace( [] ) }
						formattingControls={ [] }
						placeholder={ placeholder || __( 'Button text…' ) }
						keepPlaceholderOnFocus
					/>
					{ isSelected && (
						<form
							className="block-library-button__inline-link"
							onSubmit={ ( event ) => event.preventDefault() }>
							<Dashicon icon="admin-links" />
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { url: value } ) }
							/>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
					) }
					<RichText
						identifier="content2"
						className={ classnames('wp-block-button__link', className)}
						tagName={ tagName }
						value={ content2 }
						onChange={ ( value ) => setAttributes( { content2: value } ) }
						onRemove={ () => onReplace( [] ) }
						formattingControls={ [] }
						placeholder={ placeholder || __( 'Button text…' ) }
						keepPlaceholderOnFocus
					/>
					{ isSelected && (
						<form
							className="block-library-button__inline-link"
							onSubmit={ ( event ) => event.preventDefault() }>
							<Dashicon icon="admin-links" />
							<URLInput
								value={ url2 }
								onChange={ ( value ) => setAttributes( { url2: value } ) }
							/>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
					) }
				</div>
			]);

		},

		save() {
			return null;
		},

	},
);
