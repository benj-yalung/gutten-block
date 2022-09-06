<?php

class Routes_Config
{
    public static function routes()
    {
        return [
            [
                'namespace' => 'cklph/v1',
                'resource_name' => 'post-types',
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true',
                'callback' => 'fetch_post_types'
            ],
            [
                'namespace' => 'cklph/v1',
                'resource_name' => 'custom-fields',
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true',
                'callback' => 'fetch_custom_fields'
            ],
            [
                'namespace' => 'cklph/v1',
                'resource_name' => 'get-post-data',
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true',
                'callback' => 'fetch_dynamic_post_type'
            ],
            [
                'namespace' => 'cklph/v1',
                'resource_name' => '/services',
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true',
                'callback' => 'cklph_services'
            ],
            [
                'namespace' => 'cklph/v1',
                'resource_name' => '/articles',
                'methods' => WP_REST_Server::READABLE,
                'permission_callback' => '__return_true',
                'callback' => 'cklph_articles'
            ]
        ];
    }
}