<?php

namespace KillaKit\Widgets;

class BannerWidget extends BaseWidget {

	public function get_name(): string {
		return 'killakit-banner';
	}

	public function get_title(): string {
		return esc_html__( 'KillaKit Banner', 'killakit' );
	}

	public function get_icon(): string {
		return 'eicon-banner';
	}

	protected function register_content_controls(): void {
		$this->start_controls_section(
			'content_section',
			array(
				'label' => esc_html__( 'Banner Content', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'banner_image',
			array(
				'label'   => esc_html__( 'Banner Image', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::MEDIA,
				'default' => array(
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				),
			)
		);

		$this->add_control(
			'title',
			array(
				'label'       => esc_html__( 'Title', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => esc_html__( 'Amazing Banner Title', 'killakit' ),
				'placeholder' => esc_html__( 'Enter banner title', 'killakit' ),
			)
		);

		$this->add_control(
			'subtitle',
			array(
				'label'       => esc_html__( 'Subtitle', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'default'     => esc_html__( 'This is an amazing banner subtitle that describes your offer', 'killakit' ),
				'placeholder' => esc_html__( 'Enter banner subtitle', 'killakit' ),
			)
		);

		$this->add_control(
			'button_text',
			array(
				'label'   => esc_html__( 'Button Text', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Learn More', 'killakit' ),
			)
		);

		$this->add_control(
			'button_url',
			array(
				'label'       => esc_html__( 'Button URL', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::URL,
				'placeholder' => esc_html__( 'https://your-link.com', 'killakit' ),
			)
		);

		$this->add_control(
			'content_position',
			array(
				'label'   => esc_html__( 'Content Position', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'center',
				'options' => array(
					'top-left'      => esc_html__( 'Top Left', 'killakit' ),
					'top-center'    => esc_html__( 'Top Center', 'killakit' ),
					'top-right'     => esc_html__( 'Top Right', 'killakit' ),
					'center-left'   => esc_html__( 'Center Left', 'killakit' ),
					'center'        => esc_html__( 'Center', 'killakit' ),
					'center-right'  => esc_html__( 'Center Right', 'killakit' ),
					'bottom-left'   => esc_html__( 'Bottom Left', 'killakit' ),
					'bottom-center' => esc_html__( 'Bottom Center', 'killakit' ),
					'bottom-right'  => esc_html__( 'Bottom Right', 'killakit' ),
				),
			)
		);

		$this->end_controls_section();
	}

	protected function register_style_controls(): void {
		$this->start_controls_section(
			'style_banner',
			array(
				'label' => esc_html__( 'Banner Style', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'banner_height',
			array(
				'label'      => esc_html__( 'Banner Height', 'killakit' ),
				'type'       => \Elementor\Controls_Manager::SLIDER,
				'size_units' => array( 'px', 'vh' ),
				'range'      => array(
					'px' => array(
						'min'  => 200,
						'max'  => 1000,
						'step' => 10,
					),
					'vh' => array(
						'min' => 20,
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 400,
				),
				'selectors'  => array(
					'{{WRAPPER}} .killakit-banner' => 'height: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'overlay_color',
			array(
				'label'     => esc_html__( 'Overlay Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .killakit-banner-overlay' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'overlay_opacity',
			array(
				'label'     => esc_html__( 'Overlay Opacity', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0,
						'step' => 0.01,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .killakit-banner-overlay' => 'opacity: {{SIZE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'style_content',
			array(
				'label' => esc_html__( 'Content Style', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => esc_html__( 'Title Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .killakit-banner-title' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'subtitle_color',
			array(
				'label'     => esc_html__( 'Subtitle Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#f0f0f0',
				'selectors' => array(
					'{{WRAPPER}} .killakit-banner-subtitle' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_section();
	}

	protected function render_widget( array $settings ): void {
		$button_url      = $settings['button_url']['url'] ?? '';
		$button_target   = $settings['button_url']['is_external'] ?? false ? 'target="_blank"' : '';
		$button_nofollow = $settings['button_url']['nofollow'] ?? false ? 'rel="nofollow"' : '';
		?>
		<div class="killakit-banner">
			<div class="killakit-banner-background">
				<img src="<?php echo esc_url( $settings['banner_image']['url'] ); ?>" 
					alt="<?php echo esc_attr( $settings['title'] ); ?>">
			</div>
			<div class="killakit-banner-overlay"></div>
			<div class="killakit-banner-content killakit-banner-content-<?php echo esc_attr( $settings['content_position'] ); ?>">
				<?php if ( $settings['title'] ) : ?>
					<h2 class="killakit-banner-title"><?php echo esc_html( $settings['title'] ); ?></h2>
				<?php endif; ?>
				
				<?php if ( $settings['subtitle'] ) : ?>
					<div class="killakit-banner-subtitle"><?php echo esc_html( $settings['subtitle'] ); ?></div>
				<?php endif; ?>
				
				<?php if ( $button_url && $settings['button_text'] ) : ?>
					<a href="<?php echo esc_url( $button_url ); ?>" 
						class="killakit-banner-button" 
						<?php echo $button_target; ?> 
						<?php echo $button_nofollow; ?>>
						<?php echo esc_html( $settings['button_text'] ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}
}