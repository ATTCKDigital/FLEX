<?php
	/**
	 * PHP Templating class. Works similar to Mustache, Underscore, etc. Use
	 *  Utils::render_template() to instantiate.
	 */
	class Template {
		private $args;
		private $file;

		public function __get($name) {
			return $this->args[$name];
		}

		public function __construct($file, $args = array()) {
			$this->file = $file;
			$this->args = $args;
		}

		public function __isset($name){
			return isset( $this->args[$name] );
		}

		public function render() {
			if( locate_template($this->file) ){
				include( locate_template($this->file) );
			} else {
				throw new Exception("Error rendering template: template not found: ".print_r($this->file, true));
			}
		}
	}

	class Utils {
		public static function get_body_classes() {
			$classes = array();

			// Adds a unique class for the route.
			// TODO - make this preserve the whole route hierarchy, not just the basename.
			$classes[] = 'route-'.basename(get_permalink());

			// Add a class if we have the secondary nav.
			if ( Utils::has_secondary_nav() ) {
				$classes[] = "has-secondary-nav";
			}

			return $classes;
		}

		public static function has_secondary_nav() {
			global $post;

			$field = get_field('page_secondary_nav');

			return !!$field;
		}

		public static function render_template($file, $args = array()){
			$template = new Template($file, $args);
			$template->render();
		}

		public static function body_attributes() {
			global $BODY_ATTRIBUTES;

			$pairs = array();

			foreach ($BODY_ATTRIBUTES as $attr => $val) {
				$pairs[] = ($attr . '="' . $val . '"');
			}

			return join(" ", $pairs);
		}

		/**
		 * Get current page depth
		 *
		 * @return integer
		 */
		public static function get_current_page_depth() {
			global $wp_query;

			$object = $wp_query->get_queried_object();
			$parent_id  = $object->post_parent;
			$depth = 0;
			while($parent_id > 0){
				$page = get_page($parent_id);
				$parent_id = $page->post_parent;
				$depth++;
			}

		 	return $depth;
		}

		/**
		 * Return a list of categories for a post, ordered hierarchically.
		 */
		public static function get_post_categories($post_id) {
			$categories = get_the_category($post_id);

			// Assemble a tree of category relationships
			// Also re-key the category array for easier
			// reference
			$category_tree = array();
			$keyed_categories = array();

			foreach( (array)$categories as $c ) {
			    $category_tree[$c->cat_ID] = $c->category_parent;
			    $keyed_categories[$c->cat_ID] = $c;
			}

			// Now loop through and create a tiered list of
			// categories
			$tiered_categories = array();
			$tier = 0;

			// This is the recursive bit
			while ( !empty( $category_tree ) ) {
			    $cats_to_unset = array();
			    foreach( (array)$category_tree as $cat_id => $cat_parent ) {
			        if ( !in_array( $cat_parent, array_keys( $category_tree ) ) ) {
			            $tiered_categories[$tier][] = $cat_id;
			            $cats_to_unset[] = $cat_id;
			        }
			    }

			    foreach( $cats_to_unset as $ctu ) {
			        unset( $category_tree[$ctu] );
			    }
			    $tier++;
			}

			// Walk through the tiers to order the cat objects properly
			$ordered_categories = array();
			foreach( (array)$tiered_categories as $tier ) {
			    foreach( (array)$tier as $tcat ) {
			        $ordered_categories[] = $keyed_categories[$tcat];
			    }
			}

			$category_names = array();

			// Now you can loop over them and do whatever you want
			foreach( (array)$ordered_categories as $oc ) {
				$category_names[] = $oc->cat_name;
			}

			return $category_names;
		}

		public static function get_css_theme_class() {
			$theme_class = get_sub_field('theme');
			if (is_array($theme_class) && count($theme_class) < 1) {
				$theme_class = "";
			}

			return $theme_class;
		}

		public static function get_story_overlay_fields() {
			$overlay_text_params = array();

			if( get_sub_field('image_overlay_text') ):
				$overlay_text_params = array(
					"text" => get_sub_field('image_overlay_text'),
				);

				if ( get_sub_field('image_overlay_title') ):
					$overlay_text_params["title"] = get_sub_field('image_overlay_title');
				endif;

				if( get_sub_field('cta_internal_link') === 'internal' ):
					$overlay_text_params["cta_link"] = get_sub_field('cta_page');
					$overlay_text_params["cta_text"] = get_sub_field('cta_text');
				elseif( get_sub_field('cta_internal_link') === 'external' ):
					$overlay_text_params["cta_link"] = get_sub_field('cta_url');
					$overlay_text_params["cta_text"] = get_sub_field('cta_text');
				endif;
			endif;

			return $overlay_text_params;
		}

		public static function get_image_position_css_class() {
			if ( !get_sub_field('image_position') || get_sub_field('image_position') == '' ) {
				return 'image-left';
			}

			return 'image-' . get_sub_field('image_position');
		}

		/**
		 * Format a WordPress date for the user.
		 *
		 * Use this helper to ensure consistent date formatting across the site.
		 */
		public static function format_date($d) {
			return date(SITE_DATE_FORMAT, strtotime($d));
		}

		/**
		 * Modification of "Build a tree from a flat array in PHP"
		 *
		 * Authors: @DSkinner, @ImmortalFirefly and @SteveEdson
		 *
		 * @link http://stackoverflow.com/a/28429487/2078474
		 */
		public static function build_tree( array &$elements, $parentId = 0 )
		{
		    $branch = array();
		    foreach ( $elements as &$element )
		    {
		        if ( $element->menu_item_parent == $parentId )
		        {
		            $children = self::build_tree( $elements, $element->ID );
		            if ( $children )
		                $element->wpse_children = $children;

		            $branch[$element->ID] = $element;
		            unset( $element );
		        }
		    }
		    return $branch;
		}

		/**
		 * Transform a navigational menu to it's tree structure
		 *
		 * @uses  build_tree()
		 * @uses  wp_get_nav_menu_items()
		 *
		 * @param  String     $menud_id
		 * @return Array|null $tree
		 */
		public static function nav_menu_to_tree( $menu_id )
		{
		    $items = wp_get_nav_menu_items( $menu_id );
		    return  $items ? self::build_tree( $items, 0 ) : null;
		}

		/**
		 * Traverse a tree of navigational elements (posts), and return the ID of
		 * 	the branch containing the selected post ID.
		 */
		public static function find_nav_tree_branch_containing( $tree, $id ) {
			error_log("-------called find_nav_tree_branch_containing: $id");

			foreach ($tree as $menu_item) {
				// Found it! Base case.
				// Note that we compare the object_id (ID of the post/page we're looking for),
				//   But actually return the ID of the menu item, since that's what the tree contains.
				// error_log("-------checking object id: $menu_item->object_id");
				if ($menu_item->object_id == $id) {
					// error_log("-------FOUND, returning: $menu_item->ID");
					return $menu_item->ID;
				}

				if ($menu_item->wpse_children && count($menu_item->wpse_children) > 0) {
					//error_log("-------checking children of: $menu_item->ID");
					$child_found = self::find_nav_tree_branch_containing( $menu_item->wpse_children, $id );

					if ($child_found !== false) {
						// error_log("-------Child FOUND, returning $menu_item->ID");
						return $menu_item->ID;
					}
				}

			}

			return false;
		}
	}
