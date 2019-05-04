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
	BlockControls,
	InspectorControls,
} = wp.editor;
const {
	PanelBody,
	PanelRow,
	Spinner,
	SelectControl,

} = wp.components;
const { 
	withSelect 
} = wp.data;


/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Text Color Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/feed',
	{
		title: __( 'Feed' ),
		description: __( 'A feed of posts.' ),
		category: 'common',
		icon: icons.feed,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Feed', 'flexlayout' ),
			__( 'Archive', 'flexlayout' ),
			__( 'Posts', 'flexlayout' ),
		],
		attributes: {
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
		},
		edit: withSelect( select => {
				const {getPostTypes} = select('core');

                return {

			        typesList: getPostTypes(),
                    posts: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
                };
            } )( ( { posts, className, isSelected, setAttributes, typesList } ) => {
                if ( ! posts ) {
                    return (
                        <p className={className} >
                            <Spinner />
                            { __( 'Loading Posts', 'flexlayout' ) }
                        </p>
                    );
                }
                if ( 0 === posts.length ) {
                    return <p>{ __( 'No Posts', 'flexlayout' ) }</p>;
                }
                return (
	                <InspectorControls>
		                <PanelBody title={ __( 'Feed Post Type' ) }>
			                <PanelRow>
								<SelectControl
									key="post-type"
									label={ __( 'Post Type' ) }
									options={ [
										{
											label: __( 'Post' ),
											value: 'post',
										},
										
									] }
								/>
							</PanelRow>
			                <PanelRow>
								<SelectControl
									key="feed-categroy"
									label={ __( 'Feed Category' ) }
									options={ [
										{
											label: __( 'Post' ),
											value: 'post',
										},
										
									] }
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									key="feed-number"
									label={ __( 'Number of posts to display' ) }
									options={ [
										{
											label: __( 'Post' ),
											value: 'post',
										},
										
									] }
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>,
                	//okatodo: Make an Inspector control panel with post type and category selection and push that info back into the posts above
	                <div className={ 'component-archive-feed' }>
		                <div className={ 'feed-items' }>
	                        { posts.map( post => {
	                            return (
	                                 <div className={ 'feed-item' }>
	                                    <h2 class="headline6">
	                                    	<a className={ className } href={ post.link }>
		                                        { post.title.rendered }
		                                    </a>
		                                </h2>
	                                </div>
	                            );
	                        }) }
		                </div>
		            </div>
                );
            } ) // end withAPIData
        , // end edit

		save() {
			return null;
		},

	},
);
