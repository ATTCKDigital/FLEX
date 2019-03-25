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
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
} = wp.editor;
const {
	Toolbar,
	Button,
	Dashicon,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,

} = wp.components;

/**
 * Internal dependencies
 */

// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';


/**
	* Register block
 */
export default registerBlockType(
	'flexls/video',

	{
		title: __( 'Video' ),
		description: __( 'Add a video that plays inline', 'flexls' ),
		category: 'common',
		icon: icons.video,
		parent: 'flexls/column',
		keywords: [
			__( 'Video', 'flexls' ),
			__( 'YouTube', 'flexls' ),
			__( 'Vimeo', 'flexls' ),
		],
		supports: {
			anchor: true,
		},
		attributes: {
			backgroundVideo: {
				type: 'object',
			},
			...MarginOptionsAttributes,
			...BorderOptionsAttributes,
		},

		

		edit: props => {

			const { className, setAttributes } = props;
			const setBackgroundVideo = value => props.setAttributes( { backgroundVideo: value } );
			const removeBackgroundVideo = () => props.setAttributes( { backgroundVideo: null } );
			const classes = classnames(
				className,
				`component-video`,
				...MarginOptionsClasses( props ),
				...BorderOptionsClasses( props ),
			);

			const videoBackgroundSelect = () => {

				if ( ! props.attributes.backgroundVideo ) {
					return (
						<div className="media-upload-wrapper">
							<p>
								<MediaUpload
									buttonProps={ {
										className: 'components-button button button-large',
									} }
									onSelect={ setBackgroundVideo }
									type="video"
									value=""
									render={ ( { open } ) => (
										<Button className="button button-large" onClick={ open }>
											<Dashicon icon="format-video" /> { __( 'Upload Video' ) }
										</Button>
									) }
								/>
							</p>
							<p>
								{ __( 'Add/Upload an .mp4 video file.' ) }
							</p>
						</div>
					);
				}

				return (
					<div className="video-container">
						<p>
							<video className="video-container video-container-overlay">
								<source
									type="video/mp4"
									src={ props.attributes.backgroundVideo.url }
								/>
							</video>
						</p>
						{ props.isSelected ? (
							<div className="media-button-wrapper">
								<p>
									<Button
										className="remove-video button button-large"
										onClick={ removeBackgroundVideo }
									>
										<Dashicon icon="no-alt" /> { __( 'Remove Video' ) }
									</Button>
								</p>

								<p>
									{ __( 'Add/Upload an .mp4 video file.' ) }
								</p>
							</div>
						) : null }
					</div>
				);
			};

			const videoBackgroundOutput = () => {

				if ( ! props.attributes.backgroundVideo ) {
					return (
						<div className="video-wrapper">
							
						</div>
					);
				}

				return (
					<div className="video-wrapper">
						<mark class="play"></mark>
						<video className="video-container video-container-overlay">
							<source
								type="video/mp4"
								src={ props.attributes.backgroundVideo.url }
							/>
						</video>
					</div>
				);
			};

			return [
				<InspectorControls>
					<MarginOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
					<PanelBody 
						title={ __( 'Video Settings' ) }
						className="flexls-video-settings"
					>
						<PanelRow>
							{ videoBackgroundSelect() }
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				<div className={ classes }>
					{ videoBackgroundOutput() }
				</div>				
			];
		},

		save() {
			return null;
		},

	},
);
