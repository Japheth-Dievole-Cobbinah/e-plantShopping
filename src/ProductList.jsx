import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const plantsArray = [
        {
            category: "Aromatic Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1565011523534-747a8601f10a", description: "Calming scent, used in aromatherapy.", cost: "$15" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance, blooms at night.", cost: "$20" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1567331729369-414777b7c447", description: "Soothes burns and skin irritations.", cost: "$12" },
                { name: "Echinacea", image: "https://images.unsplash.com/photo-1588552205120-d39697a4dcc0", description: "Boosts the immune system.", cost: "$18" }
            ]
        }
    ];

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo">Paradise Nursery</div>
                <div className="nav-links">
                    <a href="#" onClick={(e) => handleContinueShopping(e)}>Plants</a>
                    <a href="#" onClick={(e) => handleCartClick(e)} className="cart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="30" width="30">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="cart-quantity-count">{totalQuantity}</span>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button 
                                            className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                                            disabled={addedToCart[plant.name]}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;