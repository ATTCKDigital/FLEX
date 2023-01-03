console.log('loaded', '/FLEX\t/gutenberg\t/blocks\t/block_slides\t/slides.js');

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
	'flexlayout/slides',
	{
		title: __( 'Slides', 'flexlayout' ),
		description: __( 'Graphic slides.', 'flexlayout' ),
		category: 'common',
		icon: 'slides',
		example: {},
		// icon: icons.button,
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'slides', 'flexlayout' ),
			__( 'slide', 'flexlayout' ),
		],
		attributes: {
			automate: {
				type: 'boolean',
				default: true
			},
			showDots: {
				type: 'boolean',
				default: true
			},
			showArrows: {
				type: 'boolean',
				default: true
			},
			...DataComponentNameAttributes,
			...MarginOptionsAttributes
		},

		innerBlocks: [],

		styles: [
			{ name: 'carousel-bleed', label: __( 'Bleed (default)', 'block style' ), isDefault: true },
			{ name: 'carousel-contain', label: __( 'Contain', 'block style' ) },
		],

		edit: props => {
			const {
				attributes: {
					automate,
					content,
					dataComponentName,
					dataComponentOptions,
					showDots,
					showArrows,
				},
				className,
				setAttributes,
				isSelected
			} = props;
			
			const tagName = 'span';

			return ([
				<InspectorControls>
					<PanelBody title={ __( 'Carousel Settings', 'flexlayout' ) }>
						<CheckboxControl
							label={__('Show dots', 'flexlayout')}
							checked={showDots}
							onChange={showDots => setAttributes({ 'showDots': showDots })}
						/>
						<CheckboxControl
							label={__('Show arrows', 'flexlayout')}
							checked={showArrows}
							onChange={showArrows => setAttributes({ 'showArrows': showArrows })}
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
						`component-carousel`,
						...MarginOptionsClasses( props )
					)}
					data-component-name={ dataComponentName } 
					data-component-options={ dataComponentOptions }
					>
					SLIDES
				</div>
			]);

			// return ([
			// 	<div 
			// 		className={classnames(
			// 			`component-carousel`,
			// 			...MarginOptionsClasses( props )
			// 		)}
			// 		data-component-name={ dataComponentName } 
			// 		data-component-options={ dataComponentOptions }
			// 		>
			// 		<RichText
			// 			identifier="content"
			// 			className={ classnames(
			// 				'wp-block-button__link', 
			// 				className
			// 			)}
			// 			tagName={ tagName }
			// 			value={ content }
			// 			onChange={ ( value ) => setAttributes( { content: value } ) }
			// 			onRemove={ () => onReplace( [] ) }
			// 			formattingControls={ [] }
			// 			placeholder={ placeholder || __( 'Button text…' ) }
			// 			keepPlaceholderOnFocus
			// 		/>
			// 	</div>
			// ]);
		},

		save() {
			return null;
		},
	},
);
