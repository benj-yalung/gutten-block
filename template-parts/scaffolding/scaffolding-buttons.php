<?php
/**
 * The template used for displaying Buttons in the scaffolding library.
 *
 * @package wunderscore
 */

use function CompanyName\wunderscore\print_scaffolding_section;

?>

<section class="section-scaffolding">

	<h2 class="scaffolding-heading" id="<?php esc_html_e( 'buttons', 'wunderscore' ); ?>"><?php esc_html_e( 'Buttons', 'wunderscore' ); ?></h2>
	<?php
		// Button.
		print_scaffolding_section(
			[
				'title'       => 'Button',
				'description' => 'Display a button.',
				'usage'       => '<button class="button" href="#">Click Me</button>',
				'output'      => '<button class="button">Click Me</button>',
			]
		);
		?>
</section>
