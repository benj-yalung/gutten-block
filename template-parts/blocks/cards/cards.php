<?php

/**
 * Cards Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'card-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'cards';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$header = get_field('header') ?: 'Cards Header';



?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
    <div>
        <div class="header-container">
            <h1><?php echo $header; ?></h1>
        </div>
        <div class="cards-container">
            <?php if( have_rows('card_number') ): ?>
		    <div class="card_number">
			    <?php while( have_rows('card_number') ): the_row(); 
                    $card_title = get_sub_field('card_title') ?: 'Card Title';
                    $title_color = get_sub_field('title_color');
                    $card_icon = get_sub_field('card_icon') ?: "https://cdn-icons-png.flaticon.com/512/5726/5726678.png";
                    $card_description = get_sub_field('card_description') ?: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';
                    $description_color = get_sub_field('description_color');
                    $button_text = get_sub_field('button_text') ?: 'Read More';
                    $button_text_color = get_sub_field('button_text_color');
                    $button_bg_color = get_sub_field('button_bg_color');
                    $button_link = get_sub_field('button_link');
                ?>
				    <div class="card">
                        <img src='<?php echo $card_icon ?>'/>
                        <h5 style = "color: <?php echo $title_color ?>;" ><?php echo $card_title ?></h5>
                        <p style = "color: <?php echo $description_color ?>;" > <?php echo $card_description ?> </p>
                        <button href='<?php echo $button_link ?>' style = "color: <?php echo $button_text_color ?>; background-color: <?php echo $button_bg_color ?>; width: 100%" ><?php echo $button_text ?> </button>
                    </div>
			    <?php endwhile; ?>
            </div>
            <?php else: ?>
                <p>No Cards.</p>
            <?php endif; ?>
        </div>
    </div>

    <style type="text/css">
        .header-container {
            text-align: center; 
            margin: 30px;
        }
        .card_number{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
        .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
        }
        .card img{
            margin-bottom: 15px;
            max-width: 64px;
        }
        .card p{
            text-align: center;
        }

        
    </style>
</div>