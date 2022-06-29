/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import CartCrossSellsProductList from '../../cart-cross-sells-product-list';

interface BlockProps {
	className?: string;
	columns: number;
}

const Block = ( { className, columns }: BlockProps ): JSX.Element => {
	const { crossSellsProducts, cartIsLoading } = useStoreCart();

	return (
		<CartCrossSellsProductList
			className={ className }
			columns={ columns }
			crossSellsProducts={ crossSellsProducts }
			isLoading={ cartIsLoading }
		/>
	);
};

export default Block;
