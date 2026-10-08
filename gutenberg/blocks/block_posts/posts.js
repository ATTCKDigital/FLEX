// JS block file for displaying posts with ACF custom fields support and InnerBlocks layout design
import metadata from './block.json';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	FormTokenField,
	TextControl,
} = wp.components;
const { withSelect } = wp.data;
const ServerSideRender = wp.serverSideRender;

registerBlockType( metadata, {
	icon: 'format-aside',
	edit: withSelect( ( select, props ) => {
		const { attributes } = props;
		const { getPostTypes, getEntityRecords, getTaxonomies } =
			select( 'core' );
		const typesList = getPostTypes( { per_page: -1 } );
		const taxonomies = getTaxonomies();
		const currentTaxonomies = taxonomies?.filter( ( tax ) =>
			tax.types.includes( attributes.postType )
		);
		const termsMap = {};
		currentTaxonomies?.forEach( ( tax ) => {
			const terms = getEntityRecords( 'taxonomy', tax.slug );
			if ( terms ) {
				termsMap[ tax.slug ] = terms;
			}
		} );

		const query = {
			per_page: attributes.postPerPage,
			order: attributes.order?.toLowerCase(),
			orderby: attributes.orderBy,
			_embed: true,
			context: 'edit',
		};
		const posts = getEntityRecords(
			'postType',
			attributes.postType,
			query
		);
		let availableMetaKeys = [];
		if ( posts?.length && posts[ 0 ]?.meta ) {
			availableMetaKeys = Object.keys( posts[ 0 ].meta ).filter(
				( k ) => typeof posts[ 0 ].meta[ k ] === 'string'
			);
		}

		return {
			typesList,
			currentTaxonomies,
			termsMap,
			posts,
			availableMetaKeys,
		};
	} )( function EditBlock( {
		attributes,
		setAttributes,
		typesList,
		availableMetaKeys,
	} ) {
		const {
			postType,
			order,
			orderBy,
			postPerPage,
			columnNumber,
			showExcerpt,
			excerptWordLimit,
			showCategory,
			paginationActive,
			ctaText,
			customFields,
		} = attributes;
		const blockProps = useBlockProps();
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Settings' ) }>
						<SelectControl
							label={ __( 'Post Type' ) }
							value={ postType }
							onChange={ ( v ) =>
								setAttributes( {
									postType: v,
									filterCategories: {},
									customFields: [],
								} )
							}
							options={ typesList?.map( ( type ) => ( {
								label: type.labels.name,
								value: type.slug,
							} ) ) }
						/>
						<SelectControl
							label={ __( 'Order By' ) }
							value={ orderBy }
							onChange={ ( nextOrderBy ) =>
								setAttributes( { orderBy: nextOrderBy } )
							}
							options={ [
								{ label: 'Date', value: 'date' },
								{ label: 'Title', value: 'title' },
								{ label: 'Modified', value: 'modified' },
								{ label: 'Menu Order', value: 'menu_order' },
								{ label: 'Random', value: 'rand' },
							] }
						/>
						<SelectControl
							label={ __( 'Order' ) }
							value={ order }
							onChange={ ( nextOrder ) =>
								setAttributes( { order: nextOrder } )
							}
							options={ [
								{ label: 'Descending', value: 'DESC' },
								{ label: 'Ascending', value: 'ASC' },
							] }
						/>
						<RangeControl
							label={ __( 'Posts Per Page' ) }
							value={ postPerPage }
							min={ 1 }
							max={ 100 }
							onChange={ ( v ) =>
								setAttributes( { postPerPage: v } )
							}
						/>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columnNumber }
							min={ 1 }
							max={ 6 }
							onChange={ ( v ) =>
								setAttributes( { columnNumber: v } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Excerpt' ) }
							checked={ showExcerpt }
							onChange={ ( v ) =>
								setAttributes( { showExcerpt: v } )
							}
						/>
						<RangeControl
							label={ __( 'Excerpt Word Count' ) }
							value={ excerptWordLimit }
							min={ 1 }
							max={ 300 }
							onChange={ ( v ) =>
								setAttributes( { excerptWordLimit: v } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Category' ) }
							checked={ showCategory }
							onChange={ ( v ) =>
								setAttributes( { showCategory: v } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Pagination' ) }
							checked={ paginationActive }
							onChange={ ( v ) =>
								setAttributes( { paginationActive: v } )
							}
						/>
						<FormTokenField
							label={ __( 'Custom ACF Fields' ) }
							value={ customFields }
							suggestions={ availableMetaKeys }
							onChange={ ( tokens ) =>
								setAttributes( { customFields: tokens } )
							}
						/>
						<TextControl
							label={ __( 'CTA Button Text' ) }
							value={ ctaText }
							onChange={ ( v ) =>
								setAttributes( { ctaText: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<ServerSideRender
						block="flexlayout/posts"
						attributes={ attributes }
					/>
				</div>
			</>
		);
	} ),

	save: () => null,
} );
