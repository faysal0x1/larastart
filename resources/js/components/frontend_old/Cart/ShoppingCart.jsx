import React, { useState, useEffect } from 'react';
import { Minus, Plus, XCircle, Flame } from 'lucide-react';

const ShoppingCart = () => {
  // Sample product data (moved outside component for better organization)
  // Enhanced Product data
  const products = [
    {
      id: 1,
      sku: "TS-RGL-001",
      title: "Raglan Sleeve T-Shirt",
      type: "Clothing",
      category: "T-SHIRT",
      subCategory: "Casual",
      price: 36.00,
      discountedPrice: 32.40,
      originalPrice: 36.00,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      colors: ['red', 'blue', 'green'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      defaultImages: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
      ],
      images: {
        red: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        blue: [
          'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        green: [
          'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ]
      },
      totalQuantity: 450,
      inventory: {
        red: {
          XS: 25,
          S: 30,
          M: 35,
          L: 30,
          XL: 20,
          XXL: 10
        },
        blue: {
          XS: 25,
          S: 35,
          M: 40,
          L: 35,
          XL: 25,
          XXL: 15
        },
        green: {
          XS: 20,
          S: 30,
          M: 35,
          L: 30,
          XL: 20,
          XXL: 10
        }
      },
      description: {
        short: "Premium cotton raglan sleeve t-shirt with contrast color sleeves",
        long: "This premium cotton raglan sleeve t-shirt features contrast color sleeves and a comfortable fit. Made from 100% organic cotton, it's perfect for casual everyday wear. The raglan cut provides better mobility and a sporty look. Pre-shrunk fabric ensures the perfect fit wash after wash.",
        material: "100% Organic Cotton",
        care: "Machine wash cold, tumble dry low"
      }
    },
    {
      id: 2,
      sku: "DR-FLR-002",
      title: "Summer Floral Dress",
      type: "Clothing",
      category: "DRESS",
      subCategory: "Summer",
      price: 49.99,
      discountedPrice: 42.99,
      originalPrice: 59.99,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      colors: ['pink', 'white', 'gold'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      defaultImages: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
      ],
      images: {
        pink: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        white: [
          'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        gold: [
          'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=gold'
        ]
      },
      totalQuantity: 350,
      inventory: {
        pink: {
          XS: 20,
          S: 25,
          M: 30,
          L: 25,
          XL: 15
        },
        white: {
          XS: 20,
          S: 25,
          M: 35,
          L: 30,
          XL: 20
        },
        gold: {
          XS: 15,
          S: 25,
          M: 30,
          L: 25,
          XL: 10
        }
      },
      description: {
        short: "Light and breezy floral summer dress with delicate pattern",
        long: "This gorgeous summer dress features a beautiful floral pattern that's perfect for warm weather occasions. The lightweight, breathable fabric keeps you cool and comfortable all day long. With a flattering silhouette and adjustable straps, this dress is versatile enough for both casual outings and semi-formal events.",
        material: "95% Rayon, 5% Spandex",
        care: "Hand wash cold, line dry"
      }
    },
    {
      id: 3,
      sku: "SH-LNN-003",
      title: "Casual Linen Shirt",
      type: "Clothing",
      category: "SHIRT",
      subCategory: "Casual",
      price: 39.99,
      discountedPrice: 35.99,
      originalPrice: 45.00,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      colors: ['brown', 'blue', 'beige'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      defaultImages: [
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
      ],
      images: {
        brown: [
          'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        blue: [
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        beige: [
          'https://images.unsplash.com/photo-1620799139834-6b8f844dbbe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ]
      },
      totalQuantity: 425,
      inventory: {
        brown: {
          S: 25,
          M: 35,
          L: 30,
          XL: 20,
          XXL: 15
        },
        blue: {
          S: 30,
          M: 40,
          L: 35,
          XL: 25,
          XXL: 20
        },
        beige: {
          S: 25,
          M: 40,
          L: 40,
          XL: 30,
          XXL: 15
        }
      },
      description: {
        short: "Breathable linen shirt for a relaxed casual look",
        long: "Our casual linen shirt is perfect for those warm days when you want to stay cool while looking stylish. Made from high-quality linen fabric that gets softer with each wash, this shirt features a relaxed fit, button-down front, and classic collar. The breathable nature of linen makes it ideal for hot weather or vacation wear.",
        material: "100% Premium Linen",
        care: "Machine wash cold on gentle cycle, tumble dry low or hang to dry"
      }
    },
    {
      id: 4,
      sku: "SET-ATH-004",
      title: "Athletic Jogger Set",
      type: "Clothing",
      category: "SETS",
      subCategory: "Athleisure",
      price: 64.99,
      discountedPrice: 54.99,
      originalPrice: 79.99,
      isNew: true,
      isBestSeller: true,
      isOnSale: false,
      colors: ['black', 'gray', 'slate'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      defaultImages: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
      ],
      images: {
        black: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        gray: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        slate: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=slate'
        ]
      },
      totalQuantity: 375,
      inventory: {
        black: {
          XS: 20,
          S: 30,
          M: 35,
          L: 30,
          XL: 20
        },
        gray: {
          XS: 25,
          S: 30,
          M: 35,
          L: 30,
          XL: 25
        },
        slate: {
          XS: 15,
          S: 25,
          M: 30,
          L: 30,
          XL: 20
        }
      },
      description: {
        short: "Comfortable matching jogger set for workout or casual wear",
        long: "This athletic jogger set combines style and functionality for your active lifestyle. The set includes a matching top and bottom made from our premium performance fabric that wicks away moisture and provides four-way stretch. Perfect for workouts, running errands, or lounging at home. Features include an elastic waistband with drawstring, zippered pockets, and breathable mesh panels.",
        material: "88% Polyester, 12% Spandex",
        care: "Machine wash cold with like colors, tumble dry low"
      }
    },
    {
      id: 5,
      sku: "JK-DNM-005",
      title: "Denim Jacket",
      type: "Clothing",
      category: "JACKET",
      subCategory: "Casual",
      price: 89.99,
      discountedPrice: 79.99,
      originalPrice: 99.99,
      isNew: false,
      isBestSeller: true,
      isOnSale: false,
      colors: ['blue', 'black', 'brown'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      defaultImages: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
      ],
      images: {
        blue: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        black: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=black'
        ],
        brown: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=brown'
        ]
      },
      totalQuantity: 490,
      inventory: {
        blue: {
          XS: 20,
          S: 30,
          M: 35,
          L: 30,
          XL: 25,
          XXL: 20
        },
        black: {
          XS: 15,
          S: 25,
          M: 35,
          L: 30,
          XL: 25,
          XXL: 20
        },
        brown: {
          XS: 15,
          S: 25,
          M: 30,
          L: 30,
          XL: 25,
          XXL: 15
        }
      },
      description: {
        short: "Classic denim jacket with vintage wash and modern fit",
        long: "Our classic denim jacket combines timeless style with modern sensibility. Made from premium denim with just the right amount of stretch for comfort, this jacket features a slightly tailored fit that's flattering without being too tight. Traditional details include button front closure, chest pockets, and adjustable button cuffs. The vintage wash process gives each jacket unique character that will continue to develop with wear.",
        material: "98% Cotton, 2% Elastane",
        care: "Machine wash cold, inside out with similar colors. Tumble dry low."
      }
    }
  ]


  // Initialize cart with sample data
  const [cartItems, setCartItems] = useState([
    {
      ...products[0],
      quantity: 2,
      selectedColor: 'red',
      selectedSize: 'M'
    },
    {
      ...products[1],
      quantity: 1,
      selectedColor: 'pink',
      selectedSize: 'S'
    },
    {
      ...products[2],
      quantity: 1,
      selectedColor: 'blue',
      selectedSize: 'S'
    },
    {
      ...products[3],
      quantity: 1,
      selectedColor: 'gray',
      selectedSize: 'S'
    },
    {
      ...products[4],
      quantity: 1,
      selectedColor: 'black',
      selectedSize: 'S'
    }
  ]);

  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 30 });
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [isFreeShippingEligible, setIsFreeShippingEligible] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 100;
  const SHIPPING_OPTIONS = [
    { id: 'free', name: 'Free Shipping', cost: 0, condition: FREE_SHIPPING_THRESHOLD },
    { id: 'local', name: 'Local Delivery', cost: 30 },
    { id: 'flat', name: 'Flat Rate', cost: 40 }
  ];

  // Timer countdown
  useEffect(() => {
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
  }, []);

  // Calculate cart totals and check free shipping eligibility
  useEffect(() => {
    const newIsFreeShippingEligible = calculateSubtotal() >= FREE_SHIPPING_THRESHOLD;
    setIsFreeShippingEligible(newIsFreeShippingEligible);

    // Reset to free shipping if eligible
    if (newIsFreeShippingEligible && shippingCost !== 0) {
      setShippingCost(0);
    }
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discountAmount + shippingCost;
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyVoucher = (minAmount, discountPercent) => {
    const subtotal = calculateSubtotal();
    if (subtotal >= minAmount) {
      const discount = (subtotal * discountPercent) / 100;
      setAppliedVoucher({ minAmount, discountPercent });
      setDiscountAmount(discount);
    }
  };

  const handleVoucherSubmit = () => {
    // Simple voucher code validation
    const validCodes = {
      'FREESHIP': () => {
        if (calculateSubtotal() >= 50) {
          setShippingCost(0);
          return 'Free shipping applied!';
        }
        return 'Minimum $50 required for free shipping';
      },
      'SAVE10': () => {
        applyVoucher(100, 10);
        return '10% discount applied!';
      }
    };

    if (validCodes[voucherCode]) {
      alert(validCodes[voucherCode]());
    } else {
      alert('Invalid voucher code');
    }
    setVoucherCode('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // In a real app, this would redirect to checkout
    alert(`Proceeding to checkout. Total: $${calculateTotal().toFixed(2)}`);
  };

  const formatTime = (time) => {
    return `${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`;
  };

  const amountNeededForFreeShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal < FREE_SHIPPING_THRESHOLD ?
      (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2) :
      0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Section - Cart Items */}
          <div className="xl:w-2/3 w-full">
            {/* Timer Banner */}
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <Flame className="text-red-500 mr-2" size={24} />
              <span className="text-sm">
                Your cart will expire in
                <span className="font-bold text-red-500 ml-1">
                  {formatTime(timeLeft)}
                </span> minutes! Checkout now before items sell out!
              </span>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-lg mb-2">
                {isFreeShippingEligible ? (
                  <span className="text-green-600 font-bold">You've earned free shipping!</span>
                ) : (
                  <>
                    Spend <span className="font-bold text-blue-600">${amountNeededForFreeShipping()}</span> more for free shipping
                  </>
                )}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(100, (calculateSubtotal() / FREE_SHIPPING_THRESHOLD) * 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Cart Items Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1"></div>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="grid grid-cols-12 items-center p-4 border-b border-gray-200">
                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.images[item.selectedColor][0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.selectedColor} | {item.selectedSize}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      ${item.discountedPrice.toFixed(2)}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className={`px-2 py-1 ${item.quantity <= 1 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-1 text-center">
                      ${(item.quantity * item.discountedPrice).toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Voucher Section */}
            <div className="mt-6">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleVoucherSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Voucher 1 */}
                <div className={`border rounded-lg p-3 ${appliedVoucher?.minAmount === 200 ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="font-bold">10% OFF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Min. order $200</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">CODE: SAVE10</span>
                    <button
                      onClick={() => applyVoucher(200, 10)}
                      disabled={calculateSubtotal() < 200}
                      className={`text-xs px-3 py-1 rounded ${appliedVoucher?.minAmount === 200 ?
                        'bg-green-100 text-green-800' :
                        calculateSubtotal() >= 200 ?
                          'bg-blue-600 text-white hover:bg-blue-700' :
                          'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {appliedVoucher?.minAmount === 200 ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Voucher 2 */}
                <div className={`border rounded-lg p-3 ${appliedVoucher?.minAmount === 300 ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="font-bold">15% OFF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Min. order $300</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">CODE: SAVE15</span>
                    <button
                      onClick={() => applyVoucher(300, 15)}
                      disabled={calculateSubtotal() < 300}
                      className={`text-xs px-3 py-1 rounded ${appliedVoucher?.minAmount === 300 ?
                        'bg-green-100 text-green-800' :
                        calculateSubtotal() >= 300 ?
                          'bg-blue-600 text-white hover:bg-blue-700' :
                          'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {appliedVoucher?.minAmount === 300 ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Voucher 3 */}
                <div className={`border rounded-lg p-3 ${appliedVoucher?.minAmount === 400 ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="font-bold">20% OFF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Min. order $400</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">CODE: SAVE20</span>
                    <button
                      onClick={() => applyVoucher(400, 20)}
                      disabled={calculateSubtotal() < 400}
                      className={`text-xs px-3 py-1 rounded ${appliedVoucher?.minAmount === 400 ?
                        'bg-green-100 text-green-800' :
                        calculateSubtotal() >= 400 ?
                          'bg-blue-600 text-white hover:bg-blue-700' :
                          'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {appliedVoucher?.minAmount === 400 ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="xl:w-1/3 w-full">
            <div className="bg-gray-50 rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-red-500">-${discountAmount.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium mb-3">Shipping</h3>
                  <div className="space-y-2">
                    {SHIPPING_OPTIONS.map(option => (
                      <div key={option.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={option.id}
                            name="shipping"
                            checked={
                              (option.id === 'free' && isFreeShippingEligible && shippingCost === 0) ||
                              (option.id !== 'free' && shippingCost === option.cost)
                            }
                            onChange={() => setShippingCost(option.cost)}
                            disabled={option.id === 'free' && !isFreeShippingEligible}
                            className="mr-2"
                          />
                          <label
                            htmlFor={option.id}
                            className={option.id === 'free' && !isFreeShippingEligible ? 'text-gray-400' : ''}
                          >
                            {option.name}
                            {option.condition && (
                              <span className="text-xs text-gray-500 block">(Min. ${option.condition})</span>
                            )}
                          </label>
                        </div>
                        <span>
                          {option.id === 'free' && isFreeShippingEligible ? '$0.00' : `$${option.cost.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6 transition-colors"
              >
                Proceed to Checkout
              </button>

              <a
                href="/shop"
                className="block text-center text-blue-600 hover:underline mt-4"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;