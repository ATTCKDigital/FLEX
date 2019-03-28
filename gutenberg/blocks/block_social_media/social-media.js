/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from 'icons';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Editable,
	MediaUpload,
	InspectorControls,
	URLInput,
	RichText,
	AlignmentToolbar,
	CheckboxControl

} = wp.editor;
const {
	Toolbar,
	Button,
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow
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


/**
 * Register social media block
 */
export default registerBlockType(
	'flexls/socialmedia',
	{
		title: __( 'Social Media', 'flexls' ),
		description: __( 'Display links to your social media accounts. Accounts ', 'flexls'),
		category: 'common',
		icon: icons.social,
		parent: ['flexls/column'],
		keywords: [
			__( 'Social media', 'flexls' ),
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
			align: {
				type: 'string',
				default: 'center'
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundColorOptionsAttributes
		},
		edit: props => {
			const { attributes: { facebook, twitter, instagram, linkedin, youtube, pinterest, align},
				className, setAttributes, isSelected } = props;

			return [
				<InspectorControls>
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
					<PanelBody
						title={ __( "Icon Alignment", "flexls" ) }
						className="flexls-icon-alignment"
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
						title={ __( "Social Media Options", "flexls" ) }
						className="flexls-social-media-options"
						initialOpen={ false }
					>
						<CheckboxControl
				            heading={__("Checkbox Control", "flexls")}
				            label={__("Check here", "flexls")}
				            help={__("Checkbox control help text", "flexls")}
				            checked={facebook}
				            onChange={facebook => setAttributes({ facebook })}
				          />
					</PanelBody>
				</InspectorControls>,
				<div 
					className={classnames(
						`component-social-media`,
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
							`social-media-list`,
							`align-${align}`,
						)}
					>
						<p>Hello</p>
					</div>
				</div>
			];
		},
		save() {
			return null;
		},
	},
);
