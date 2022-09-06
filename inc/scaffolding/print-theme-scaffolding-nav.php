<?php
/**
 * Add a scaffolding nav for easier access.
 *
 * @package wunderscore
 */

namespace CompanyName\wunderscore;

/**
 * Add a scaffolding nav for easier access.
 *
 * @author JC Palmes
 */
function print_theme_scaffolding_nav() {
	?>
	<nav class="scaffolding-nav">
		<span><?php echo esc_html__( 'Scroll to:', 'wunderscore' ); ?></span>
		<a href="#globals" class="link"><?php echo esc_html__( 'Globals', 'wunderscore' ); ?></a>
		<a href="#typography" class="link"><?php echo esc_html__( 'Typography', 'wunderscore' ); ?></a>
		<a href="#media" class="link"><?php echo esc_html__( 'Media', 'wunderscore' ); ?></a>
		<a href="#icons" class="link"><?php echo esc_html__( 'Icons', 'wunderscore' ); ?></a>
		<a href="#buttons" class="link"><?php echo esc_html__( 'Buttons', 'wunderscore' ); ?></a>
		<a href="#forms" class="link"><?php echo esc_html__( 'Forms', 'wunderscore' ); ?></a>
		<a href="#elements" class="link"><?php echo esc_html__( 'Elements', 'wunderscore' ); ?></a>
	</nav><!-- .scaffolding-nav -->
	<?php
}
