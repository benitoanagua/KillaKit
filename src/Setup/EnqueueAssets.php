<?php

namespace KillaKit\Setup;

class EnqueueAssets {

	public function init(): void {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'elementor/editor/after_enqueue_scripts', array( $this, 'enqueue_editor_scripts' ) );
	}

	public function enqueue_scripts(): void {
		if ( ! defined( 'KILLAKIT_PLUGIN_URL' ) || ! defined( 'KILLAKIT_PLUGIN_VERSION' ) ) {
			return;
		}

		// Enqueue main JavaScript bundle
		wp_enqueue_script(
			'killakit-elements',
			KILLAKIT_PLUGIN_URL . 'public/killakit-elements.es.js',
			array(),
			KILLAKIT_PLUGIN_VERSION,
			true
		);

		// Localize script for AJAX
		wp_localize_script(
			'killakit-elements',
			'killakit',
			array(
				'ajaxUrl'        => admin_url( 'admin-ajax.php' ),
				'nonce'          => wp_create_nonce( 'killakit_nonce' ),
				'elementsLoaded' => false,
			)
		);
	}

	public function enqueue_styles(): void {
		if ( ! defined( 'KILLAKIT_PLUGIN_URL' ) || ! defined( 'KILLAKIT_PLUGIN_VERSION' ) ) {
			return;
		}

		// Enqueue component styles
		wp_enqueue_style(
			'killakit-components',
			KILLAKIT_PLUGIN_URL . 'public/killakit-elements.css',
			array(),
			KILLAKIT_PLUGIN_VERSION
		);
	}

	public function enqueue_editor_scripts(): void {
		if ( ! defined( 'KILLAKIT_PLUGIN_URL' ) || ! defined( 'KILLAKIT_PLUGIN_VERSION' ) ) {
			return;
		}

		// Enqueue editor-specific styles
		wp_enqueue_style(
			'killakit-editor',
			KILLAKIT_PLUGIN_URL . 'assets/css/editor.css',
			array(),
			KILLAKIT_PLUGIN_VERSION
		);
	}
}
