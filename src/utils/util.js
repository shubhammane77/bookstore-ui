export function calculateTotalPrice(shoppingCartItems) {
    let totalPrice = 0;

    shoppingCartItems && shoppingCartItems.forEach(shoppingCartItem => {
        totalPrice = totalPrice + shoppingCartItem.book.unitPrice * shoppingCartItem.quantity;
    });

    return totalPrice.toFixed(2);
}