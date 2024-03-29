// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js'

// Internal block libraries
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
} = wp.blockEditor;

const {
	Toolbar,
	CheckboxControl,
	Button,
	Dashicon,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
} = wp.components;


// Internal dependencies
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';

// Register block
export default registerBlockType(
	'flexlayout/video',
	{
		title: __( 'Video' ),
		// description: __( 'Add a video that plays inline', 'flexlayout' ),
		category: 'common',
		// icon: icons.video,
		icon: 'youtube',
		example: {},
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Video', 'flexlayout' ),
			__( 'YouTube', 'flexlayout' ),
			__( 'Vimeo', 'flexlayout' ),
		],
		attributes: {
			uploadVideo: {
				type: 'object',
			},
			videoThumbnail: {
				type: 'object',
			},
			youtubeVideo: {
				type: 'string',
			},
			brightcoveVideo: {
				type: 'string',
			},
			brightcoveAccount: {
				type: 'string',
			},
			controls: {
				type: 'string'
			},
			showControls: {
				type: 'boolean'
			},
			videoType: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...BorderOptionsAttributes,
		},

		edit: props => {
			const { 
				className, 
				setAttributes 
			} = props;

			const setVideoType = value => 			props.setAttributes( { videoType: value } );
			// const setVideoType = (value, e) => {
			// 	console.log('setVideoType, value: e:', value);
			// 	console.table(e);

			// 	props.setAttributes( { videoType: value } );
			// }
			
			const setUploadVideo = value => 		props.setAttributes( { uploadVideo: value } );
			const removeUploadVideo = () => 		props.setAttributes( { uploadVideo: null } );
			
			const setYoutubeVideo = value => 		props.setAttributes( { youtubeVideo: value } );

			const setShowControls = value => {
				// console.log('setShowControls, value: type: ', value, typeof value);

				if (value === true) {
					props.setAttributes( { 'controls': 'controls' } );
				} else {
					props.setAttributes( { 'controls': '' } );
				}

				props.setAttributes( { 'showControls': value } );
			};
			
			const setBrightcoveAccount = value => 	props.setAttributes( { brightcoveAccount: value } );
			const setBrightcoveVideo = value => 	props.setAttributes( { brightcoveVideo: value } );
			
			const setVideoThumbnail = value => 		props.setAttributes( { videoThumbnail: value } );
			const removeVideoThumbnail = () => 		props.setAttributes( { videoThumbnail: null } );

			const classes = classnames(
				className,
				'component-video',
				...MarginOptionsClasses( props ),
				...BorderOptionsClasses( props ),
			);

			const ShowControlsCheckbox = () => {
				// console.log('ShowControlsCheckbox, value: props.attributes.showControls: ', value, props.attributes.showControls);

				return (
					<CheckboxControl
						label="Show video controls"
						help="Shows play/pause/volume controls on hover"
						checked={ props.attributes.showControls }
						onChange={ setShowControls }
					/>
				)
			};

			// Only show thumbnail upload field only:
			const thumbnailSelect = (e) => {
				console.log('thumbnailSelect: props.attributes.videoType: ', props.attributes.videoType);

				// After a video type has been chosen, and...
				// if (typeof props.attributes.videoType !== 'undefined' && props.attributes.videoType !== '') {
					// if no thumbnail has been uploaded.
					if ( !props.attributes.videoThumbnail) {
						return(
							<div className="media-upload-wrapper">
								<p>
									<MediaUpload
										buttonProps={ {
											className: 'components-button button button-large',
										} }
										onSelect={ setVideoThumbnail }
										type="video"
										value=""
										render={ ( { open } ) => (
											<Button className="button button-large" onClick={ open }>
												<Dashicon icon="format-image"  /> { __( 'Upload Thumbnail' ) }
											</Button>
										) }
									/>
								</p>
								<p>
									{ __( 'Add/Upload a 1920x1080 video thumbnail.' ) }
								</p>
							</div>
						);
					};

					return (
						<div className="video-container">
							{ props.attributes.videoThumbnail ? (
								<p>
									<div className={'video-thumbnail-wrapper'}>
										<img
											src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
										/>
									</div>
								</p>
							) : null }
							{ props.isSelected ? (
								<div className="media-button-wrapper">
									<p>
										<Button
											className="remove-video button button-large"
											onClick={ removeVideoThumbnail }
										>
											<Dashicon icon="no-alt" /> { __( 'Remove Thumbnail' ) }
										</Button>
									</p>

									<p>
										{ __( 'Add/Upload a 1920x1080 video thumbnail.' ) }
									</p>
								</div>
							) : null }
						</div>
					);
				// }
			}

			const videoSelect = () => {
				console.log('videoSelect: props.attributes: props.attributes.videoType: ', props.attributes, props.attributes.videoType);

				// Only show this section if manual upload option was chosen
				if ( 'upload' !== props.attributes.videoType ) { //&& typeof props.attributes.videoType !== 'undefined' ) {
					console.log('videoSelect returning');

					return '';
				}

				// Only show these forms if a video upload hasn't been chosen yet
				if ( !props.attributes.uploadVideo ) {
					return (
						<div className="media-upload-wrapper">
							<p>
								<MediaUpload
									buttonProps={ {
										className: 'components-button button button-large',
									} }
									onSelect={ setUploadVideo }
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

				// Place the rendered video player in the editor body
				return (
					<div className="video-container">
						<p>
							<video autoplay loop muted className="video-container video-container-overlay">
								<source
									type="video/mp4"
									src={ props.attributes.uploadVideo ? props.attributes.uploadVideo.url : '' }
								/>
							</video>
						</p>
						{ props.isSelected ? (
							<div className="media-button-wrapper">
								<p>
									<Button
										className="remove-video button button-large"
										onClick={ removeUploadVideo }
										>
										<Dashicon icon="no-alt" /> { __( 'Remove Video' ) }
									</Button>
								</p>

								<p>
									{ __( 'Add/Upload an .mp4 video file.' ) }
								</p>
							</div>
						) : null }
						<ShowControlsCheckbox />
					</div>
				);
			};

			const youtubeVideoSelect = () => {
				if ( 'youtube' !== props.attributes.videoType ) {
					return '';
				}

				return (
					<TextControl
						label={__('YouTube ID', 'flexlayout')}
						help={__('Paste the ID of the YouTube Video.', 'flexlayout')}
						value={props.attributes.youtubeVideo ? props.attributes.youtubeVideo : ''}
						onChange={setYoutubeVideo}
					/>
				);
			};

			const brightcoveVideoSelect = () => {
				if ( 'brightcove' !== props.attributes.videoType ) {
					return '';
				}

				return (
					<div>
						<TextControl
							label={__('BrightCove Account ID', 'flexlayout')}
							help={__('Paste the ID of the BrightCove Account.', 'flexlayout')}
							value={ props.attributes.brightcoveAccount ? props.attributes.brightcoveAccount : '' }
							onChange={ setBrightcoveAccount}
						/>
						<TextControl
							label={__('BrightCove Video ID', 'flexlayout')}
							help={__('Paste the ID of the BrightCove Video.', 'flexlayout')}
							value={ props.attributes.brightcoveVideo ? props.attributes.brightcoveVideo : '' }
							onChange={ setBrightcoveVideo }
						/>
					</div>
				);
			};

			const uploadVideoOutput = () => {
				console.log('uploadVideoOutput: props:');
				console.table(props);

				console.log('uploadVideoOutput: props.attributes:');
				console.table(props.attributes);

				if ( 'upload' !== props.attributes.videoType ) {
					console.log('uploadVideoOutput returning');
					
					return '';
				}

				return (
					<div className="video-wrapper showVideo">
						{ props.attributes.videoThumbnail ? (
							<div className={'video-thumbnail-wrapper'}>
								<img
									src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
								/>
							</div>
						) : null }
						{/*Only show these controls in wp-admin*/}
						{/*<mark className={'play'} data-video-type={'upload'}></mark>*/}
						{ props.attributes.showControls ? (
								<video autoplay loop muted controls className="video-container video-container-overlay">
									<source
										type="video/mp4"
										src={ props.attributes.uploadVideo ? props.attributes.uploadVideo.url : '' }
									/>
								</video>
							) : (
								<video autoplay loop muted className="video-container video-container-overlay">
									<source
										type="video/mp4"
										src={ props.attributes.uploadVideo ? props.attributes.uploadVideo.url : '' }
									/>
								</video>
							)
						}
					</div>
				);
			};

			const youtubeVideoOutput = () => {
				if ( 'youtube' !== props.attributes.videoType ) {
					return '';
				}

				return (
					<div className={'video-wrapper'}>
						{ props.attributes.videoThumbnail ? (
							<div className={'video-thumbnail-wrapper'}>
								<img
									src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' }
								/>
							</div>
						) : null }
						<mark className={'play'} data-video-type={'youtube'}></mark>
						<iframe width="560" height="315" src={ props.attributes.youtubeVideo ? 'https://www.youtube.com/embed/'+props.attributes.youtubeVideo : '' } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				);
			};

			const brightcoveVideoOutput = () => {
				if ( 'brightcove' !== props.attributes.videoType ) {
					return '';
				}

				return (
					<div className={'video-wrapper'}>
						{ props.attributes.videoThumbnail ? (
							<div className={'video-thumbnail-wrapper'}>
								<img
									src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
								/>
							</div>
						) : null }
						<mark className={'play'} data-video-type={'brightcove'}></mark>
						<iframe
							src={ props.attributes.brightcoveVideo && props.attributes.brightcoveAccount  ? 'https://players.brightcove.net/'+props.attributes.brightcoveAccount+'/default_default/index.html?videoId='+props.attributes.brightcoveVideo : '' }
							allowFullScreen webkitallowfullscreen mozallowfullscreen></iframe>
					</div>
				);
			};

			const zeroStateOutput = () => {
				console.log('zeroStateOutput, props.attributes: ');
				console.table(props.attributes);

				if (typeof props.attributes.videoType || props.attributes.videoType !== '') {
					console.log('1.) zeroStateOutput, props.attributes: ');
					console.table(props.attributes);

					return (
						<div className="flex-center-center">
							{ icons.video }
							<p>{ 'Choose a video type from the block components panel.' }</p>
						</div>
					)
				} else {
					console.log('2.) zeroStateOutput, props.attributes: ');
					console.table(props.attributes);

					if ( props.attributes.videoType !== 'youtube' && props.attributes.videoType !== 'brightcove') {
						return (
							<div className="flex-center-center">
								{ icons.video }
								<p>{ 'Video type: ' + props.attributes.videoType }</p>
							</div>
						);
					} else {
						return '';
					}
				}
			}

			const svgHeight = {
				height: 0
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
						className="flexlayout-video-settings"
						>
						<PanelRow>
							<SelectControl
								key="video-type"
								value={ props.attributes.videoType ? props.attributes.videoType : '' }
								options={ [
									{
										label: __( 'Choose a video type' ),
										value: '',
									},
									{
										label: __( 'Upload a video' ),
										value: 'upload',
									},
									{
										label: __( 'YouTube' ),
										value: 'youtube',
									},
									{
										label: __( 'Brightcove' ),
										value: 'brightcove',
									},
								] }
								onChange={ setVideoType }
							/>
							{/* Use empty SVG to trigger onload event */}
							<img // onload hack fires when block is added
								className="onload-hack-pp"
								height="0"
								width="0"
								onLoad={ videoSelect }
								src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
								style={ svgHeight }
								/>
						</PanelRow>
						<PanelRow>
							{ videoSelect() }
							{ youtubeVideoSelect() }
							{ brightcoveVideoSelect() }
							{ thumbnailSelect() }
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				<div className={ classes }>
					{ zeroStateOutput() }
					{ uploadVideoOutput() }
					{ youtubeVideoOutput() }
					{ brightcoveVideoOutput() }
				</div>
			];
		},

		save() {
			return null;
		},
	},
);
