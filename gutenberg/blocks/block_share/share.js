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
	InspectorControls,
	AlignmentToolbar
} = wp.blockEditor;
const {
	Toolbar,
	Button,
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow,
	CheckboxControl
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
// Import all of our Background Options requirements.
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses } from '../../components/gb-component_text-colors';
import ShareOutput from '../../blocks/block_share/share-output.js';

/**
 * Register social media block
 */
export default registerBlockType(
	'flex/share',
	{
		title: __( 'Share', 'FLEX' ),
		description: __( 'Displays share tools. Accounts are set in Global Settings ', 'FLEX'),
		category: 'common',
		icon: icons.share,
		parent: ['flex/column'],
		keywords: [
			__( 'Social media', 'FLEX' ),
			__( 'Share', 'FLEX' ),
		],
		attributes: {
			facebook: {
				type: 'boolean',
				default: false,
			},
			twitter: {
				type: 'boolean',
				default: false,
			},
			linkedin: {
				type: 'boolean',
				default: false,
			},
			email: {
				type: 'boolean',
				default: false,
			},
			align: {
				type: 'string',
				default: 'center'
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundColorOptionsAttributes,
			...TextColorAttributes

		},
		edit: props => {
			const { attributes: { facebook, twitter, linkedin, email, align},
				className, setAttributes, isSelected } = props;

			return [
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon Alignment', 'FLEX' ) }
						className="FLEX-icon-alignment"
						initialOpen={ false }
					>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Share Options', 'FLEX' ) }
						className="FLEX-share-options"
						initialOpen={ false }
					>
						<p>Set your accounts in Global Settings. Only platforms with set accounts will appear on the front end.</p>
						<CheckboxControl
							label={__('Show Facebook?', 'FLEX')}
							checked={facebook}
							onChange={facebook => setAttributes({ facebook })}
						/>
					  	<CheckboxControl
							label={__('Show Twitter?', 'FLEX')}
							checked={twitter}
							onChange={twitter => setAttributes({ twitter })}
					  	/>
					  	<CheckboxControl
							label={__('Show LinkedIn?', 'FLEX')}
							checked={linkedin}
							onChange={linkedin => setAttributes({ linkedin })}
					  	/>
					  	<CheckboxControl
							label={__('Show email?', 'FLEX')}
							checked={email}
							onChange={email => setAttributes({ email })}
					  	/>
					</PanelBody>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
					<BackgroundColorOptions
						{ ...props }
					/>
					<TextColorOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div
					className={classnames(
						'component-share',
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),
					)}
					style={ {
						...BackgroundColorOptionsInlineStyles( props ),
					} }
				>
					<div
						className={classnames(
							'share-list',
							`align-${align}`,
						)}
					>
						{ ShareOutput( props ) }
					</div>
				</div>
			];
		},
		save() {
			return null;
		},
	},
);
