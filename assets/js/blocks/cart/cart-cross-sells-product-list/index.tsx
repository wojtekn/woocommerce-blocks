/**
 * External dependencies
 */
import { CartResponseItem } from '@woocommerce/type-defs/cart-response';

/**
 * Internal dependencies
 */
import CartCrossSellsItem from './cart-cross-sells-item';

const placeholderRows = [ ...Array( 3 ) ].map( ( _x, i ) => (
	<CartCrossSellsItem crossSellsItem={ {} } key={ i } />
) );

interface CrossSellsProducListProps {
	crossSellsItems: CartResponseItem[];
	isLoading: boolean;
	className?: string;
}

const CartCrossSellsProductList = ( {
	crossSellsItems = [],
	isLoading = false,
}: CrossSellsProducListProps ): JSX.Element => {
	const products = isLoading
		? placeholderRows
		: crossSellsItems.map( ( crossSellsItem ) => {
				return (
					<CartCrossSellsItem
						key={ crossSellsItem.key }
						crossSellsItem={ crossSellsItem }
					/>
				);
		  } );

	return <>{ products }</>;
};

export default CartCrossSellsProductList;
