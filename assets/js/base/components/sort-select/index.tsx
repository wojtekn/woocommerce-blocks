/**
 * External dependencies
 */
import classNames from 'classnames';
import Label from '@woocommerce/base-components/label';
import { withInstanceId } from '@wordpress/compose';
import { ChangeEventHandler } from 'react';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import './style.scss';
import { useMemo } from '@wordpress/element';

interface SortSelectProps {
	/**
	 * Unique id for component instance.
	 */
	instanceId: number;
	/**
	 * CSS class used.
	 */
	className?: string;
	/**
	 * Label for the select.
	 */
	label?: string;
	/**
	 * Function to call on the change event.
	 */
	onChange: ChangeEventHandler;
	/**
	 * Option values for the select.
	 */
	options: {
		key: string;
		label: string;
	}[];
	/**
	 * Screen reader label.
	 */
	screenReaderLabel: string;
	/**
	 * The selected value.
	 */
	value?: string;
}

/**
 * Component used for 'Order by' selectors, which renders a label
 * and a <select> with the options provided in the props.
 */
const SortSelect = ( {
	className,
	instanceId,
	label = '',
	onChange,
	options,
	screenReaderLabel,
	value = '',
}: SortSelectProps ): JSX.Element => {
	const selectId = `wc-block-components-sort-select__select-${ instanceId }`;

	// Name this "safeOnChange" because onChange might not be a function, but we know this one will be eventually.
	const safeOnChange = useMemo( () => {
		if ( typeof onChange !== 'function' ) {
			deprecated(
				'Not passing an onChange prop of type `function` to SortSelect',
				{
					hint: `You passed ${ typeof onChange }. Pass onChange as a prop to SortSelect`,
					plugin: 'woocommerce-gutenberg-products-block',
					link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/6636',
				}
			);
			return () => void 0;
		}
		return onChange;
	}, [ onChange ] );

	return (
		<div
			className={ classNames(
				'wc-block-sort-select',
				'wc-block-components-sort-select',
				className
			) }
		>
			<Label
				label={ label }
				screenReaderLabel={ screenReaderLabel }
				wrapperElement="label"
				wrapperProps={ {
					className:
						'wc-block-sort-select__label wc-block-components-sort-select__label',
					htmlFor: selectId,
				} }
			/>
			<select
				id={ selectId }
				className="wc-block-sort-select__select wc-block-components-sort-select__select"
				onChange={ safeOnChange }
				value={ value }
			>
				{ options &&
					options.map( ( option ) => (
						<option key={ option.key } value={ option.key }>
							{ option.label }
						</option>
					) ) }
			</select>
		</div>
	);
};

export default withInstanceId( SortSelect );
