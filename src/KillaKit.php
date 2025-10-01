<?php

namespace KillaKit;

use KillaKit\Setup\PluginSetup;
use KillaKit\Setup\EnqueueAssets;
use KillaKit\Widgets\CardWidget;
use KillaKit\Widgets\OverlayWidget;
use KillaKit\Widgets\TicketWidget;
use KillaKit\Widgets\BannerWidget;

final class Plugin {

	private static ?self $instance = null;

	private PluginSetup $plugin_setup;
	private EnqueueAssets $enqueue_assets;

	// Minimum required Elementor version
	const MINIMUM_ELEMENTOR_VERSION = '3.0.0';

	public static function instance(): self {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->plugin_setup   = new PluginSetup();
		$this->enqueue_assets = new EnqueueAssets();
	}

	public function init(): void {
		add_action( 'plugins_loaded', array( $this, 'load_plugin' ) );
	}

	public function load_plugin(): void {
		// Load textdomain early
		load_plugin_textdomain(
			'killakit',
			false,
			dirname( plugin_basename( KILLAKIT_PLUGIN_FILE ) ) . '/languages'
		);

		// Check if Elementor is installed and activated
		if ( ! $this->is_elementor_installed() ) {
			add_action( 'admin_notices', array( $this, 'elementor_missing_notice' ) );
			return;
		}

		// Check Elementor version
		if ( ! $this->is_elementor_version_compatible() ) {
			add_action( 'admin_notices', array( $this, 'elementor_version_notice' ) );
			return;
		}

		// Initialize components
		$this->plugin_setup->init();
		$this->enqueue_assets->init();
		$this->register_widgets();

		// Plugin loaded action
		do_action( 'killakit/plugin_loaded' );
	}

	private function is_elementor_installed(): bool {
		return did_action( 'elementor/loaded' ) > 0;
	}

	private function is_elementor_version_compatible(): bool {
		return defined( 'ELEMENTOR_VERSION' ) &&
				version_compare( ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=' );
	}

	public function register_widgets(): void {
		add_action(
			'elementor/widgets/register',
			function ( $widgets_manager ) {
				// Register all widgets
				$widgets_manager->register( new CardWidget() );
				$widgets_manager->register( new OverlayWidget() );
				$widgets_manager->register( new TicketWidget() );
				$widgets_manager->register( new BannerWidget() );
			}
		);

		// Add widget category
		add_action( 'elementor/elements/categories_registered', array( $this, 'add_widget_category' ) );
	}

	public function add_widget_category( $elements_manager ): void {
		$elements_manager->add_category(
			'killakit',
			array(
				'title' => esc_html__( 'KillaKit', 'killakit' ),
				'icon'  => 'fa fa-moon',
			)
		);
	}

	public function elementor_missing_notice(): void {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor */
			esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'killakit' ),
			'<strong>' . esc_html__( 'KillaKit for Elementor', 'killakit' ) . '</strong>',
			'<strong>' . esc_html__( 'Elementor', 'killakit' ) . '</strong>'
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%s</p></div>', $message );
	}

	public function elementor_version_notice(): void {
		if ( ! current_user_can( 'update_plugins' ) ) {
			return;
		}

		$message = sprintf(
			/* translators: 1: Plugin name 2: Required Elementor version */
			esc_html__( '"%1$s" requires Elementor version %2$s or greater.', 'killakit' ),
			'<strong>' . esc_html__( 'KillaKit for Elementor', 'killakit' ) . '</strong>',
			self::MINIMUM_ELEMENTOR_VERSION
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%s</p></div>', $message );
	}

	public static function activate(): void {
		// Check if Elementor is active on activation
		if ( ! did_action( 'elementor/loaded' ) ) {
			deactivate_plugins( plugin_basename( KILLAKIT_PLUGIN_FILE ) );
			wp_die(
				esc_html__( 'KillaKit requires Elementor to be installed and activated. Please install Elementor and try again.', 'killakit' ),
				'Plugin dependency check',
				array( 'back_link' => true )
			);
		}

		flush_rewrite_rules();
	}

	public static function deactivate(): void {
		flush_rewrite_rules();
	}
}
