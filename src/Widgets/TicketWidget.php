<?php

namespace KillaKit\Widgets;

class TicketWidget extends BaseWidget {

	public function get_name(): string {
		return 'killakit-ticket';
	}

	public function get_title(): string {
		return esc_html__( 'KillaKit Ticket', 'killakit' );
	}

	public function get_icon(): string {
		return 'eicon-ticket';
	}

	protected function register_content_controls(): void {
		$this->start_controls_section(
			'content_section',
			array(
				'label' => esc_html__( 'Ticket Content', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'event_title',
			array(
				'label'       => esc_html__( 'Event Title', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => esc_html__( 'Amazing Concert', 'killakit' ),
				'placeholder' => esc_html__( 'Enter event title', 'killakit' ),
			)
		);

		$this->add_control(
			'event_date',
			array(
				'label'   => esc_html__( 'Event Date', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::DATE_TIME,
				'default' => date( 'Y-m-d H:i', strtotime( '+1 week' ) ),
			)
		);

		$this->add_control(
			'venue',
			array(
				'label'       => esc_html__( 'Venue', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => esc_html__( 'Concert Hall', 'killakit' ),
				'placeholder' => esc_html__( 'Enter venue name', 'killakit' ),
			)
		);

		$this->add_control(
			'price',
			array(
				'label'       => esc_html__( 'Price', 'killakit' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => '$50.00',
				'placeholder' => esc_html__( 'Enter ticket price', 'killakit' ),
			)
		);

		$this->add_control(
			'button_text',
			array(
				'label'   => esc_html__( 'Button Text', 'killakit' ),
				'type'    => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Buy Tickets', 'killakit' ),
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

		$this->end_controls_section();
	}

	protected function register_style_controls(): void {
		$this->start_controls_section(
			'style_ticket',
			array(
				'label' => esc_html__( 'Ticket Style', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'ticket_background',
			array(
				'label'     => esc_html__( 'Background Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .killakit-ticket' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'ticket_border_color',
			array(
				'label'     => esc_html__( 'Border Color', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#e0e0e0',
				'selectors' => array(
					'{{WRAPPER}} .killakit-ticket' => 'border-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'style_button',
			array(
				'label' => esc_html__( 'Button Style', 'killakit' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'button_background',
			array(
				'label'     => esc_html__( 'Button Background', 'killakit' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#007cba',
				'selectors' => array(
					'{{WRAPPER}} .killakit-ticket-button' => 'background-color: {{VALUE}}',
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
		<div class="killakit-ticket">
			<div class="killakit-ticket-header">
				<h3 class="killakit-ticket-title"><?php echo esc_html( $settings['event_title'] ); ?></h3>
				<div class="killakit-ticket-date">
					<?php echo esc_html( date( 'F j, Y', strtotime( $settings['event_date'] ) ) ); ?>
				</div>
			</div>
			<div class="killakit-ticket-body">
				<div class="killakit-ticket-venue">
					<?php echo esc_html( $settings['venue'] ); ?>
				</div>
				<div class="killakit-ticket-price">
					<?php echo esc_html( $settings['price'] ); ?>
				</div>
			</div>
			<?php if ( $button_url && $settings['button_text'] ) : ?>
			<div class="killakit-ticket-footer">
				<a href="<?php echo esc_url( $button_url ); ?>" 
					class="killakit-ticket-button" 
					<?php echo $button_target; ?> 
					<?php echo $button_nofollow; ?>>
					<?php echo esc_html( $settings['button_text'] ); ?>
				</a>
			</div>
			<?php endif; ?>
		</div>
		<?php
	}
}