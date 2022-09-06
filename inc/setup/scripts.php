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
