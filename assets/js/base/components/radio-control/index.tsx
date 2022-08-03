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
import { useMemo } from '@wordpress/element';

const RadioControl = ( {
	className = '',
	id,
	selected,
	onChange,
	options = [],
}: RadioControlProps ): JSX.Element | null => {
	const instanceId = useInstanceId( RadioControl );
	const radioControlId = id || instanceId;

	// Name this "safeOnChange" because onChange might not be a function, but we know this one will be eventually.
	const safeOnChange = useMemo( () => {
		if ( typeof onChange !== 'function' ) {
			console.log( 'not a func! rc index' );
			deprecated(
				'Not passing an onChange prop of type `function` to RadioControl',
				{
					hint: `You passed ${ typeof onChange }. Pass onChange as a prop to RadioControl`,
					plugin: 'woocommerce-gutenberg-products-block',
					link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/6636',
				}
			);
			return () => void 0;
		}
		return onChange;
	}, [ onChange ] );

	if ( ! options.length ) {
		return null;
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
