/**
 * External dependencies
 */
import { LOGIN_URL } from '@woocommerce/block-settings';
import { getSetting } from '@woocommerce/settings';

export const LOGIN_TO_CHECKOUT_URL = `${ LOGIN_URL }?redirect_to=${ encodeURIComponent(
	window.location.href
) }`;

export const isLoginRequired = ( customerId: number ): boolean => {
	return ! customerId && ! getSetting( 'checkoutAllowsGuest', false );
};

export const reloadPage = (): void => {
	window.history.replaceState( null, null, window.location.href );
	window.location.href = window.location.href + '?classic';
};
