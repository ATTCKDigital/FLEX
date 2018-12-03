<?php
// /**
//  * Navbar menu with extremely basic markup
//  *
//  * @author Thomas Scholz http://toscho.de
//  * @version 1.0
//  */
// class _NavbarWalker extends Walker_Nav_Menu
// {
//     /**
//      * Start the element output.
//      *
//      * @param  string $output Passed by reference. Used to append additional content.
//      * @param  object $item   Menu item data object.
//      * @param  int $depth     Depth of menu item. May be used for padding.
//      * @param  array $args    Additional strings.
//      * @return void
//      */
//     public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 )
//     {
        
//         $activeMenuItemClass = (in_array('current-menu-item', $item->classes)) ? ' active' : '';
//         $output     .= '<li class="navbar-item'. $activeMenuItemClass.'">';
//         $attributes  = 'class="navbar-link"';

//         ! empty ( $item->attr_title )
//             // Avoid redundant titles
//             and $item->attr_title !== $item->title
//             and $attributes .= ' title="' . esc_attr( $item->attr_title ) .'"';
//         ! empty ( $item->url )
//             and $attributes .= ' href="' . esc_attr( $item->url ) .'"';
//         $attributes  = trim( $attributes );
//         $title       = apply_filters( 'the_title', $item->title, $item->ID );
//         $item_output = "$args->before<a $attributes>$args->link_before$title</a>"
//                         . "$args->link_after$args->after";
//         // Since $output is called by reference we don't need to return anything.
//         $output .= apply_filters(
//             'walker_nav_menu_start_el'
//             ,   $item_output
//             ,   $item
//             ,   $depth
//             ,   $args
//             ,   $id
//         );
//     }
//     /**
//      * @see Walker::start_lvl()
//      *
//      * @param string $output Passed by reference. Used to append additional content.
//      * @return void
//      */
//     public function start_lvl( &$output, $depth = 0, $args = array())
//     {
//         $output .= '';
//     }
//     /**
//      * @see Walker::end_lvl()
//      *
//      * @param string $output Passed by reference. Used to append additional content.
//      * @return void
//      */
//     public function end_lvl( &$output, $depth = 0, $args = array() )
//     {
//         $output .= '';
//     }
//     /**
//      * @see Walker::end_el()
//      *
//      * @param string $output Passed by reference. Used to append additional content.
//      * @return void
//      */
//     function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0)
//     {
//         $output .= '</li>';
//     }
// }

// class sublevel_wrapper extends Walker_Nav_Menu {
//     // add classes to ul sub-menus
//     function start_lvl(&$output, $depth = 0, $args = array()) {
//         // depth dependent classes
//         $indent = ( $depth > 0  ? str_repeat( "\t", $depth ) : '' ); // code indent
//         $display_depth = ( $depth + 1); // because it counts the first submenu as 0
//         $classes = array(
//             'sub-menu',
//             'menu-depth-' . $display_depth
//         );
//         $class_names = implode(' ', $classes);

//         // build html
//         if ($display_depth == 1) {
//             $output .= "\n" . $indent . '<mark class="navToggle arrow"></mark><div class="sub-menu-wrapper"><div class="sub-menu-inner"><ul class="' . $class_names . '">' . "\n";
//         } else {
//             $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";
//         }
//     }
// }

class Nav_Walker_Nav_Menu extends Walker_Nav_Menu{
  function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
       global $wp_query;
       $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
       $class_names = $value = '';
       $classes = empty( $item->classes ) ? array() : (array) $item->classes;
       $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
       $class_names = ' class="'. esc_attr( $class_names ) . '"';

       $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';

       $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
       $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
       $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
      $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';


       $description  = ! empty( $item->description ) ? '<span>'.esc_attr( $item->description ).'</span>' : '';



        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .=$args->link_before .apply_filters( 'the_title', $item->title, $item->ID );
        $item_output .= $description.$args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}
