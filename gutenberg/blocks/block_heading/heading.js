// Block dependencies
import classnames from 'classnames';
import HeadingToolbar from './heading-toolbar';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	InspectorControls,
	MediaUpload,
	RichText,
	URLInput,
	useBlockProps,
} = wp.blockEditor;

const { Button, CheckboxControl, PanelBody } = wp.components;

// Internal dependencies
import BackgroundColorOptions, {
	BackgroundColorOptionsInlineStyles,
} from '../../components/gb-component_background-color';
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import DataComponentNameOptions from '../../components/gb-component_data-component-name';
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
import TextColorOptions, {
	TextColorClasses,
	TextColorInlineStyles,
} from '../../components/gb-component_text-colors';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: {
			align,
			content,
			hangingQuoteClass,
			imgID,
			imgURL,
			level,
			placeholder,
			url,
		},
		onReplace,
		setAttributes,
	} = props;

	const setHangingQuote = ( value ) => {
		if ( value === true ) {
			props.setAttributes( {
				hangingQuoteClass: 'show-hanging-quote',
			} );
		} else {
			value = false;
			props.setAttributes( {
				hangingQuoteClass: 'hide-hanging-quote',
			} );
		}

		props.setAttributes( { hangingQuote: value } );
	};

	const HangingQuoteCheckbox = () => {
		return (
			<CheckboxControl
				label="Show hanging quote"
				help="Adds a left-hanging quote graphic"
				checked={ props.attributes.hangingQuote }
				onChange={ setHangingQuote }
			/>
		);
	};

	const onChangeMessage = ( newContent ) => {
		setAttributes( {
			content: newContent,
		} );
	};

	const onSelectImage = ( img ) => {
		setAttributes( {
			imgID: img.id,
			imgURL: img.url,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			imgID: null,
			imgURL: null,
		} );
	};

	const svgHeight = {
		height: 0,
	};

	const blockProps = useBlockProps( {
		className: classnames( `component-heading`, `${ hangingQuoteClass }` ),
		'data-component-name': props.attributes.dataComponentName,
		'data-component-options': props.attributes.dataComponentOptions,
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
					title={ __( 'Heading Settings' ) }
					initialOpen={ false }
				>
					<p>{ __( 'HTML Element' ) }</p>
					<HeadingToolbar
						minLevel={ 1 }
						maxLevel={ 7 }
						selectedLevel={ level }
						onChange={ ( newLevel ) =>
							setAttributes( { level: newLevel } )
						}
					/>
					<hr />
					<p>{ __( 'Text Alignment' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
					<hr />
					<p>
						<HangingQuoteCheckbox />
					</p>
					<hr />
					<p>{ __( 'Optional URL' ) }</p>
					<form
						className="block-library-button__inline-link heading-url"
						onSubmit={ ( event ) => event.preventDefault() }
					>
						<URLInput
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<Button icon="editor-break" text={ __( 'Apply' ) } />
					</form>
					<hr />
					<p>{ __( 'Icon left of the Heading' ) }</p>
					{ ! imgID ? (
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button
									className={ 'button button-large' }
									onClick={ open }
								>
									{ icons.upload }{ ' ' }
									{ __( 'Upload Image', 'flexlayout' ) }
								</Button>
							) }
						></MediaUpload>
					) : (
						<div
							className={ classnames(
								`image-wrapper`,
								`text-align-${ align }`
							) }
						>
							<Button
								className="remove-image"
								onClick={ onRemoveImage }
							>
								{ icons.remove }
							</Button>
							<img src={ imgURL } alt="" />
						</div>
					) }
				</PanelBody>
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<img
					// Use empty SVG to trigger onload event
					// Onload hack fires when block is added
					className="onload-hack-pp"
					height="0"
					width="0"
					onLoad={ setHangingQuote }
					src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
					style={ svgHeight }
					alt=""
				/>
				<img src={ imgURL } alt="" />
				<RichText
					className={ classnames(
						`text-align-${ align }`,
						`${ hangingQuoteClass }`,
						...BorderOptionsClasses( props ),
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...TextColorClasses( props )
					) }
					identifier="content"
					onChange={ onChangeMessage }
					onRemove={ () => onReplace( [] ) }
					placeholder={ placeholder || __( 'Heading text…' ) }
					style={ {
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
	icon: icons.heading,
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
