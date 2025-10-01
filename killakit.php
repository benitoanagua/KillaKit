<?php
/**
 * Plugin Name: KillaKit for Elementor
 * Plugin URI: https://killakit.com
 * Description: Sophisticated widgets that "illuminate" your designs - Advanced cards, overlays, tickets and banners for Elementor
 * Version: 1.0.0
 * Author: Benito Anagua
 * Author URI: https://benitoanagua.me
 * License: GPL-2.0-or-later
 * Text Domain: killakit
 * Domain Path: /languages
 * Requires PHP: 8.0
 * Elementor requires at least: 3.0.0
 * Elementor tested up to: 3.20.0
 */

namespace KillaKit;

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants
define( 'KILLAKIT_PLUGIN_FILE', __FILE__ );
define( 'KILLAKIT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'KILLAKIT_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'KILLAKIT_PLUGIN_VERSION', '1.0.0' );
define( 'KILLAKIT_MINIMUM_ELEMENTOR_VERSION', '3.0.0' );
define( 'KILLAKIT_MINIMUM_PHP_VERSION', '8.0' );

// Check PHP version
if ( version_compare( PHP_VERSION, KILLAKIT_MINIMUM_PHP_VERSION, '<' ) ) {
	add_action(
		'admin_notices',
		function () {
			?>
		<div class="notice notice-error">
			<p>
				<?php
				printf(
					/* translators: 1: Plugin name 2: PHP version */
					esc_html__( '"%1$s" requires PHP version %2$s or greater. Please update your PHP version.', 'killakit' ),
					'<strong>' . esc_html__( 'KillaKit for Elementor', 'killakit' ) . '</strong>',
					KILLAKIT_MINIMUM_PHP_VERSION
				);
				?>
			</p>
		</div>
			<?php
		}
	);
	return;
}

// Autoloader
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
} else {
	add_action(
		'admin_notices',
		function () {
			?>
		<div class="notice notice-error">
			<p>
				<?php
				printf(
					/* translators: 1: Plugin name */
					esc_html__( '"%1$s" composer dependencies are not installed. Please run "composer install".', 'killakit' ),
					'<strong>' . esc_html__( 'KillaKit for Elementor', 'killakit' ) . '</strong>'
				);
				?>
			</p>
		</div>
			<?php
		}
	);
	return;
}

// Initialize plugin
try {
	Plugin::instance()->init();
} catch ( \Throwable $e ) {
	error_log( 'KillaKit initialization error: ' . $e->getMessage() );
	add_action(
		'admin_notices',
		function () use ( $e ) {
			?>
		<div class="notice notice-error">
			<p>
				<?php
				printf(
					/* translators: 1: Plugin name 2: Error message */
					esc_html__( '"%1$s" failed to initialize: %2$s', 'killakit' ),
					'<strong>' . esc_html__( 'KillaKit for Elementor', 'killakit' ) . '</strong>',
					esc_html( $e->getMessage() )
				);
				?>
			</p>
		</div>
			<?php
		}
	);
}

// Plugin activation/deactivation hooks
register_activation_hook( __FILE__, array( Plugin::class, 'activate' ) );
register_deactivation_hook( __FILE__, array( Plugin::class, 'deactivate' ) );