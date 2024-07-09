import { calculateTotalPrice, validateEmail } from './util'; // Replace with actual file path

// Test suite for calculateTotalPrice function
describe('calculateTotalPrice function', () => {
  const emptyShoppingCartItem = [];
  const singleShoppingCartItem = [
    {
      book: {
        unitPrice: 10.99,
      },
      quantity: 1,
    },
  ];
  const multipleShoppingCartItems = [
    {
      book: {
        unitPrice: 10.99,
      },
      quantity: 2,
    },
    {
      book: {
        unitPrice: 15.49,
      },
      quantity: 3,
    },
  ];
  // Test case 1: Test with an empty array
  it('returns 0 for an empty array', () => {
    const totalPrice = calculateTotalPrice(emptyShoppingCartItem);
    expect(totalPrice).toEqual('0.00');
  });

  // Test case 2: Test with one item in the cart
  it('calculates total price correctly with one item', () => {
    const totalPrice = calculateTotalPrice(singleShoppingCartItem);
    expect(totalPrice).toEqual('10.99');
  });

  // Test case 3: Test with multiple items in the cart
  it('calculates total price correctly with multiple items', () => {
    const totalPrice = calculateTotalPrice(multipleShoppingCartItems);
    expect(totalPrice).toEqual('68.45');
  });

  // Edge case: Test with undefined or null input
  it('returns 0.00 for undefined or null input', () => {
    const totalPriceUndefined = calculateTotalPrice(undefined);
    expect(totalPriceUndefined).toEqual('0.00');
    const totalPriceNull = calculateTotalPrice(null);
    expect(totalPriceNull).toEqual('0.00');
  });
});


// Test suite for validateEmail function
describe('validate Email function', () => {
  it('returns false for invalid email', () => {
    const isValid = validateEmail('s@test');
    expect(isValid).toEqual(false);
  });

  // Test case 2: Test with one item in the cart
  it('returns true for valid email', () => {
    const isValid = validateEmail('s@test.com');
    expect(isValid).toEqual(true);
  });
});

