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
    SelectControl,
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
    'flexlayout/video',

    {
        title: __( 'Video' ),
        description: __( 'Add a video that plays inline', 'flexlayout' ),
        category: 'common',
        icon: icons.video,
        parent: ['flexlayout/column'],
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
            videoType: {
                type: 'string',
            },
            ...MarginOptionsAttributes,
            ...BorderOptionsAttributes,
        },



        edit: props => {

            const { className, setAttributes } = props;
            const setVideoType = value => props.setAttributes( { videoType: value } );
            const setUploadVideo = value => props.setAttributes( { uploadVideo: value } );
            const removeUploadVideo = () => props.setAttributes( { uploadVideo: null } );
            const setYoutubeVideo = value => props.setAttributes( { youtubeVideo: value } );
            const setBrightcoveAccount = value => props.setAttributes( { brightcoveAccount: value } );
            const setBrightcoveVideo = value => props.setAttributes( { brightcoveVideo: value } );
            const setVideoThumbnail = value => props.setAttributes( { videoThumbnail: value } );
            const removeVideoThumbnail = () => props.setAttributes( { videoThumbnail: null } );

            const classes = classnames(
                className,
                'component-video',
                ...MarginOptionsClasses( props ),
                ...BorderOptionsClasses( props ),
            );

            const thumbnailSelect = () => {
                if ( ! props.attributes.videoThumbnail ) {
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
                                            <Dashicon icon="format-video" /> { __( 'Upload Thumbnail' ) }
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
                        <p>
                            <div className={'video-thumbnail-wrapper'}>
                                <img
                                    src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
                                />
                            </div>
                        </p>
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
            }

            const videoSelect = () => {
                if ( 'upload' !== props.attributes.videoType ) {
                    return '';
                }
                if ( ! props.attributes.uploadVideo ) {
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

                return (
                    <div className="video-container">
                        <p>
                            <video className="video-container video-container-overlay">
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
                            value={props.attributes.brightcoveAccount ? props.attributes.brightcoveAccount : ''}
                            onChange={setBrightcoveAccount}
                        />
                        <TextControl
                            label={__('BrightCove Video ID', 'flexlayout')}
                            help={__('Paste the ID of the BrightCove Video.', 'flexlayout')}
                            value={props.attributes.brightcoveVideo ? props.attributes.brightcoveVideo : ''}
                            onChange={setBrightcoveVideo}
                        />
                    </div>
                );
            };

            const uploadVideoOutput = () => {
                if ( 'upload' !== props.attributes.videoType ) {
                    return '';
                }
                return (
                    <div className={'video-wrapper'}>
                        <div className={'video-thumbnail-wrapper'}>
                            <img
                                src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
                            />
                        </div>
                        <mark className={'play'} data-video-type={'upload'}></mark>
                        <video className="video-container video-container-overlay">
                            <source
                                type="video/mp4"
                                src={ props.attributes.uploadVideo ? props.attributes.uploadVideo.url : '' }
                            />
                        </video>
                    </div>
                );


            };

            const youtubeVideoOutput = () => {
                if ( 'youtube' !== props.attributes.videoType ) {
                    return '';
                }

                return (
                    <div className={'video-wrapper'}>
                        <div className={'video-thumbnail-wrapper'}>
                            <img
                                src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
                            />
                        </div>
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
                        <div className={'video-thumbnail-wrapper'}>
                            <img
                                src={ props.attributes.videoThumbnail ? props.attributes.videoThumbnail.url : '' }
                            />
                        </div>
                        <mark className={'play'} data-video-type={'brightcove'}></mark>
                        <iframe
                            src={ props.attributes.brightcoveVideo && props.attributes.brightcoveAccount  ? 'https://players.brightcove.net/'+props.attributes.brightcoveAccount+'/default_default/index.html?videoId='+props.attributes.brightcoveVideo : '' }
                            allowFullScreen webkitallowfullscreen mozallowfullscreen></iframe>
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
                        className="flexlayout-video-settings"
                    >
                        <PanelRow>
                            <SelectControl
                                key="video-type"
                                label={ __( 'Video Type' ) }
                                value={ props.attributes.videoType ? props.attributes.videoType : '' }
                                options={ [
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
                        </PanelRow>
                        <PanelRow>
                            { thumbnailSelect() }
                            { videoSelect() }
                            { youtubeVideoSelect() }
                            { brightcoveVideoSelect() }
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>,
                <div className={ classes }>
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
