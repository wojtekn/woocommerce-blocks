/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useEmitResponse } from './use-emit-response';

/**
 * A hook that returns all notices visible in the Checkout block.
 *
 */
export const useCheckoutNotices = () => {
	const { noticeContexts } = useEmitResponse();

	const hasCheckoutErrors = useSelect( ( select ) => {
		const noticesStore = select( 'core/notices' );
		return Object.values( noticeContexts )
			.map( ( context ) =>
				noticesStore
					.getNotices( context )
					.some( ( notice ) => notice.status === 'error' )
			)
			.some( Boolean );
	}, [] );

	return { hasCheckoutErrors };
};
