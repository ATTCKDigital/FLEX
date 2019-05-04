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
} = wp.editor;
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
import SocialOptionsOutput from '../../blocks/block_social_media/social-media-output.js';

/**
 * Register social media block
 */
export default registerBlockType(
	'flexlayout/socialmedia',
	{
		title: __( 'Social Media', 'flexlayout' ),
		description: __( 'Display links to your social media accounts. Accounts are set in Global Settings ', 'flexlayout'),
		category: 'common',
		icon: icons.social,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Social media', 'flexlayout' ),
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
			instagram: {
				type: 'boolean',
				default: false,
			},
			linkedin: {
				type: 'boolean',
				default: false,
			},
			youtube: {
				type: 'boolean',
				default: false,
			},
			pinterest: {
				type: 'boolean',
				default: false,
			},
			medium: {
				type: 'boolean',
				default: false,
			},
			github: {
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
			const { attributes: { facebook, twitter, instagram, linkedin, youtube, pinterest, medium, align, github},
				className, setAttributes, isSelected } = props;

			return [
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon Alignment', 'flexlayout' ) }
						className="flexlayout-icon-alignment"
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
						title={ __( 'Social Media Options', 'flexlayout' ) }
						className="flexlayout-social-media-options"
						initialOpen={ false }
					>	
						<p>Set your accounts in Global Settings. Only platforms with set accounts will appear on the front end.</p>
						<CheckboxControl
							label={__('Show Facebook?', 'flexlayout')}
							checked={facebook}
							onChange={facebook => setAttributes({ facebook })}
						/>
					  	<CheckboxControl
							label={__('Show Twitter?', 'flexlayout')}
							checked={twitter}
							onChange={twitter => setAttributes({ twitter })}
					  	/>
					  	<CheckboxControl
							label={__('Show Instagram?', 'flexlayout')}
							checked={instagram}
							onChange={instagram => setAttributes({ instagram })}
					  	/>
					  	<CheckboxControl
							label={__('Show LinkedIn?', 'flexlayout')}
							checked={linkedin}
							onChange={linkedin => setAttributes({ linkedin })}
					  	/>
					  	<CheckboxControl
							label={__('Show pinterest?', 'flexlayout')}
							checked={pinterest}
							onChange={pinterest => setAttributes({ pinterest })}
					  	/>
					  	<CheckboxControl
							label={__('Show Medium?', 'flexlayout')}
							checked={medium}
							onChange={medium => setAttributes({ medium })}
					  	/>
					  	<CheckboxControl
							label={__('Show YouTube?', 'flexlayout')}
							checked={youtube}
							onChange={youtube => setAttributes({ youtube })}
					  	/>
					  	<CheckboxControl
							label={__('Show GitHub?', 'flexlayout')}
							checked={github}
							onChange={github => setAttributes({ github })}
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
						'component-social-media',
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
							'social-media-list',
							`align-${align}`,
						)}
					>
						{ SocialOptionsOutput( props ) }
					</div>
				</div>
			];
		},
		save() {
			return null;
		},
	},
);