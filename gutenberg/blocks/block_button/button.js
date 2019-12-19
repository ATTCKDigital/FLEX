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
	InspectorControls,
	URLInput
} = wp.editor;
const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	Dashicon,
	IconButton,
	CheckboxControl

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
	'flexlayout/button',
	{
		title: __( 'Button' ),
		description: __( 'Prompt visitors to take action with a custom button.' ),
		category: 'common',
		icon: icons.button,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Button', 'flexlayout' ),
			__( 'CTA', 'flexlayout' ),
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
			target: {
				type: 'boolean',
				default: 'false'
			},
			...MarginOptionsAttributes
		},
		styles: [
			{ name: 'cta', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'cta-solid', label: __( 'Solid', 'block style' ) },
			{ name: 'cta-accent', label: __( 'Accent', 'block style' ) },
			{ name: 'cta-negative', label: __( 'Negative', 'block style' ) },
		],

		edit: props => {
			const { attributes: { content, align, placeholder, url, content2, url2, target},
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
						<CheckboxControl
							label={__('Open in new window?', 'flexlayout')}
							checked={target}
							onChange={target => setAttributes({ target })}
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
