/**
 * External dependencies
 */
import { isObject } from '@woocommerce/types';

export enum responseTypes {
	SUCCESS = 'success',
	FAIL = 'failure',
	ERROR = 'error',
}

export const noticeContexts = {
	CHECKOUT: 'wc/checkout',
	CART: 'wc/cart',
	BILLING_ADDRESS: 'wc/billing-address',
	SHIPPING_ADDRESS: 'wc/shipping-address',
	SHIPPING_METHOD: 'wc/shipping-method',
	CONTACT_INFOMARTION: 'wc/contact-information',
	PAYMENTS: 'wc/payment-area',
	EXPRESS_PAYMENTS: 'wc/express-payment-area',
} as const;

export const errorToFieldMapping = {
	[ [ 'invalid_email', 'billing_address' ].toString() ]: 'email',
	[ [ 'missing_country', 'billing_address' ].toString() ]: 'billing-country',
	[ [ 'invalid_country', 'billing_address' ].toString() ]: 'billing-country',
	[ [ 'missing_country', 'shipping_address' ].toString() ]:
		'shipping-country',
	[ [ 'invalid_country', 'shipping_address' ].toString() ]:
		'shipping-country',
	[ [ 'invalid_state', 'billing_address' ].toString() ]: 'billing-state',
	[ [ 'invalid_state', 'shipping_address' ].toString() ]: 'shipping-state',
	[ [ 'invalid_postcode', 'billing_address' ].toString() ]:
		'billing-postcode',
	[ [ 'invalid_postcode', 'shipping_address' ].toString() ]:
		'shipping-postcode',
	[ [ 'invalid_phone', 'billing_address' ].toString() ]: 'billing-phone',
	[ [ 'invalid_phone', 'shipping_address' ].toString() ]: 'shipping-phone',
	get( keyPair ) {
		return this[ keyPair.toString() ];
	},
	set( keyPair, value ) {
		return ( this[ keyPair.toString() ] = value );
	},
};
export interface ResponseType extends Record< string, unknown > {
	type: responseTypes;
	retry?: boolean;
}

const isResponseOf = (
	response: unknown,
	type: string
): response is ResponseType => {
	return isObject( response ) && 'type' in response && response.type === type;
};

export const isSuccessResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.SUCCESS );
};

export const isErrorResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.ERROR );
};

export const isFailResponse = (
	response: unknown
): response is ResponseType => {
	return isResponseOf( response, responseTypes.FAIL );
};

export const shouldRetry = ( response: unknown ): boolean => {
	return (
		! isObject( response ) ||
		typeof response.retry === 'undefined' ||
		response.retry === true
	);
};

/**
 * A custom hook exposing response utilities for emitters.
 */
export const useEmitResponse = () =>
	( {
		responseTypes,
		noticeContexts,
		shouldRetry,
		isSuccessResponse,
		isErrorResponse,
		isFailResponse,
		errorToFieldMapping,
	} as const );
