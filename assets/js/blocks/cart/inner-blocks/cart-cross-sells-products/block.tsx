/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import CartCrossSellsProductList from '../../cart-cross-sells-product-list';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { crossSellsItems, cartIsLoading } = useStoreCart();
	return (
		<CartCrossSellsProductList
			className={ className }
			crossSellsItems={ crossSellsItems }
			isLoading={ cartIsLoading }
		/>
	);
};

export default Block;
