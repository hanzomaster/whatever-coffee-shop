import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	imgPath?: string | null;
}

const CART_STORAGE_KEY = 'coffee-shop-cart';

function loadCart(): CartItem[] {
	if (!browser) return [];
	try {
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveCart(items: CartItem[]) {
	if (!browser) return;
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	} catch {
		// Ignore storage errors
	}
}

function createCartStore() {
	let items = $state<CartItem[]>(loadCart());

	const total = $derived(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
	const count = $derived(items.reduce((sum, item) => sum + item.quantity, 0));

	return {
		get items() {
			return items;
		},
		get total() {
			return total;
		},
		get count() {
			return count;
		},

		add(product: { id: number; name: string; price: number; imgPath?: string | null }) {
			const existing = items.find((item) => item.id === product.id);
			if (existing) {
				existing.quantity++;
				items = [...items];
				toast.success(`Added another ${product.name} to cart`);
			} else {
				items = [...items, { ...product, quantity: 1 }];
				toast.success(`${product.name} added to cart`);
			}
			saveCart(items);
		},

		remove(id: number) {
			const item = items.find((i) => i.id === id);
			items = items.filter((i) => i.id !== id);
			saveCart(items);
			if (item) {
				toast.info(`${item.name} removed from cart`);
			}
		},

		updateQuantity(id: number, quantity: number) {
			if (quantity <= 0) {
				this.remove(id);
				return;
			}
			const item = items.find((i) => i.id === id);
			if (item) {
				item.quantity = quantity;
				items = [...items];
				saveCart(items);
			}
		},

		clear() {
			items = [];
			saveCart(items);
			toast.info('Cart cleared');
		}
	};
}

export const cart = createCartStore();
