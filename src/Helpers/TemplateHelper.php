<?php

namespace KillaKit\Helpers;

class TemplateHelper {

	public static function render_template( string $template_path, array $data = array() ): void {
		if ( ! defined( 'KILLAKIT_PLUGIN_PATH' ) ) {
			return;
		}

		$full_path = KILLAKIT_PLUGIN_PATH . 'templates/' . ltrim( $template_path, '/' );

		if ( file_exists( $full_path ) ) {
			extract( $data );
			include $full_path;
		} else {
			error_log( "KillaKit Template not found: {$template_path}" );
		}
	}

	public static function get_template( string $template_path, array $data = array() ): string {
		ob_start();
		self::render_template( $template_path, $data );
		return ob_get_clean();
	}

	public static function sanitize_html_classes( $classes ): string {
		if ( is_string( $classes ) ) {
			$classes = explode( ' ', $classes );
		}

		if ( ! is_array( $classes ) ) {
			return '';
		}

		$classes = array_map( 'sanitize_html_class', $classes );
		$classes = array_filter( $classes );

		return implode( ' ', $classes );
	}

	public static function build_link_attributes( array $settings, string $key = 'link' ): string {
		$attributes = array();

		$url               = $settings[ $key ]['url'] ?? '';
		$is_external       = $settings[ $key ]['is_external'] ?? false;
		$nofollow          = $settings[ $key ]['nofollow'] ?? false;
		$custom_attributes = $settings[ $key ]['custom_attributes'] ?? '';

		if ( $url ) {
			$attributes[] = 'href="' . esc_url( $url ) . '"';
		}

		if ( $is_external ) {
			$attributes[] = 'target="_blank"';
		}

		if ( $nofollow ) {
			$attributes[] = 'rel="nofollow"';
		}

		if ( $custom_attributes ) {
			$attributes[] = $custom_attributes;
		}

		return implode( ' ', $attributes );
	}
}
