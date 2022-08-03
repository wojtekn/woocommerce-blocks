/**
 * External dependencies
 */
import classnames from 'classnames';
import { useInstanceId } from '@wordpress/compose';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import RadioControlOption from './option';
import type { RadioControlProps } from './types';
import './style.scss';

const RadioControl = ( {
	className = '',
	id,
	selected,
	onChange = () => void 0,
	options = [],
}: RadioControlProps ): JSX.Element | null => {
	const instanceId = useInstanceId( RadioControl );
	const radioControlId = id || instanceId;

	if ( ! options.length ) {
		return null;
	}

	// Name this "safeOnChange" because onChange might not be a function, but we know this one will be eventually.
	let safeOnChange = onChange;
	if ( typeof safeOnChange !== 'function' ) {
		safeOnChange = () => void 0;
		deprecated(
			'RadioControl must receive an onChange prop of type function, you passed ' +
				typeof onChange,
			{
				hint: 'Pass onChange as a prop to RadioControl',
				plugin: 'woocommerce-gutenberg-products-block',
				link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/6636',
			}
		);
	}
	return (
		<div
			className={ classnames(
				'wc-block-components-radio-control',
				className
			) }
		>
			{ options.map( ( option ) => (
				<RadioControlOption
					key={ `${ radioControlId }-${ option.value }` }
					name={ `radio-control-${ radioControlId }` }
					checked={ option.value === selected }
					option={ option }
					onChange={ ( value: string ) => {
						safeOnChange( value );
						if ( typeof option.onChange === 'function' ) {
							option.onChange( value );
						}
					} }
				/>
			) ) }
		</div>
	);
};

export default RadioControl;
export { default as RadioControlOption } from './option';
export { default as RadioControlOptionLayout } from './option-layout';
