import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Sweet = {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image?: string;
};

type CartItem = Sweet & {
    cartQuantity: number;
};

export type Order = {
    id: string;
    date: string;
    total: number;
    status: 'Processing' | 'Delivered';
    items: CartItem[];
};

type CartContextType = {
    cartItems: CartItem[];
    orders: Order[];
    addToCart: (sweet: Sweet) => void;
    removeFromCart: (id: string) => void;
    decrementFromCart: (id: string) => void;
    clearCart: () => void;
    placeOrder: () => void;
    cartTotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addToCart = (sweet: Sweet) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === sweet._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === sweet._id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }
            return [...prev, { ...sweet, cartQuantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    const decrementFromCart = (id: string) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === id);
            if (existing && existing.cartQuantity > 1) {
                return prev.map((item) =>
                    item._id === id
                        ? { ...item, cartQuantity: item.cartQuantity - 1 }
                        : item
                );
            }
            return prev.filter((item) => item._id !== id);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.cartQuantity,
        0
    );

    const cartCount = cartItems.reduce(
        (count, item) => count + item.cartQuantity,
        0
    );

    const placeOrder = () => {
        const newOrder: Order = {
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            total: cartTotal,
            status: 'Processing',
            items: [...cartItems]
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                orders,
                addToCart,
                removeFromCart,
                decrementFromCart,
                clearCart,
                placeOrder,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
