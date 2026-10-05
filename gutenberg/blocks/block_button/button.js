// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
} = wp.blockEditor;

const { PanelBody, Dashicon, IconButton, CheckboxControl } = wp.components;

// Internal dependencies
import DataComponentNameOptions from '../../components/gb-component_data-component-name';
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
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
		onReplace,
		setAttributes,
		isSelected,
	} = props;

	const tagName = 'span';

	const blockProps = useBlockProps( {
		className: classnames(
			`component-button-editor`,
			`component-button`,
			`text-align-${ align }`,
			...MarginOptionsClasses( props )
		),
		'data-component-name': dataComponentName,
		'data-component-options': dataComponentOptions,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'flexlayout' ) }>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( {
								align: nextAlign,
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Open in new window?', 'flexlayout' ) }
						checked={ target }
						onChange={ ( isChecked ) =>
							setAttributes( { target: isChecked } )
						}
					/>
				</PanelBody>
				<MarginOptions { ...props } />
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					identifier="content"
					className={ classnames(
						'wp-block-button__link',
						className
					) }
					tagName={ tagName }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					onRemove={ () => onReplace( [] ) }
					formattingControls={ [] }
					placeholder={ placeholder || __( 'Button text…' ) }
					keepPlaceholderOnFocus
				/>
				{ isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ ( event ) => event.preventDefault() }
					>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<IconButton
							icon={ icons.check }
							label={ __( 'Apply' ) }
							type="submit"
						/>
					</form>
				) }
			</div>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: 'button',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
