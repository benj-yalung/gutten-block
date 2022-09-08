<?php
/**
 * Enqueue scripts and styles.
 *
 * @package custom
 */

namespace WebDevStudios\custom;

/**
 * Enqueue scripts and styles.
 *
 * @author WebDevStudios
 */

function register_custom_blocks() {
	wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/build/index.js', array(
		'wp-blocks', 'wp-editor', 'wp-components', 'jquery', 'wp-element', 'wp-block-editor'
	) );

	register_block_type( 'gb/accordion-cpt	', array(
		'editor_script'	=> 'custom-scripts'
	) );
}

add_action( 'init', __NAMESPACE__ . '\register_custom_blocks' );


function my_acf_init_block_types() {

    // Check function exists.
    if( function_exists('acf_register_block_type') ) {

       

        // register a cards block.
		acf_register_block_type(array(
            'name'              => 'cards',
            'title'             => __('Cards'),
            'description'       => __('A cards block.'),
            'render_template'   => 'template-parts/blocks/cards/cards.php',
            'category'          => 'formatting',
            'icon'              => 'admin-comments',
            'keywords'          => array( 'cards', 'article' ),
			'enqueue_assets' 	=> function(){
				//wp_enqueue_style( 'block-slider', get_template_directory_uri() . '/template-parts/blocks/slider/slider.min.css', array(), '1.0.0' );

				wp_enqueue_script( 'block-cards', get_template_directory_uri() . '/template-parts/blocks/cards/cards.min.js', array(), '1.0.0', true );
			  },
        ));
    }
}

add_action('acf/init', __NAMESPACE__ . '\my_acf_init_block_types');

function scripts() {
	$asset_file_path = dirname( __DIR__ ) . '/build/index.asset.php';

	if ( is_readable( $asset_file_path ) ) {
		$asset_file = include $asset_file_path;
	} else {
		$asset_file = [
			'version'      => '1.0.0',
			'dependencies' => [ 'wp-polyfill' ],
		];
	}

	// Register styles & scripts.
	wp_enqueue_style( 'custom-styles', get_stylesheet_directory_uri() . '/build/index.css', [], $asset_file['version'] );
	wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/build/index.js', $asset_file['dependencies'], $asset_file['version'], true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\scripts' );
