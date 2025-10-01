<?php

namespace KillaKit\Traits;

trait WidgetControlsTrait {

	protected function add_card_style_controls(): void {
		$this->add_control(
			'card_background',
			array(
				'label'     => esc_html__( 'Background Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .wc-card' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'card_padding',
			array(
				'label'      => esc_html__( 'Padding', 'killakit' ),
				'type'       => \Elementor\Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .wc-card' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);
	}

	protected function add_overlay_style_controls(): void {
		$this->add_control(
			'overlay_opacity',
			array(
				'label'     => esc_html__( 'Overlay Opacity', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0.1,
						'step' => 0.1,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .killakit-overlay-content' => 'opacity: {{SIZE}};',
				),
			)
		);
	}

	protected function add_typography_controls( string $selector, string $label ): void {
		$this->add_control(
			"typography_{$selector}",
			array(
				'label'     => $label,
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			"{$selector}_color",
			array(
				'label'     => esc_html__( 'Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					"{{WRAPPER}} {$selector}" => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_group_control(
			\Elementor\Group_Control_Typography::get_type(),
			array(
				'name'     => "{$selector}_typography",
				'selector' => "{{WRAPPER}} {$selector}",
			)
		);
	}

	protected function add_button_style_controls( string $selector = '.killakit-button' ): void {
		$this->add_control(
			'button_background',
			array(
				'label'     => esc_html__( 'Background Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					"{{WRAPPER}} {$selector}" => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'button_text_color',
			array(
				'label'     => esc_html__( 'Text Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					"{{WRAPPER}} {$selector}" => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_group_control(
			\Elementor\Group_Control_Typography::get_type(),
			array(
				'name'     => 'button_typography',
				'selector' => "{{WRAPPER}} {$selector}",
			)
		);

		$this->add_control(
			'button_padding',
			array(
				'label'      => esc_html__( 'Padding', 'killakit' ),
				'type'       => \Elementor\Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%', 'em' ),
				'selectors'  => array(
					"{{WRAPPER}} {$selector}" => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'button_border_radius',
			array(
				'label'      => esc_html__( 'Border Radius', 'killakit' ),
				'type'       => \Elementor\Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					"{{WRAPPER}} {$selector}" => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);
	}
}
