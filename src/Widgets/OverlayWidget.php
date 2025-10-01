<?php

namespace KillaKit\Widgets;

class OverlayWidget extends BaseWidget {

	public function get_name(): string {
		return 'killakit-overlay';
	}

	public function get_title(): string {
		return esc_html__( 'KillaKit Overlay', 'killakit' );
	}

	public function get_icon(): string {
		return 'eicon-overlay';
	}

	protected function register_content_controls(): void {
		$this->start_controls_section(
			'content_section',
			array(
				'label' => esc_html__( 'Content', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'overlay_image',
			array(
				'label'   => esc_html__( 'Background Image', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::MEDIA,
				'default' => array(
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				),
			)
		);

		$this->add_control(
			'overlay_content',
			array(
				'label'   => esc_html__( 'Overlay Content', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::WYSIWYG,
				'default' => esc_html__( 'Overlay content goes here', 'killakit' ),
			)
		);

		$this->end_controls_section();
	}

	protected function register_style_controls(): void {
		$this->start_controls_section(
			'style_section',
			array(
				'label' => esc_html__( 'Style', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_overlay_style_controls();

		$this->end_controls_section();
	}

	protected function render_widget( array $settings ): void {
		?>
		<div class="killakit-overlay">
			<div class="killakit-overlay-background">
				<img src="<?php echo esc_url( $settings['overlay_image']['url'] ); ?>" alt="<?php echo esc_attr( $settings['overlay_content'] ); ?>">
			</div>
			<div class="killakit-overlay-content">
				<?php echo wp_kses_post( $settings['overlay_content'] ); ?>
			</div>
		</div>
		<?php
	}
}