// Internal block libraries
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, Spinner, RangeControl } = wp.components;
const { withSelect } = wp.data;

// Internal dependencies
import { MarginOptionsAttributes } from '../../components/gb-component_margin';
import { PaddingOptionsAttributes } from '../../components/gb-component_padding';

// Register block
export default registerBlockType( 'flexlayout/feed', {
	title: __( 'Feed' ),
	description: __( 'A feed of posts.' ),
	category: 'common',
	icon: 'welcome-widgets-menus',
	example: {},
	keywords: [
		__( 'Feed', 'flexlayout' ),
		__( 'Archive', 'flexlayout' ),
		__( 'Posts', 'flexlayout' ),
	],
	attributes: {
		excerptWordLimit: {
			type: 'number',
			default: 19,
		},
		...MarginOptionsAttributes,
		...PaddingOptionsAttributes,
	},
	edit: withSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );

		return {
			typesList: getPostTypes(),
			posts: select( 'core' ).getEntityRecords( 'postType', 'post', {
				per_page: 3,
			} ),
		};
	} )( ( { posts, className, setAttributes, attributes } ) => {
		if ( ! posts ) {
			return (
				<p className={ className }>
					<Spinner />
					{ __( 'Loading Posts', 'flexlayout' ) }
				</p>
			);
		}
		if ( 0 === posts.length ) {
			return <p>{ __( 'No Posts', 'flexlayout' ) }</p>;
		}
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Feed Settings' ) }>
						<PanelRow>
							<RangeControl
								label="Post Excerpt Word Length"
								value={ attributes.excerptWordLimit }
								onChange={ ( excerptWordLimit ) =>
									setAttributes( { excerptWordLimit } )
								}
								min={ 1 }
								max={ 50 }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className={ 'component-archive-feed' }>
					<div className={ 'feed-items' }>
						{ posts.map( ( post ) => {
							return (
								<div key={ post.id } className={ 'feed-item' }>
									<h2 className="headline6">
										<a
											className={ className }
											href={ post.link }
										>
											{ post.title.rendered }
										</a>
									</h2>
								</div>
							);
						} ) }
					</div>
				</div>
			</>
		);
	} ),
	save() {
		return null;
	},
} );
