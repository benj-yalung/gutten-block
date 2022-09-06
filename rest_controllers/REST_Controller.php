<?php

require_once( get_template_directory() . '/rest_controllers/Routes_Config.php' );

class REST_Controller
{
    public function __construct()
    {
        add_action( 'rest_api_init', array( $this, 'init' ), 10, 1 );
    }

    public function init()
    {
        $routes = Routes_Config::routes();

        foreach( $routes as $route ) {
            register_rest_route( $route['namespace'], $route['resource_name'], array(
                'methods' => $route['methods'],
                'permission_callback' => $route['permission_callback'],
                'callback' => array( $this, $route['callback'] )
            ) );
        }
    }

    public function fetch_post_types( $request ) {
        $post_types = get_post_types(array(), 'objects');
    
        $output = [];
        foreach( $post_types as $post_type ) {
            if(  $post_type->_builtin == false && $post_type->public == true && $post_type->name !== 'attachment' ) {
                $output[] = [
                    'label' => $post_type->label,
                    'value' => $post_type->name
                ];
            }
        }
    
        return $output;
    }

    public function fetch_custom_fields( $request ) {
	
        $post_type = $request['type'];
    
        $field_groups = acf_get_field_groups();
        $output = array(
            [
                'label' => 'Title',
                'value' => 'title'
            ]
        );
    
        foreach( $field_groups as $field_group ) {
            foreach( $field_group['location'] as $locations ) {
                foreach( $locations as $location ) {
                    if( $location['value'] == $post_type ) {
                        $fields = acf_get_fields( $field_group['key'] );
                        foreach( $fields as $field ) {
                            $flag = true;
                            $output[] = [
                                'label' => $field['label'],
                                'value' => $field['name']
                            ];
                        }
                        return $output;
                    }
                }
            }
        }
    
        return $output;
    }

    public function fetch_dynamic_post_type( $request ) {
        $post_type = $request['type'];
    
        $args = array(
            'post_type' => $post_type,
            'post_status' => 'publish',
            'nopaging' => true
        );
    
        $query = new WP_Query( $args );
        $posts = $query->get_posts();
        
        $output = [];
    
        foreach( $posts as $post ) {
    
            $meta = get_post_meta( $post->ID );
    
            if( $post_type == 'cklph_articles' ) {
                    
                $background_url = wp_get_attachment_image_src( $meta['background_image'][0] );
                $output[] = [
                    'title' => $post->post_title,
                    'cta_text' => $meta['cta_text'],
                    'cta_link' => $meta['cta_link'][0],
                    'card_action_text' => $meta['card_action_text'],
                    'card_action_link' => $meta['card_action_link'][0],
                    'background_image' => $background_url[0]
                ];
            }
    
            if( $post_type == 'cklph_services' ) {
                $icon = wp_get_attachment_image_src( $meta['icon'][0] );
                $output[] = [
                    'title' => $post->post_title,
                    'icon' => $icon[0],
                    'tagline' => $meta['tagline'],
                    'cta_text' => $meta['cta_text'],
                    'cta_link' => $meta['cta_link'][0],
                    'description' => $meta['description']
                ];
            }
    
            if( $post_type == 'cklph_accordion' ) {
                $output[] = [
                    'title' => $post->post_title,
                    'description' => $meta['description']
                ];
            }

            if( $post_type == 'cklph_lottie-player' ) {
                $output[] = [
                    'title' => $post->post_title,
                ];
            }
            if( $post_type == 'cklph_icon_lists' ) {
                $output[] = [
                    'title' => $post->post_title,
                    'description' => $meta['description']
                ];
            }
            if( $post_type == 'cklph_icon_list' ) {
                $output[] = [
                    'title' => $post->post_title,
                ];
            }
    
    
            if( $post_type == 'cklph_slides' ) {
                $background_image = wp_get_attachment_image_src( $meta['background_image'][0] );
                $output[] = [
                    'title' => $post->post_title,
                    'description' => $meta['description'],
                    'cta_text' => $meta['cta_text'],
                    'cta_link' => $meta['cta_link'][0],
                    'background_image' => $background_image[0]
                ];
            }
        }
    
        return $output;
    
    }

    public function cklph_services( $request ) {
        $args = array(
            'post_type' => 'cklph_services',
            'post_status' => 'publish',
            'nopaging' => true
        );
    
        $query = new WP_Query( $args );
        $posts = $query->get_posts();
        
        $output = array();
        foreach( $posts as $post ) {
    
            $post_meta = get_post_meta( $post->ID );
            $icon_url = wp_get_attachment_image_src( $post_meta['icon'][0] );
    
            $output[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'icon' => $icon_url[0],
                'tagline' => $post_meta['tagline'],
                'cta_text' => $post_meta['cta_text'],
                'cta_link' => $post_meta['cta_link'][0],
                'description' => $post_meta['description']
            );
        }
    
        return $output;
    }

    public function cklph_articles( $request ) {
        $args = array(
            'post_type' => 'cklph_articles',
            'post_status' => 'publish',
            'nopaging' => true
        );
    
        $query = new WP_Query( $args );
        $posts = $query->get_posts();
    
        $output = array();
        foreach( $posts as $post ) {
            $post_meta = get_post_meta( $post->ID );
            $background_url = wp_get_attachment_image_src( $post_meta['background_image'][0] );
    
            $output[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'cta_text' => $post_meta['cta_text'],
                'cta_link' => $post_meta['cta_link'][0],
                'card_action_text' => $post_meta['card_action_text'],
                'card_action_link' => $post_meta['card_action_link'][0],
                'background_image' => $background_url[0]
            );
        }
        return $output;
    }
}
new REST_Controller;