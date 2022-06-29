/**
 * External dependencies
 */
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';
import Noninteractive from '@woocommerce/base-components/noninteractive';

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
	columns: number;
}

const CartCrossSellsProductList = ( {
	crossSellsProducts,
	isLoading = false,
	columns,
}: CrossSellsProducListProps ): JSX.Element => {
	const products = isLoading
		? placeholderRows
		: crossSellsProducts.map( ( crossSellsProduct, i ) => {
				if ( i >= columns ) return null;

				return (
					<CartCrossSellsProduct
						crossSellsProduct={ crossSellsProduct }
						isLoading={ isLoading }
						key={ crossSellsProduct.id }
					/>
				);
		  } );

	return <Noninteractive>{ products }</Noninteractive>;
};

export default CartCrossSellsProductList;
