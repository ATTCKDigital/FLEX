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
} = wp.editor;
const {
	Toolbar,
	Button,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,
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
	'flexlayout/users',
	{
		title: __( 'Users' ),
		description: __( 'A list of WordPress users.' ),
		category: 'common',
		icon: icons.users,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Staff', 'flexlayout' ),
			__( 'Users', 'flexlayout' ),
			__( 'Authors', 'flexlayout' ),
		],
		attributes: {
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
		},
		edit: withSelect( select => {
				const {getPostTypes} = select('core');

                return {

                    users: select( 'core' ).getAuthors()
                };
            } )( ( { users, className, isSelected, setAttributes } ) => {
                if ( ! users ) {
                    return (
                        <p className={className} >
                            <Spinner />
                            { __( 'Loading Users', 'flexlayout' ) }
                        </p>
                    );
                }
                if ( 0 === users.length ) {
                    return <p>{ __( 'No Users', 'flexlayout' ) }</p>;
                }
                return (
	                <InspectorControls>
		                <PanelBody title={ __( 'Select Users' ) }>
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
						</PanelBody>
					</InspectorControls>,
                	//okatodo: Make an Inspector control panel with post type and category selection and push that info back into the users above
	                <div className={ 'component-users' }>
		                <div className={ 'user-items' }>
	                        { users.map( user => {
	                            return (
	                                 <div className={ 'user-item' }>
	                                    <div className={'image-wrapper'}>
	                                    	<a className={ className } href={ user.link }>
	                                    	</a>
	                                    </div>
	                                    <h2 className={ 'headline6' }>
	                                    	<a className={ className } href={ user.link }>
		                                        { user.name }
		                                    </a>
		                                </h2>
		                                <h4 className={'caption2'}>{user.meta.title}</h4>
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
