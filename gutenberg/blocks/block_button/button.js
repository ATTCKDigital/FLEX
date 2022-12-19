// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	RichText,
	URLInput
} = wp.blockEditor;

const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	Dashicon,
	IconButton,
	CheckboxControl
} = wp.components;

// Internal dependencies
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';

// Register block
export default registerBlockType(
	'flexlayout/button',
	{
		title: __( 'Buttons', 'flexlayout' ),
		description: __( 'Prompt visitors to take action with a custom button.', 'flexlayout' ),
		category: 'common',
		icon: 'button',
		// icon: icons.button,
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Button', 'flexlayout' ),
			__( 'CTA', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string',
				default: 'left'
			},
			content: {
				type: 'string',
			},
			placeholder: {
				type: 'string',
			},
			target: {
				type: 'boolean',
				default: false
			},
			url: {
				type: 'string',
			},
			...DataComponentNameAttributes,
			...MarginOptionsAttributes
		},

		innerBlocks: [],

		styles: [
			{ name: 'cta', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'cta-solid', label: __( 'Solid', 'block style' ) },
			{ name: 'cta-accent', label: __( 'Accent', 'block style' ) },
			{ name: 'cta-negative', label: __( 'Negative', 'block style' ) },
		],

		edit: props => {
			const {
				attributes: {
					align,
					content,
					dataComponentName,
					dataComponentOptions,
					placeholder,
					target,
					url,
				},
				className,
				setAttributes,
				isSelected
			} = props;
			
			const tagName = 'span';

			return ([
				<InspectorControls>
					<PanelBody title={ __( 'Button Settings', 'flexlayout' ) }>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( {
									align: nextAlign
								} );
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
					<DataComponentNameOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div 
					className={classnames(
						`component-button-editor`,
						`component-button`,
						`text-align-${align}`,
						...MarginOptionsClasses( props )
					)}
					data-component-name={ dataComponentName } 
					data-component-options={ dataComponentOptions }
				>
					<RichText
						identifier="content"
						className={ classnames(
							'wp-block-button__link', 
							className
						)}
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
							<IconButton 
								// icon="editor-break" 
								icon={ icons.check }
								label={ __( 'Apply' ) } 
								type="submit" />
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
