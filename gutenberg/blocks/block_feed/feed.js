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
	FormTokenField
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
		title: __('Feed'),
		description: __('A feed of posts.'),
		category: 'common',
		icon: icons.feed,
		// parent: ['flexlayout/column'],
		keywords: [
			__('Feed', 'flexlayout'),
			__('Archive', 'flexlayout'),
			__('Posts', 'flexlayout'),
		],
		attributes: {
			postType: {
				type: 'string',
				default: 'post'
			},
			paginationActive: {
				type: 'bool',
				default: true
			},
			postPerPage: {
				type: Number,
				default: 12
			},
			categories: {
				type: 'array',
				default: []
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
				
					<PanelBody title={__('Feed Post Type')}>
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
					</PanelBody>
				</InspectorControls>,
				
				//okatodo: Make an Inspector control panel with post type and category selection and push that info back into the posts above
				<div className={classnames(
						'component-archive-feed',
					)}>
					<div>
						<ul>
							{attributes.categories && attributes.categories.map(category => {
								return (
									<li className={'category-tab'}>
										<a>
											{category.name}
										</a>
									</li>
								);
							})}
							<li>
								<a></a>
							</li>
						</ul>
					</div>
					<ul className={'feed-items'}>
						{posts.map(post => {
							return (
								<li className={'feed-item'}>
									<h2 class="headline6">
										<a className={className} href={post.link}>
											{post.title.rendered}
										</a>
									</h2>
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
