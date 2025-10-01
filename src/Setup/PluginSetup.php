<?php

namespace KillaKit\Setup;

class PluginSetup {

	public function init(): void {
		add_action( 'init', array( $this, 'load_textdomain' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( KILLAKIT_PLUGIN_FILE ), array( $this, 'add_plugin_links' ) );
	}

	public function load_textdomain(): void {
		load_plugin_textdomain(
			'killakit',
			false,
			dirname( plugin_basename( KILLAKIT_PLUGIN_FILE ) ) . '/languages'
		);
	}

	/**
	 * @param array<string> $links
	 * @return array<string>
	 */
	public function add_plugin_links( array $links ): array {
		$settings_link = sprintf(
			'<a href="%s">%s</a>',
			esc_url( admin_url( 'admin.php?page=elementor#tab-killakit' ) ),
			esc_html__( 'Settings', 'killakit' )
		);

		array_unshift( $links, $settings_link );
		return $links;
	}
}
