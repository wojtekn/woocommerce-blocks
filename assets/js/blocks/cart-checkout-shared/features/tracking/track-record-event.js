import { select } from '@wordpress/data';
import { omitBy } from 'lodash';

// Adapted from the analytics lib :(
// Because this is happening outside of the Calypso app we can't reuse the same lib
// This means we don't have any extra props like user

export default ( eventName, eventProperties ) => {
	return;
	/*
	 * Required Properties.
	 * Required by Tracks when added manually.
	 */
	const requiredProperties = {
		blog_id: window._currentSiteId,
		site_type: window._currentSiteType,
		user_locale: window._currentUserLocale,
	};

	const customProperties = {
		editor_type: 'post',
		post_type: 'page',
	};

	eventProperties = eventProperties || {};

	if (
		process.env.NODE_ENV !== 'production' &&
		typeof console !== 'undefined'
	) {
		for ( const key in eventProperties ) {
			if (
				eventProperties[ key ] !== null &&
				typeof eventProperties[ key ] === 'object'
			) {
				const errorMessage =
					`Tracks: Unable to record event "${ eventName }" because nested ` +
					`properties are not supported by Tracks. Check '${ key }' on`;
				// eslint-disable-next-line no-console
				console.error( errorMessage, eventProperties );
				return;
			}

			if ( ! /^[a-z_][a-z0-9_]*$/.test( key ) ) {
				// eslint-disable-next-line no-console
				console.error(
					'Tracks: Event `%s` will be rejected because property name `%s` does not match /^[a-z_][a-z0-9_]*$/. ' +
						'Please use a compliant property name.',
					eventName,
					key
				);
			}
		}
	}

	// Populate custom properties. We want to remove undefined values
	// so we populate these separately from `requiredProperties`.
	// We also want to allow these to be overriden by given `eventProperties`.
	eventProperties = { ...customProperties, ...eventProperties };

	// Remove properties that have an undefined value
	// This allows a caller to easily remove properties from the recorded set by setting them to undefined
	eventProperties = omitBy(
		eventProperties,
		( prop ) => typeof prop === 'undefined'
	);

	// Populate required properties.
	eventProperties = { ...eventProperties, ...requiredProperties };

	const record = [ 'recordEvent', eventName, eventProperties ];
};
