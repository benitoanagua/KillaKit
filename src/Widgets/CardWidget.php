<?php

namespace KillaKit\Widgets;

class CardWidget extends BaseWidget {

	public function get_name(): string {
		return 'killakit-card';
	}

	public function get_title(): string {
		return esc_html__( 'KillaKit Card', 'killakit' );
	}

	public function get_icon(): string {
		return 'eicon-cards';
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
			'title',
			array(
				'label'       => esc_html__( 'Title', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => esc_html__( 'Card Title', 'killakit' ),
				'placeholder' => esc_html__( 'Enter card title', 'killakit' ),
			)
		);

		$this->add_control(
			'description',
			array(
				'label'       => esc_html__( 'Description', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'default'     => esc_html__( 'Card description goes here', 'killakit' ),
				'placeholder' => esc_html__( 'Enter card description', 'killakit' ),
			)
		);

		$this->add_control(
			'image',
			array(
				'label'   => esc_html__( 'Choose Image', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::MEDIA,
				'default' => array(
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				),
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

		$this->add_card_style_controls();

		$this->end_controls_section();
	}

	protected function render_widget( array $settings ): void {
		?>
		<wc-card
			title="<?php echo esc_attr( $settings['title'] ); ?>"
			excerpt="<?php echo esc_attr( $settings['description'] ); ?>"
			feature-image="<?php echo esc_url( $settings['image']['url'] ); ?>"
			media-align="top"
			heading="3"
		></wc-card>
		<?php
	}
}