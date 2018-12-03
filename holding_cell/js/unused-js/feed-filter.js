// Category filtering for news feeds.
//
function FeedFilter ($el) {
	this.init = function ($el) {
		this.$el = $el;

		this.initEvents();

		return this;
	};

	this.initEvents = function () {
		// Toggle the related popup when clicking a filter link. 
		this.$el.on("click", "[data-action=toggle-filter]", function(e) {
			e.preventDefault();

			let $trigger = $(e.currentTarget);
			let $list    = this.$el.find( $trigger.attr("href") );

			$list.toggleClass("active");
		}.bind(this));

		this.$el.on("click", ".filter a", function (e) {
            // Close the popup when clicking a link.
            var $target = $(e.currentTarget);

            if($target.hasClass('clickThru')) {
                //if this link should click thru instead of ajax load
            } else {
                e.preventDefault();
            }
            
            

            let $list = $target.closest(".filter");
            $list.removeClass("active");

            //change the category of the filter
            var filterText = $target.text();
            var filterClass = $target.attr('class');
            var filterID = $target.closest('.filter').attr('id');
            this.$el.find('.filter-item[href="#'+filterID+'"] span').text(filterText);


            //****AJAX LOAD****//
            //get the parameters
            var $section = $('.feed').first();
            var item = $section.find('.feed-item');
            var type = $section.attr('data-post-type');
            var postCount = $section.attr('data-post-count');
            var postIDs = $section.attr('data-post-ids');
            var meta = $section.attr('data-meta');
            var catExclude = $section.attr('data-cat-exclude');
            var meta = $section.attr('data-meta');
            var search = $section.attr('data-search');
            var postCount = $section.attr('data-post-count');
            var order = $section.attr('data-order');
            var orderby = $section.attr('data-orderby');
            var eventTime = $section.attr('data-event-time');

            //remove existing items
            $section.find('.feed-item').remove();
            $section.find('.error-item').remove();

            // check if the clicked item has a category, if not, find the feed category (for when you select a category AND THEN a region)
            if($target.attr('data-category')) {
                var categoryID = $target.attr('data-category');
            } else {
                if(filterClass == 'all'){
                    var categoryID = '';
                } else {
                    var categoryID = $section.attr('data-category')
                }
            }

            //check if the clicked item has a region, if not, find the feed region (for when you select a region AND THEN a category)
            if($target.attr('data-region')) {
                var region = $target.attr('data-region');
                var taxonomy = $target.attr('data-taxonomy');
            } else {
                if(filterClass == 'all') {
                    var region = '';
                    var taxonomy = '';
                } else {
                    var region = $section.attr('data-region')
                    var taxonomy = $section.attr('data-taxonomy');
                }
            }



            if(filterClass == 'all') {
                region = ''
                taxonomy = ''
                categoryID = ''
            } else {
                region = region
                taxonomy = taxonomy
                categoryID = categoryID
            }

            var data = {
                action: 'filter_posts', // function to execute load-more.php
                afp_nonce: afp_vars.afp_nonce, // wp_nonce
                category: categoryID, // selected category
                type: type,
                taxonomy: taxonomy,
                region: region,
                postCount: postCount,
                catExclude: catExclude, //excluded categories
                meta: meta,
                search: search,
                ids: postIDs,
                order: order,
                orderby: orderby,
                eventTime: eventTime,
                meta: meta

            };



            $.ajax({
                type: 'post',
                dataType: 'json',
                url: afp_vars.afp_ajax_url,
                data: data,
                success: function( data, textStatus, XMLHttpRequest ) {
                    //add new posts
                    if(data.status == '404') {
                        //display "no posts found" and hide button if there are no results
                        $section.append(data.response);
                        $section.find('#loadMore').hide();
                    } else {
                        //add new posts
                        $section.append( data.response );

                        var $grid = $('.masonryFeed').masonry({
                            itemSelector: '.feed-item',
                            //use element for option
                            columnWidth: '.grid-sizer',
                            gutter: '.gutter-sizer',
                            percentPosition: true,
                            transitionDuration: 0,
                        });

                        // define new elements
                        var $newElems = $('.new-elements');

                        // relayout new items to fit into masonry grid
                        $grid.imagesLoaded( function() {
                            $grid.append( $newElems ).masonry( 'appended', $newElems );
                        });   

                        //show load more button if it is hidden
                        $('#loadMore').show();

                        //deactivate load more button when there are no more posts to load
                        if($('.new-elements:last-child').data('max-pages') == 1) {
                            $section.find('#loadMore').text('End of posts').addClass('button-inactive');
                        }                        
                    }

                },
                error: function( MLHttpRequest, textStatus, errorThrown ) {
                    $section.find('#loadMore').text(textStatus).addClass('button-inactive');
                    
                },
                complete: function(){
                    //removing classes to show the new items on ajax complete because masonry layoutcomplete does not work
                    var $loadedElems = $('.new-elements');
                    $loadedElems.addClass('slideIn').removeClass('new-elements');
                    $('.slideIn').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){ 
                        $('.feed-item').removeClass('slideIn');
                    });
                }
            })

		}.bind(this));
	};




	return this.init($el);
}

export default FeedFilter;
