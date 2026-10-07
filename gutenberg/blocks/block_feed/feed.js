import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, PanelRow, Spinner, RangeControl } = wp.components;
const { withSelect } = wp.data;

// Editor component. useBlockProps() is called before any early return (hooks rule),
// so the loading, empty and populated states all render inside the block root.
function FeedEdit( { posts, className, setAttributes, attributes } ) {
	const blockProps = useBlockProps( { className: 'component-archive-feed' } );

	if ( ! posts ) {
		return (
			<div { ...blockProps }>
				<p className={ className }>
					<Spinner />
					{ __( 'Loading Posts', 'flexlayout' ) }
				</p>
			</div>
		);
	}
	if ( 0 === posts.length ) {
		return (
			<div { ...blockProps }>
				<p>{ __( 'No Posts', 'flexlayout' ) }</p>
			</div>
		);
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
			<div { ...blockProps }>
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
}

const Edit = withSelect( ( select ) => {
	const { getPostTypes } = select( 'core' );

	return {
		typesList: getPostTypes(),
		posts: select( 'core' ).getEntityRecords( 'postType', 'post', {
			per_page: 3,
		} ),
	};
} )( FeedEdit );

// Register block
export default registerBlockType( metadata, {
	icon: 'welcome-widgets-menus',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
