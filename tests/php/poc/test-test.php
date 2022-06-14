<?php

class BlockifiedTemplatesTest extends \WP_UnitTestCase {
	public function test_use_blockified_is_true_after_switching_to_a_block_theme() {
		// Test the action is registered.
		$controller = \Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\BlockTemplatesController::class );
		$this->assertEquals( 10, has_action( 'after_switch_theme', array( $controller, 'check_should_use_blockified_templates' ) ) );

		// var_dump( 'theme:', wp_get_theme()->get( 'Name' ), 'is_fse?', wc_current_theme_is_fse_theme() );
		switch_theme( 'twentytwentytwo' );
		var_dump( 'theme:', wp_get_theme()->get( 'Name' ), 'is_fse?', wc_current_theme_is_fse_theme() );
		$use_blockified_templates = get_option( 'wc_blocks_use_blockified_templates', 'brr' );
		var_dump( 'USE?', $use_blockified_templates );
		$this->assertTrue( $use_blockified_templates );
	}

	/*
	private function update_woocommerce_blocks() {
		\Automattic\WooCommerce\Blocks\Package::container()->get( \Automattic\WooCommerce\Blocks\Installer::class )->install();
	}

	private function set_schema_version( $version ) {
		update_option( 'wc_blocks_db_schema_version', $version );
	}*/
}
