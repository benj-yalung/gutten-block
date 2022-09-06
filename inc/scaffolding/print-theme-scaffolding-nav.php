<?php
/**
 * Add a scaffolding nav for easier access.
 *
 * @package custom
 */

namespace WebDevStudios\custom;

/**
 * Add a scaffolding nav for easier access.
 *
 * @author JC Palmes
 */
function print_theme_scaffolding_nav() {
	?>
	<nav class="scaffolding-nav">
		<span><?php echo esc_html__( 'Scroll to:', 'custom' ); ?></span>
		<a href="#globals" class="link"><?php echo esc_html__( 'Globals', 'custom' ); ?></a>
		<a href="#typography" class="link"><?php echo esc_html__( 'Typography', 'custom' ); ?></a>
		<a href="#media" class="link"><?php echo esc_html__( 'Media', 'custom' ); ?></a>
		<a href="#icons" class="link"><?php echo esc_html__( 'Icons', 'custom' ); ?></a>
		<a href="#buttons" class="link"><?php echo esc_html__( 'Buttons', 'custom' ); ?></a>
		<a href="#forms" class="link"><?php echo esc_html__( 'Forms', 'custom' ); ?></a>
		<a href="#elements" class="link"><?php echo esc_html__( 'Elements', 'custom' ); ?></a>
	</nav><!-- .scaffolding-nav -->
	<?php
}
