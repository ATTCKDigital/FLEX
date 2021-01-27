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
} = wp.blockEditor;
const {
	PanelBody,
	PanelRow,
	Spinner,
	SelectControl,
	RangeControl,
	ToggleControl,
	FormTokenField,
	TextControl
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
	'flexlayout/posts',
	{
		title: __('Posts'),
		description: __('A posts of selected post type.'),
		category: 'common',
		icon: icons.feed,
		// parent: ['flexlayout/column'],
		keywords: [
			__('Posts', 'flexlayout'),
			__('Archive', 'flexlayout'),
			__('Posts', 'flexlayout'),
		],
		attributes: {
			postType: {
				type: 'string',
				default: 'post'
			},
			ctaText: {
				type: 'string',
				default: 'post'
			},
			postPerPage: {
				type: Number,
				default: 12
			},
			columnNumber: {
				type: Number,
				default: 3,
			},
			categories: {
				type: 'array',
				default: []
			},
			paginationActive: {
				type: Boolean,
				default: true
			},
			filterActive: {
				type: Boolean,
				default: true
			},
			showExcerpt: {
				type: Boolean,
				default: false
			},
			showCategory: {
				type: Boolean,
				default: false
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
		},
		edit: withSelect((select, ownProps) => {
			const { getPostTypes, getEntityRecords } = select('core');
			const { categories, postType, postPerPage } = ownProps.attributes;

			const query = {
				per_page: postPerPage,
			}
			return {

				typesList: getPostTypes(),
				posts: getEntityRecords('postType', postType, query),
				categories: getEntityRecords('taxonomy', 'category')
			};
		})(({ posts, categories, className, isSelected, setAttributes, typesList, attributes }) => {

			if (!posts) {
				return (
					<p className={className} >
						<Spinner />
						{ __('Loading Posts', 'flexlayout')}
					</p>
				);
			}
			if (0 === posts.length) {
				return <p>{__('No Posts', 'flexlayout')}</p>;
			}
			return [
				<InspectorControls>
				
					<PanelBody title={__('Post Settings')}>
						<PanelRow>
							<SelectControl
								key="post-type"
								label={__('Post Type')}
								value= { attributes.postType ?? 'post' }
								onChange={ postType => setAttributes( { postType } ) }
								options= {
									typesList.map(type => ({
										label: __(type.name),
										value: type.slug,
										
									}))
								}
							/>
						</PanelRow>
						<PanelRow>
							<FormTokenField
								label="Select Category"
								value={ attributes.categories.map(category => category.name) }
								suggestions={ categories && categories.map(category => category.name) }
								onChange={ tokens => { 
									const selectedCategories = categories.filter(category => 
										tokens.some(token => 
											category.name.toLowerCase() === token.toLowerCase()
										)
									)
												
									setAttributes({
										categories: selectedCategories
									})
								}}
								placeholder="Select Categories"
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
									label="Post Per Page"
									value={ attributes.postPerPage ?? 1 }
									onChange={ postPerPage => setAttributes( { postPerPage } ) }
									min={ 1 }
									max={ 20 }
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
									label="Post Per Row"
									value={ attributes.columnNumber ?? 3 }
									onChange={ columnNumber => setAttributes( { columnNumber } ) }
									min={ 1 }
									max={ 8 }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Options">
						<PanelRow>
							<TextControl
								label="CTA Link Text"
								value={ attributes.ctaText }
								onChange={  ctaText => setAttributes( { ctaText } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Pagination"
								help={ attributes.paginationActive ? 'Pagination Activated' : 'Pagination Deactivated' }
								checked={ attributes.paginationActive }
								onChange={ paginationActive => setAttributes( { paginationActive } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Filter"
								help={ attributes.filterActive ? 'Filter Activated' : 'Filter Deactivated' }
								checked={ attributes.filterActive }
								onChange={ filterActive => setAttributes( { filterActive } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Excerpt"
								help={ attributes.showExcerpt ? 'Excerpt is active' : 'Filter Deactivated' }
								checked={ attributes.showExcerpt }
								onChange={ showExcerpt => setAttributes( { showExcerpt } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Category"
								help={ attributes.showCategory ? 'Category is Hidden' : 'Category Visible' }
								checked={ attributes.showCategory }
								onChange={ showCategory => setAttributes( { showCategory } ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				
				//okatodo: Make an Inspector control panel with post type and category selection and push that info back into the posts above
				<div className={classnames(
						'component-archive-posts',
					)}>
					<div>
						<ul>
							{attributes.categories && attributes.categories.map(category => {
								return (
									<li className={'category-tab'}>
										{category.name}
									</li>
								);
							})}
							<li>
								<a></a>
							</li>
						</ul>
					</div>
					<ul className={'posts-items'}>
						{posts.map(post => {
							return (
								<li className={'posts-item'} style={{flex: 1 / attributes.columnNumber}}>
									<div class="is-style-headline6">
										<a className={className} href={post.link}>
											{post.title.rendered}
										</a>
										<a className="cta-link" href={post.link}>{attributes.ctaText}</a>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			];
		}) // end withAPIData
		, // end edit

		save() {
			return null;
		},

	},
);
