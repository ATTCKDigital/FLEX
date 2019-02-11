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

		/**
	 	* Renders a template inside of another template
	 	*/
		public static function render_template($file, $args = array()){
			$template = new Template($file, $args);
			$template->render();
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
		 * Format a WordPress date for the user.
		 *
		 * Use this helper to ensure consistent date formatting across the site.
		 */
		public static function format_date($d) {
			return date(SITE_DATE_FORMAT, strtotime($d));
		}

	}
