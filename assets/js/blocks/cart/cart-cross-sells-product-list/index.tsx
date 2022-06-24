/**
 * External dependencies
 */
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import CartCrossSellsProduct from './cart-cross-sells-product';

const placeholderRows = [ ...Array( 3 ) ].map( ( _x, i ) => (
	<CartCrossSellsProduct crossSellsProduct={ {} } key={ i } />
) );

interface CrossSellsProducListProps {
	crossSellsProducts: ProductResponseItem[];
	isLoading: boolean;
	className?: string;
}

const CartCrossSellsProductList = ( {
	crossSellsProducts,
	isLoading = false,
}: CrossSellsProducListProps ): JSX.Element => {
	const products = isLoading
		? placeholderRows
		: crossSellsProducts.map( ( crossSellsProduct ) => {
				return (
					<CartCrossSellsProduct
						crossSellsProduct={ crossSellsProduct }
						isLoading={ isLoading }
						key={ crossSellsProduct.id }
					/>
				);
		  } );

	return <>{ products }</>;
};

export default CartCrossSellsProductList;
