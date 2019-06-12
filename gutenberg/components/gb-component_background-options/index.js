/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ColorPalette,
	PanelColorSettings,
	MediaUpload,
} = wp.editor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import BackgroundOptionsAttributes from './attributes';
import BackgroundOptionsClasses from './classes';
import BackgroundOptionsInlineStyles from './inline-styles';
import BackgroundOptionsVideoOutput from './video';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	BackgroundOptionsAttributes,
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
};

function BackgroundOptions( props ) {
	const setBackgroundType = value => props.setAttributes( { backgroundType: value } );

	const setBackgroundImage = value => props.setAttributes( { backgroundImage: value } );
	const removeBackgroundImage = () => props.setAttributes( { backgroundImage: null } );

	const setBackgroundImageMobile = value => props.setAttributes( { backgroundImageMobile: value } );
	const removeBackgroundImageMobile = () => props.setAttributes( { backgroundImageMobile: null } );

	const setBackgroundVideo = value => props.setAttributes( { backgroundVideo: value } );
	const removeBackgroundVideo = () => props.setAttributes( { backgroundVideo: null } );
	const setBackgroundVideoThumb = value => props.setAttributes( { backgroundVideoThumb: value } );
	const removeBackgroundVideoThumb = () => props.setAttributes( { backgroundVideoThumb: null } );

	const setBackgroundColor = value => props.setAttributes( { backgroundColor: value } );
	const setBackgroundPositionX = value => props.setAttributes( { backgroundPositionX: value } );
	const setBackgroundPositionY = value => props.setAttributes( { backgroundPositionY: value } );
	const setBackgroundSize = value => props.setAttributes( { backgroundSize: value } );
	const setBackgroundRepeat = value => props.setAttributes( { backgroundRepeat: value } );

	const setBackgroundPositionXMobile = value => props.setAttributes( { backgroundPositionXMobile: value } );
	const setBackgroundPositionYMobile = value => props.setAttributes( { backgroundPositionYMobile: value } );
	const setBackgroundSizeMobile = value => props.setAttributes( { backgroundSizeMobile: value } );
	const setBackgroundRepeatMobile = value => props.setAttributes( { backgroundRepeatMobile: value } );


	const imageBackgroundSelect = () => {
		if ( 'image' !== props.attributes.backgroundType ) {
			return '';
		}

		return (
			<div>
				{ !props.attributes.backgroundImage &&
					<div className="media-upload-wrapper">
						<p>
							<MediaUpload
								buttonProps={ {
									className: 'components-button button button-large',
								} }
								onSelect={ setBackgroundImage }
								type="image"
								value=""
								render={ ( { open } ) => (
									<Button className="button button-large" onClick={ open }>
										<Dashicon icon="format-image" /> { __( 'Add Image' ) }
									</Button>
								) }
							/>
						</p>
						<p>
							{ __( 'Add an image file. (.jpg, .png)' ) }
						</p>
					</div>
				}
				{ props.attributes.backgroundImage &&
						<div className="image-wrapper">
							<div className="media-button-wrapper">
								<p>
									<img
										src={ props.attributes.backgroundImage.url }
										alt={ props.attributes.backgroundImage.alt }
									/>
								</p>
								<p>
									<Button
										className="remove-image button button-large"
										onClick={ removeBackgroundImage }
									>
										<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
									</Button>
								</p>
								<p>
									{ __( 'Add/Upload an image file. (.jpg, .png)' ) }
								</p>
						</div>
					</div>
				}
				{ !props.attributes.backgroundImageMobile &&
					<div className="media-upload-wrapper">
						<p>
							<MediaUpload
								buttonProps={ {
									className: 'components-button button button-large',
								} }
								onSelect={ setBackgroundImageMobile }
								type="image"
								value=""
								render={ ( { open } ) => (
									<Button className="button button-large" onClick={ open }>
										<Dashicon icon="format-image" /> { __( 'Add Mobile Image' ) }
									</Button>
								) }
							/>
						</p>
						<p>
							{ __( 'Add optional mobile image file. (.jpg, .png) - Mobile image does not appear in preview.' ) }
						</p>
					</div>
				}
				{ props.attributes.backgroundImageMobile &&
					<div className="image-wrapper">
						<div className="media-button-wrapper">
							<p>
								<img
									src={ props.attributes.backgroundImageMobile.url }
									alt={ props.attributes.backgroundImageMobile.alt }
								/>
							</p>
							<p>
								<Button
									className="remove-image-mobile button button-large"
									onClick={ removeBackgroundImageMobile }
								>
									<Dashicon icon="no-alt" /> { __( 'Remove Mobile Image' ) }
								</Button>
							</p>
							<p>
								{ __( 'Add optional mobile image file. (.jpg, .png) - Mobile image does not appear in preview.' ) }
							</p>
						</div>
					</div>
				}

					{ props.attributes.backgroundImage &&
						<div className="image-wrapper">
							<PanelRow>
								<SelectControl
									key="background-position-x"
									label={ __( 'Background Position X' ) }
									value={ props.attributes.backgroundPositionX ? props.attributes.backgroundPositionX : '' }
									options={ [
										{
											label: __( 'Center' ),
											value: 'center',
										},
										{
											label: __( 'Left' ),
											value: 'left',
										},
										{
											label: __( 'Right' ),
											value: 'right',
										},
									] }
									onChange={ setBackgroundPositionX }
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									key="background-position-y"
									label={ __( 'Background Position Y' ) }
									value={ props.attributes.backgroundPositionY ? props.attributes.backgroundPositionY : '' }
									options={ [
										{
											label: __( 'Top' ),
											value: 'top',
										},
										{
											label: __( 'Center' ),
											value: 'center',
										},
										{
											label: __( 'Bottom' ),
											value: 'bottom',
										},
									] }
									onChange={ setBackgroundPositionY }
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Background Size', 'flexlayout')}
									help={__('Set background size. Use pixel value (widthpx heightpx), percentage (width% height%), cover or contain', 'flexlayout')}
									value={props.attributes.backgroundSize}
									onChange={setBackgroundSize}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									key="background-repeat"
									label={ __( 'Background Repeat' ) }
									value={ props.attributes.backgroundRepeat ? props.attributes.backgroundRepeat : '' }
									options={ [
										{
											label: __( 'No Repeat' ),
											value: 'no-repeat',
										},
										{
											label: __( 'Repeat' ),
											value: 'repeat',
										},
										{
											label: __( 'Repeat on X Axis' ),
											value: 'repeat-x',
										},
										{
											label: __( 'Repeat on Y Axis' ),
											value: 'repeat-y',
										},
									] }
									onChange={ setBackgroundRepeat }
								/>
							</PanelRow>
						</div>
					}
					{ props.attributes.backgroundImageMobile &&
						<div className="image-wrapper">
							<PanelRow>
								<h2 className="components-panel__body-title">Mobile Options</h2>
								<SelectControl
									key="background-position-x-mobile"
									label={ __( 'Background Position X (Mobile)' ) }
									value={ props.attributes.backgroundPositionXMobile ? props.attributes.backgroundPositionXMobile : '' }
									options={ [
										{
											label: __( 'Center' ),
											value: 'center',
										},
										{
											label: __( 'Left' ),
											value: 'left',
										},
										{
											label: __( 'Right' ),
											value: 'right',
										},
									] }
									onChange={ setBackgroundPositionXMobile }
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									key="background-position-y-mobile"
									label={ __( 'Background Position Y (Mobile)' ) }
									value={ props.attributes.backgroundPositionYMobile ? props.attributes.backgroundPositionYMobile : '' }
									options={ [
										{
											label: __( 'Top' ),
											value: 'top',
										},
										{
											label: __( 'Center' ),
											value: 'center',
										},
										{
											label: __( 'Bottom' ),
											value: 'bottom',
										},
									] }
									onChange={ setBackgroundPositionYMobile }
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Background Size (Mobile)', 'flexlayout')}
									help={__('Set background size. Use pixel value (widthpx heightpx), percentage (width% height%), cover or contain', 'flexlayout')}
									value={props.attributes.backgroundSizeMobile}
									onChange={setBackgroundSizeMobile}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									key="background-repeat-mobile"
									label={ __( 'Background Repeat (Mobile)' ) }
									value={ props.attributes.backgroundRepeatMobile ? props.attributes.backgroundRepeatMobile : '' }
									options={ [
										{
											label: __( 'No Repeat' ),
											value: 'no-repeat',
										},
										{
											label: __( 'Repeat' ),
											value: 'repeat',
										},
										{
											label: __( 'Repeat on X Axis' ),
											value: 'repeat-x',
										},
										{
											label: __( 'Repeat on Y Axis' ),
											value: 'repeat-y',
										},
									] }
									onChange={ setBackgroundRepeatMobile }
								/>
							</PanelRow>
						</div>
					}
			</div>
		);
	};

	const videoBackgroundSelect = () => {
		if ( 'video' !== props.attributes.backgroundType ) {
			return '';
		}

		return (
			<div>
				{ !props.attributes.backgroundVideo &&

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
							{ __( 'Add/Upload a 1920x1080 .mp4 video file.' ) }
						</p>
					</div>

				}
				{ props.attributes.backgroundVideo &&
						<div className="video-panel">
							<div className="video-wrapper margin-small-bottom-1x">
								<video className="video-container video-container-overlay">
									<source
										type="video/mp4"
										src={ props.attributes.backgroundVideo.url }
									/>
								</video>
							</div>
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
								</div>
							) : null }
						</div>
				}
				{ !props.attributes.backgroundVideoThumb &&
					<div className="media-upload-wrapper">
						<p>
							<MediaUpload
								buttonProps={ {
									className: 'components-button button button-large',
								} }
								onSelect={ setBackgroundVideoThumb }
								type="image"
								value=""
								render={ ( { open } ) => (
									<Button className="button button-large" onClick={ open }>
										<Dashicon icon="format-image" /> { __( 'Add Thumb' ) }
									</Button>
								) }
							/>
						</p>
						<p>
							{ __( 'Add a fallback image for when a video is unable to autoplay. (.jpg, .png)' ) }
						</p>
					</div>
				}
				{ props.attributes.backgroundVideoThumb &&
						<div className="image-wrapper">
							<div className="media-button-wrapper">
								<p>
									<img
										src={ props.attributes.backgroundVideoThumb.url }
										alt={ props.attributes.backgroundVideoThumb.alt }
									/>
								</p>
								<p>
									<Button
										className="remove-image button button-large"
										onClick={ removeBackgroundVideoThumb }
									>
										<Dashicon icon="no-alt" /> { __( 'Remove Thumb' ) }
									</Button>
								</p>
						</div>
					</div>
				}
			</div>
		);

	};

	const colorPanelSelect = () => {
		if ( 'color' !== props.attributes.backgroundType ) {
			return '';
		}
		return (
			<PanelColorSettings
				title={ __( 'Background Color' ) }
				colorSettings={ [
						{
							value: props.attributes.backgroundColor,
							onChange: setBackgroundColor,
							label: __( 'Background Color' ),
						}
				] }
			>
			</PanelColorSettings>
		);
	};

	return (
		<PanelBody
			title={ __( 'Background Options' ) }
			className="wds-background-options"
			initialOpen={ false }
		>
			<PanelRow>
				<SelectControl
					key="background-type"
					label={ __( 'Background Type' ) }
					value={ props.attributes.backgroundType ? props.attributes.backgroundType : '' }
					options={ [
						{
							label: __( 'None' ),
							value: '',
						},
						{
							label: __( 'Image' ),
							value: 'image',
						},
						{
							label: __( 'Video' ),
							value: 'video',
						},
						{
							label: __( 'Color' ),
							value: 'color',
						},
					] }
					onChange={ setBackgroundType }
				/>
			</PanelRow>
			<PanelRow>
				{ imageBackgroundSelect() }
				{ videoBackgroundSelect() }
				{ colorPanelSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default BackgroundOptions;
