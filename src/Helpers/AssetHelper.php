<?php

namespace KillaKit\Helpers;

class AssetHelper {

	public static function get_asset_url( string $path ): string {
		if ( ! defined( 'KILLAKIT_PLUGIN_URL' ) ) {
			return '';
		}

		return KILLAKIT_PLUGIN_URL . 'assets/' . ltrim( $path, '/' );
	}

	public static function get_asset_path( string $path ): string {
		if ( ! defined( 'KILLAKIT_PLUGIN_PATH' ) ) {
			return '';
		}

		return KILLAKIT_PLUGIN_PATH . 'assets/' . ltrim( $path, '/' );
	}

	public static function get_build_url( string $path ): string {
		if ( ! defined( 'KILLAKIT_PLUGIN_URL' ) ) {
			return '';
		}

		return KILLAKIT_PLUGIN_URL . 'public/' . ltrim( $path, '/' );
	}

	public static function get_build_path( string $path ): string {
		if ( ! defined( 'KILLAKIT_PLUGIN_PATH' ) ) {
			return '';
		}

		return KILLAKIT_PLUGIN_PATH . 'public/' . ltrim( $path, '/' );
	}
}
