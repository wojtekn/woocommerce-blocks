/**
 * External dependencies
 */
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import { Block as ProductImage } from '../../../atomic/blocks/product-elements/image/block';
import { Block as ProductName } from '../../../atomic/blocks/product-elements/title/block';
import { Block as ProductRating } from '../../../atomic/blocks/product-elements/rating/block';
import { Block as ProductSaleBadge } from '../../../atomic/blocks/product-elements/sale-badge/block';
import { Block as ProductPrice } from '../../../atomic/blocks/product-elements/price/block';
import { AddToCartButton } from '../../../atomic/blocks/product-elements/add-to-cart/shared';

interface CrossSellsProductProps {
	crossSellsProduct: ProductResponseItem;
	isLoading: boolean;
}

const CartCrossSellsProduct = ( {
	crossSellsProduct,
	isLoading,
}: CrossSellsProductProps ): JSX.Element => {
	const { product } = useProductDataContext();
	const { permalink } = product;

	return (
		<div className="cross-sells-product">
			<InnerBlockLayoutContextProvider
				parentName={ 'woocommerce/cart-cross-sells-block' }
				parentClassName={ 'wp-block-cart-cross-sells-product' }
			>
				<ProductDataContextProvider
					product={ crossSellsProduct }
					isLoading={ isLoading }
				>
					<a href={ permalink }>
						<ProductImage />
						<ProductName />
						<ProductRating />
						<ProductSaleBadge />
						<ProductPrice />
					</a>
					<AddToCartButton />
				</ProductDataContextProvider>
			</InnerBlockLayoutContextProvider>
		</div>
	);
};

export default CartCrossSellsProduct;
