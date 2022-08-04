/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { Sidebar } from '@woocommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@woocommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';
import CartCheckoutSidebarCompatibilityNotice from '@woocommerce/editor-components/sidebar-compatibility-notice';

/**
 * Internal dependencies
 */
import './style.scss';
import {
	useForcedLayout,
	getAllowedBlocks,
} from '../../../cart-checkout-shared';

export const Edit = ( {
	clientId,
	attributes,
}: {
	clientId: string;
	attributes: {
		className?: string;
	};
} ): JSX.Element => {
	const blockProps = useBlockProps( {
		className: classnames(
			'wc-block-checkout__sidebar',
			attributes?.className
		),
	} );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CHECKOUT_TOTALS );

	const defaultTemplate = [
		[ 'woocommerce/checkout-order-summary-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<Sidebar { ...blockProps }>
			<InspectorControls>
				<CartCheckoutSidebarCompatibilityNotice />
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				templateLock={ false }
				template={ defaultTemplate }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</Sidebar>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
