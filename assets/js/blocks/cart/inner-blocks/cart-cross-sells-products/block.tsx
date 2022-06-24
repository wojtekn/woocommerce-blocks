/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import CartCrossSellsProductList from '../../cart-cross-sells-product-list';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { crossSellsProducts, cartIsLoading } = useStoreCart();
	return (
		<CartCrossSellsProductList
			crossSellsProducts={ crossSellsProducts }
			className={ className }
			isLoading={ cartIsLoading }
		/>
	);
};

export default Block;
