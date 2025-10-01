<?php

namespace KillaKit\Widgets;

use Elementor\Widget_Base;
use KillaKit\Traits\WidgetControlsTrait;

abstract class BaseWidget extends Widget_Base {

	use WidgetControlsTrait;

	public function get_categories(): array {
		return array( 'killakit' );
	}

	protected function register_controls(): void {
		$this->register_content_controls();
		$this->register_style_controls();
	}

	abstract protected function register_content_controls(): void;
	abstract protected function register_style_controls(): void;

	protected function render(): void {
		$settings = $this->get_settings_for_display();
		$this->render_widget( $settings );
	}

	abstract protected function render_widget( array $settings ): void;
}
