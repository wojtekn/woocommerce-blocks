/* eslint-disable no-unused-vars */
/**
 * Internal dependencies
 */
import { useEmitResponse, errorToFieldMapping } from './use-emit-response';
import { useValidationContext } from '../providers/validation';

/**
 * createErrorNotice(
  formatStoreApiErrorMessage( response ),
  { id: 'checkout', context: 'wc/checkout' }
  );
  response?.additional_errors?.forEach?.(
  ( additionalError ) => {
  createErrorNotice( additionalError.message, {
  id: additionalError.error_code,
  context: 'wc/checkout',
  } );
  }
  );
 */

/**
 * @typedef {import('@woocommerce/type-defs/contexts').StoreNoticeObject} StoreNoticeObject
 * @typedef {import('@woocommerce/type-defs/hooks').CheckoutNotices} CheckoutNotices
 */

/**
 * A hook that returns all notices visible in the Checkout block.
 *
 * @param {string} errorContext Main error context.
 * @return {CheckoutNotices} Notices from the checkout form or payment methods.
 */
export const useErrorDispatcher = ( errorContext ) => {
	//const { noticeContexts } = useEmitResponse();
	const { setValidationErrors } = useValidationContext();
	const dispatchErrors = ( response ) => {
		if ( response?.data?.details ) {
			const errors = Object.values( response.data.details );
			errors.forEach( ( error ) => {
				const {
					code,
					data: { context },
					message,
				} = error;
				const fieldId = errorToFieldMapping.get( [ code, context ] );
				if ( fieldId ) {
					setValidationErrors( {
						[ fieldId ]: {
							message,
						},
					} );
				} else {
					// trigger error up
				}
			} );
		}
	};
	return {
		dispatchErrors,
	};
};
