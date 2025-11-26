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

export default products;


// const products = [
//     {
//         id: 1,
//         sku: "TS-RGL-001",
//         title: "Raglan Sleeve T-Shirt",
//         type: "Clothing",
//         category: "T-SHIRT",
//         subCategory: "Casual",
//         price: 36.00,
//         discountedPrice: 32.40,
//         originalPrice: 36.00,
//         isNew: true,
//         isBestSeller: true,
//         isOnSale: false,
//         colors: ['red', 'blue', 'green'],
//         sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
//         defaultImages: [
//             'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
//             'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=back',
//             'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&view=side'
//         ],
//         images: {
//             red: [
//                 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
//             ],
//             blue: [
//                 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
//             ],
//             green: [
//                 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
//             ]
//         },
//         totalQuantity: 450,
//         inventory: {
//             red: {
//                 XS: 25,
//                 S: 30,
//                 M: 35,
//                 L: 30,
//                 XL: 20,
//                 XXL: 10
//             },
//             blue: {
//                 XS: 25,
//                 S: 35,
//                 M: 40,
//                 L: 35,
//                 XL: 25,
//                 XXL: 15
//             },
//             green: {
//                 XS: 20,
//                 S: 30,
//                 M: 35,
//                 L: 30,
//                 XL: 20,
//                 XXL: 10
//             }
//         },
//         description: {
//             short: "Premium cotton raglan sleeve t-shirt with contrast color sleeves",
//             long: "This premium cotton raglan sleeve t-shirt features contrast color sleeves and a comfortable fit. Made from 100% organic cotton, it's perfect for casual everyday wear. The raglan cut provides better mobility and a sporty look. Pre-shrunk fabric ensures the perfect fit wash after wash.",
//             material: "100% Organic Cotton",
//             care: "Machine wash cold, tumble dry low"
//         }
//     }
// ]