// JS block file for displaying posts with ACF custom fields support and InnerBlocks layout design

const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;
const {
    InspectorControls,
    InnerBlocks,
    useBlockProps
} = wp.blockEditor;
const {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
    FormTokenField,
    TextControl,
    Spinner
} = wp.components;
const {withSelect} = wp.data;
const classnames = window.classnames;
const ServerSideRender = wp.serverSideRender;

registerBlockType('flexlayout/posts', {
    title: __('Posts'),
    description: __('Display posts with custom layout, InnerBlocks and ACF field options.'),
    category: 'common',
    icon: 'format-aside',
    attributes: {
        postType: {type: 'string', default: 'post'},
        postPerPage: {type: 'number', default: 12},
        order: {type: 'string', default: 'DESC'},
        orderBy: {type: 'string', default: 'date'},
        filterCategories: {type: 'object', default: {}},
        selectedPosts: {type: 'array', default: []},
        showExcerpt: {type: 'boolean', default: false},
        excerptWordLimit: {type: 'number', default: 20},
        columnNumber: {type: 'number', default: 3},
        ctaText: {type: 'string', default: 'Read More'},
        showCategory: {type: 'boolean', default: false},
        paginationActive: {type: 'boolean', default: true},
        filterActive: {type: 'boolean', default: true},
        customFields: {type: 'array', default: []},
        metaKey: {type: 'string', default: ''},

    },

    edit: withSelect((select, props) => {
        const {attributes} = props;
        const {getPostTypes, getEntityRecords, getTaxonomies} = select('core');
        const typesList = getPostTypes({per_page: -1});
        const taxonomies = getTaxonomies();
        const currentTaxonomies = taxonomies?.filter(tax => tax.types.includes(attributes.postType));
        const termsMap = {};
        currentTaxonomies?.forEach(tax => {
            const terms = getEntityRecords('taxonomy', tax.slug);
            if (terms) termsMap[tax.slug] = terms;
        });

        const query = {
            per_page: attributes.postPerPage,
            order: attributes.order?.toLowerCase(),
            orderby: attributes.orderBy,
            _embed: true,
            context: 'edit',
        };
        const posts = getEntityRecords('postType', attributes.postType, query);
        let availableMetaKeys = [];
        if (posts?.length && posts[0]?.meta) {
            availableMetaKeys = Object.keys(posts[0].meta).filter(k => typeof posts[0].meta[k] === 'string');
        }

        return {typesList, currentTaxonomies, termsMap, posts, availableMetaKeys};
    })(function EditBlock({
                              attributes,
                              setAttributes,
                              typesList,
                              currentTaxonomies,
                              termsMap,
                              posts,
                              availableMetaKeys
                          }) {
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
            customFields
        } = attributes;
        return [
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <SelectControl
                        label={__('Post Type')}
                        value={postType}
                        onChange={(v) => setAttributes({postType: v, filterCategories: {}, customFields: []})}
                        options={typesList?.map(type => ({label: type.labels.name, value: type.slug}))}
                    />
                    <SelectControl
                        label={__('Order By')}
                        value={orderBy}
                        onChange={orderBy => setAttributes({orderBy})}
                        options={[
                            {label: 'Date', value: 'date'},
                            {label: 'Title', value: 'title'},
                            {label: 'Modified', value: 'modified'},
                            {label: 'Menu Order', value: 'menu_order'},
                            {label: 'Random', value: 'rand'}
                        ]}
                    />
                    <SelectControl
                        label={__('Order')}
                        value={order}
                        onChange={order => setAttributes({order})}
                        options={[{label: 'Descending', value: 'DESC'}, {label: 'Ascending', value: 'ASC'}]}
                    />
                    <RangeControl label={__('Posts Per Page')} value={postPerPage} min={1} max={100}
                                  onChange={v => setAttributes({postPerPage: v})}/>
                    <RangeControl label={__('Columns')} value={columnNumber} min={1} max={6}
                                  onChange={v => setAttributes({columnNumber: v})}/>
                    <ToggleControl label={__('Show Excerpt')} checked={showExcerpt}
                                   onChange={v => setAttributes({showExcerpt: v})}/>
                    <RangeControl label={__('Excerpt Word Count')} value={excerptWordLimit} min={1} max={300}
                                  onChange={v => setAttributes({excerptWordLimit: v})}/>
                    <ToggleControl label={__('Show Category')} checked={showCategory}
                                   onChange={v => setAttributes({showCategory: v})}/>
                    <ToggleControl label={__('Show Pagination')} checked={paginationActive}
                                   onChange={v => setAttributes({paginationActive: v})}/>
                    <FormTokenField
                        label={__('Custom ACF Fields')}
                        value={customFields}
                        suggestions={availableMetaKeys}
                        onChange={(tokens) => setAttributes({customFields: tokens})}
                    />
                    <TextControl label={__('CTA Button Text')} value={ctaText}
                                 onChange={(v) => setAttributes({ctaText: v})}/>
                </PanelBody>
            </InspectorControls>,

            <div className="wp-block-flexlayout-posts">
                <ServerSideRender
                    block="flexlayout/posts"
                    attributes={attributes}
                />
            </div>
        ];
    }),

    save: () => null
});
