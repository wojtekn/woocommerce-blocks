/**
 * External dependencies
 */
import { ProductImage } from '@woocommerce/base-components/cart-checkout';
import ProductName from '@woocommerce/base-components/product-name';
import ProductPrice from '@woocommerce/base-components/product-price';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import { AddToCartButton } from '../../../atomic/blocks/product-elements/add-to-cart/shared';

const CartCrossSellsItem = ( { crossSellsItem } ): JSX.Element => {
	const { images, name, prices, permalink } = crossSellsItem;
	const priceCurrency = getCurrencyFromPriceResponse( prices );

	return (
		<div>
			<ProductDataContextProvider
				product={ product }
				isLoading={ isLoading }
			>
				<a href={ permalink }>
					<ProductImage
						image={ images.length ? images[ 0 ] : {} }
						fallbackAlt={ name }
					/>
					<ProductName disabled={ true } name={ name } />
					<div>[ Product rating ]</div>
					<ProductPrice
						currency={ priceCurrency }
						price={ prices.price }
						regularPrice={ prices.regular_price }
						className="wc-block-components-cross-sells-item__individual-prices"
						priceClassName="wc-block-components-cross-sells-item__individual-price"
						regularPriceClassName="wc-block-components-cross-sells-item__regular-individual-price"
						format={ '<price/>' }
					/>
				</a>
				<AddToCartButton />
			</ProductDataContextProvider>
		</div>
	);
};

export default CartCrossSellsItem;
