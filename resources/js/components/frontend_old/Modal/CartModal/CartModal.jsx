import React, { useState, useEffect } from 'react';

const CartModal = ({ isOpenCart, onCloseCart, product }) => {
  const [activeTab, setActiveTab] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [note, setNote] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    country: '',
    state: '',
    zipCode: ''
  });
  const [timeLeft, setTimeLeft] = useState({
    minutes: 14,
    seconds: 59
  });

  // Mock data for "You May Also Like" section
  const recommendedProducts = [
    {
      id: 2,
      name: 'Classic White Tee',
      price: 29,
      originPrice: 39,
      images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
    },
    {
      id: 3,
      name: 'Black Denim Jeans',
      price: 59,
      originPrice: 79,
      images: ['https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
    },
    {
      id: 4,
      name: 'Summer Floral Dress',
      price: 49.99,
      originPrice: 59.99,
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
    },
    {
      id: 5,
      name: 'Casual Linen Shirt',
      price: 39.99,
      originPrice: 45.00,
      images: ['https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
    }
  ];

  // Available coupons
  const availableCoupons = [
    { code: 'FREESHIP', discount: 'freeship', description: 'Free shipping on all orders' },
    { code: 'SAVE10', discount: 0.1, description: '10% off your order' },
    { code: 'SAVE20', discount: 0.2, description: '20% off your order' },
    { code: 'SAVE50', discount: 50, description: '$50 off orders over $200' }
  ];

  // Handle shipping form input changes
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate shipping
  const calculateShipping = () => {
    // Validate form
    if (!shippingInfo.country || !shippingInfo.zipCode) {
      alert('Please enter your country and zip/postal code');
      return;
    }

    // Here you would typically call an API to calculate shipping
    // For this example, just close the tab and display a success message
    alert('Shipping calculated successfully!');
    setActiveTab('');
  };

  // Initialize cart with passed product or default items
  useEffect(() => {
    if (product) {
      setCartItems([{
        id: product.id,
        name: product.title,
        price: product.price,
        originPrice: product.originalPrice,
        images: product.defaultImages,
        selectedSize: product.sizes[2], // Default to M
        selectedColor: product.colors[0],
        sizes: product.sizes,
        colors: product.colors,
        quantity: 1
      }]);
    } else {
      // Default cart items if no product passed
      setCartItems([]);
    }
  }, [product]);

  // Countdown timer
  useEffect(() => {
    if (!isOpenCart) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpenCart]);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const moneyForFreeship = 100;
  const shippingCost = appliedCoupon?.discount === 'freeship' ? 0 :
    subtotal >= moneyForFreeship ? 0 : 10;

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (typeof appliedCoupon.discount === 'number') {
      if (appliedCoupon.discount < 1) {
        // Percentage discount
        discountAmount = subtotal * appliedCoupon.discount;
      } else {
        // Fixed amount discount
        discountAmount = Math.min(appliedCoupon.discount, subtotal);
      }
    }
  }

  const total = subtotal - discountAmount + shippingCost;

  // Handle coupon application
  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
    setActiveTab('');
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Add recommended product to cart
  const addToCart = (product) => {
    // Check if product already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Add new product to cart
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originPrice: product.originPrice,
        images: product.images,
        selectedSize: 'M',
        selectedColor: 'default',
        sizes: ['S', 'M', 'L', 'XL'],
        quantity: 1
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  if (!isOpenCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0  backdrop-contrast-50" onClick={onCloseCart}></div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - You May Also Like */}
              <div className="w-full md:w-1/2 border-r border-gray-200 py-6 hidden md:block">
                <div className="text-xl font-semibold px-6 pb-3 flex items-center justify-between">
                  <span>You May Also Like</span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    onClick={onCloseCart}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
                <div className="px-6 overflow-y-auto max-h-96">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-gray-200'>
                      <div className="flex items-center gap-5">
                        <div className="bg-img rounded-lg overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className='w-24 h-24 object-cover'
                          />
                        </div>
                        <div>
                          <div className="name font-medium">{product.name}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="product-price font-semibold">${product.price.toFixed(2)}</div>
                            {product.originPrice > product.price && (
                              <div className="product-origin-price text-gray-500">
                                <del>${product.originPrice.toFixed(2)}</del>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-xl bg-white w-10 h-10 rounded-xl border border-black flex items-center justify-center transition-colors hover:bg-black hover:text-white"
                        onClick={() => addToCart(product)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Shopping Cart */}
              <div className="w-full md:w-1/2 py-6 relative">
                <div className="px-6 pb-3 flex items-center justify-between relative">
                  <div className="text-xl font-semibold">Shopping Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} Items)</div>
                  <button
                    className="close-btn w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    onClick={onCloseCart}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="time px-6">
                      <div className="flex items-center gap-3 px-5 py-3 bg-green-100 rounded-lg">
                        <p className='text-3xl'>🔥</p>
                        <div className="text-sm">
                          Your cart will expire in <span className='text-red-500 font-semibold'>
                            {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                          </span> minutes!<br />
                          Please checkout now before your items sell out!
                        </div>
                      </div>
                    </div>

                    <div className="banner mt-3 px-6">
                      <div className="text">
                        {subtotal < moneyForFreeship ? (
                          <>
                            Buy <span className="font-medium text-blue-600">${(moneyForFreeship - subtotal).toFixed(2)}</span>
                            <span> more to get </span>
                            <span className="font-medium text-blue-600">free shipping</span>
                          </>
                        ) : (
                          <span className="font-medium text-green-600">You've qualified for free shipping!</span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / moneyForFreeship) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="list-product px-6 overflow-y-auto max-h-64">
                      {cartItems.map((product) => (
                        <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-gray-200'>
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                            <div className='w-full'>
                              <div className="flex items-center justify-between w-full">
                                <div className="font-medium">{product.name}</div>
                                <button
                                  className="text-sm font-semibold text-red-500 underline cursor-pointer"
                                  onClick={() => removeItem(product.id)}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <div className="text-gray-500 capitalize">
                                  {product.selectedSize || product.sizes[0]}/{product.selectedColor || product.colors?.[0] || 'default'}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3 w-full">
                                <div className="quantity-controls flex items-center border border-gray-300 rounded-md overflow-hidden">
                                  <button
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1 text-center">{product.quantity}</span>
                                  <button
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="font-semibold">${(product.price * product.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="footer-modal bg-white">
                      <div className="flex items-center justify-center gap-8 px-6 py-4 border-b border-gray-200">
                        <button
                          className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
                          onClick={() => setActiveTab('note')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                          </svg>
                          <div className="text-sm">Note</div>
                        </button>
                        <button
                          className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
                          onClick={() => setActiveTab('shipping')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                          <div className="text-sm">Shipping</div>
                        </button>
                        <button
                          className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
                          onClick={() => setActiveTab('coupon')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                          </svg>
                          <div className="text-sm">Coupon</div>
                        </button>
                      </div>

                      {appliedCoupon && (
                        <div className="px-6 py-3 bg-green-100 text-green-800 text-sm flex justify-between items-center">
                          <div>
                            Coupon applied: <span className="font-semibold">{appliedCoupon.code}</span> - {appliedCoupon.description}
                          </div>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => setAppliedCoupon(null)}
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      <div className="px-6 py-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Subtotal</div>
                          <div className="font-medium">${subtotal.toFixed(2)}</div>
                        </div>

                        {discountAmount > 0 && (
                          <div className="flex items-center justify-between">
                            <div className="text-gray-600">Discount</div>
                            <div className="font-medium text-green-600">-${discountAmount.toFixed(2)}</div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Shipping</div>
                          <div className="font-medium">
                            {shippingCost === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              `$${shippingCost.toFixed(2)}`
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="text-lg font-semibold">Total</div>
                          <div className="text-lg font-semibold">${total.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="block-button text-center p-6">
                        <div className="flex items-center gap-4">
                          <button
                            className='button-main basis-1/2 bg-white border border-black text-black text-center uppercase py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors'
                            onClick={onCloseCart}
                          >
                            View cart
                          </button>
                          <button
                            className='button-main basis-1/2 text-center uppercase bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors'
                          >
                            Check Out
                          </button>
                        </div>
                        <button
                          onClick={onCloseCart}
                          className="text-blue-600 uppercase mt-4 text-center cursor-pointer inline-block relative hover:text-blue-800 transition-colors before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-px before:bg-blue-600"
                        >
                          Or continue shopping
                        </button>
                      </div>

                      {/* Note Tab */}
                      {activeTab === 'note' && (
                        <div className="px-6 py-4 bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 z-10">
                          <div className="flex items-center gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                            <div className="text-sm">Note</div>
                          </div>
                          <div className="form pt-4">
                            <textarea
                              name="form-note"
                              id="form-note"
                              rows={4}
                              placeholder='Add special instructions for your order...'
                              className='text-sm py-3 px-4 bg-gray-100 border-gray-200 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="block-button text-center pt-4 pb-6">
                            <button
                              className='w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors'
                              onClick={() => setActiveTab('')}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setActiveTab('')}
                              className="text-blue-600 uppercase mt-4 text-center cursor-pointer inline-block relative hover:text-blue-800 transition-colors before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-px before:bg-blue-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Shipping Tab */}
                      {activeTab === 'shipping' && (
                        <div className="px-6 py-4 bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 z-10">
                          <div className="flex items-center gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                            <div className="text-sm">Calculate Shipping</div>
                          </div>
                          <div className="form pt-4 space-y-4">
                            <div className="form-group">
                              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                              <select
                                id="country"
                                name="country"
                                value={shippingInfo.country}
                                onChange={handleShippingInfoChange}
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                              <select
                                id="state"
                                name="state"
                                value={shippingInfo.state}
                                onChange={handleShippingInfoChange}
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select a state</option>
                                {shippingInfo.country === 'US' && (
                                  <>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="FL">Florida</option>
                                    <option value="NY">New York</option>
                                    <option value="TX">Texas</option>
                                    <option value="WA">Washington</option>
                                  </>
                                )}
                                {shippingInfo.country === 'CA' && (
                                  <>
                                    <option value="AB">Alberta</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="ON">Ontario</option>
                                    <option value="QC">Quebec</option>
                                  </>
                                )}
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                              <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={shippingInfo.zipCode}
                                onChange={handleShippingInfoChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter zip/postal code"
                              />
                            </div>
                          </div>
                          <div className="block-button text-center pt-4 pb-6">
                            <button
                              className='w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors'
                              onClick={calculateShipping}
                            >
                              Calculate
                            </button>
                            <button
                              onClick={() => setActiveTab('')}
                              className="text-blue-600 uppercase mt-4 text-center cursor-pointer inline-block relative hover:text-blue-800 transition-colors before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-px before:bg-blue-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Coupon Tab */}
                      {activeTab === 'coupon' && (
                        <div className="px-6 py-4 bg-white absolute bottom-0 left-0 right-0 border-t border-gray-200 z-10">
                          <div className="flex items-center gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                              <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                            </svg>
                            <div className="text-sm">Apply Coupon</div>
                          </div>
                          <div className="form pt-4">
                            <div className="mb-4">
                              <label htmlFor="coupon-code" className="block text-sm font-medium text-gray-700 mb-1">Enter your coupon code:</label>
                              <div className="flex">
                                <input
                                  type="text"
                                  id="coupon-code"
                                  className="flex-grow py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter coupon code"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                  className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800 transition-colors"
                                  onClick={applyCoupon}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>

                            <div className="available-coupons mt-6">
                              <div className="text-sm font-medium text-gray-700 mb-3">Available coupons:</div>
                              <div className="space-y-3">
                                {availableCoupons.map((coupon, index) => (
                                  <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      setCouponCode(coupon.code);
                                      applyCoupon();
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="font-semibold text-blue-600">{coupon.code}</div>
                                      <div className="text-xs text-gray-500">Click to apply</div>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">{coupon.description}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="block-button text-center pt-4 pb-6">
                            <button
                              onClick={() => setActiveTab('')}
                              className="text-blue-600 uppercase text-center cursor-pointer inline-block relative hover:text-blue-800 transition-colors before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-px before:bg-blue-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-20 text-center">
                    <div className="mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="mx-auto text-gray-400" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button
                      className='bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors'
                      onClick={onCloseCart}
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;