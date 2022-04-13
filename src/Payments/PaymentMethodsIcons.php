<?php

namespace Automattic\WooCommerce\Blocks\Payments;

use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;

/**
 * Class used for exposing payment methods icons for the mini-cart
 */
class PaymentMethodsIcons {
	/**
	 * Reference to the PaymentMethodRegistry instance.
	 *
	 * @var PaymentMethodRegistry
	 */
	private $payment_method_registry;

	/**
	 * Reference to the AssetDataRegistry instance.
	 *
	 * @var AssetDataRegistry
	 */
	private $asset_registry;

	/**
	 * Constructor
	 *
	 * @param PaymentMethodRegistry $payment_method_registry An instance of Payment Method Registry.
	 * @param AssetDataRegistry     $asset_registry Used for registering data to pass along to the request.
	 */
	public function __construct( PaymentMethodRegistry $payment_method_registry, AssetDataRegistry $asset_registry ) {
		$this->payment_method_registry = $payment_method_registry;
		$this->asset_registry          = $asset_registry;
		$this->init();
	}

	/**
	 * Initialize class features.
	 */
	protected function init() {
		add_action( 'init', array( $this->payment_method_registry, 'initialize' ), 5 );
		add_action( 'woocommerce_blocks_cart_enqueue_data', array( $this, 'add_payment_method_script_data' ) );
	}

	/**
	 * Add payment method data to Asset Registry.
	 */
	public function add_payment_method_script_data() {
		// Enqueue the order of enabled gateways as `paymentGatewaySortOrder`.
		if ( ! $this->asset_registry->exists( 'paymentGatewaySortOrder' ) ) {
			$payment_gateways = WC()->payment_gateways->payment_gateways();
			$enabled_gateways = array_filter( $payment_gateways, array( $this, 'is_payment_gateway_enabled' ) );
			$this->asset_registry->add( 'paymentGatewaySortOrder', array_keys( $enabled_gateways ) );
		}

		// Enqueue all registered gateway data (settings/config etc).
		$script_data = $this->payment_method_registry->get_all_registered_script_data();
		foreach ( $script_data as $asset_data_key => $asset_data_value ) {
			if ( ! $this->asset_registry->exists( $asset_data_key ) ) {
				$this->asset_registry->add( $asset_data_key, $asset_data_value );
			}
		}
	}

	/**
	 * Returns true if the payment gateway is enabled.
	 *
	 * @param object $gateway Payment gateway.
	 *
	 * @return boolean
	 */
	private function is_payment_gateway_enabled( $gateway ) {
		return filter_var( $gateway->enabled, FILTER_VALIDATE_BOOLEAN );
	}
}
