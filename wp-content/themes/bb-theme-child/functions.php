<?php

// Defines
define( 'FL_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'FL_CHILD_THEME_URL', get_stylesheet_directory_uri() );

// Classes
require_once 'classes/class-fl-child-theme.php';

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-block-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );


add_action( 'thrive_modify_session_setting', 'thrive_modify_session_func' );
function thrive_modify_session_func() {
	if( function_exists("ttshowcase_submit_form") ) {
		if( !session_id() ) {
		  session_start(['read_and_close' => true]);
		}
	}
}

do_action( 'thrive_modify_session_setting' );


add_action( 'wp_enqueue_scripts', function () {
wp_enqueue_style('blocksy-child-style', get_stylesheet_uri());
});

//DISABLING GUTENBERG BEGINS - SAQIB
add_filter('use_block_editor_for_post', '__return_false');
//DISABLING GUTENBERG ENDS - SAQIB

//Setting Thumbnail Sizes - Begins - Saqib
add_image_size( 'homeBlogPosts', 404, 200, true  );
//Setting Thumbnail Sizes - Ends - Saqib

//DEQUEUING SCRIPTS AND STYLESHEETS ON SPECIFIC PAGES BEGIN - SAQIB
function ci_deregister_styles_scripts(){
	if( is_front_page() ){
        wp_dequeue_style( 'tribe-events-admin-menu' );
        wp_dequeue_style( 'tt-font-awesome' );
    //wp_dequeue_style( '' );
    //wp_deregister_style( 'thrive-framework' );

    //wp_deregister_script( '' );
	}
}
add_action( 'wp_print_styles', 'ci_deregister_styles_scripts', 100 );
//DEQUEUING SCRIPTS AND STYLESHEETS ON SPECIFIC PAGES END - SAQIB