import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import "./HomePage.css";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    deals: [],
    delivery: [],
    maxPrice: 2000,
    minPrice: 0,
    minRating: 0,
    payOnDelivery: false
  });

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Apply filters whenever filters, search, or allProducts change
  useEffect(() => {
    let result = [...allProducts];

    // 🔍 Search Filter
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }

    // Price Filter
    result = result.filter(p => p.price >= (filters.minPrice || 0) && p.price <= filters.maxPrice);

    // Rating Filter
    if (filters.minRating > 0) {
      result = result.filter(p => (p.averageRating || 0) >= filters.minRating);
    }

    // Mock Filters
    if (filters.deals.includes("republic")) {
      result = result.filter(p => p.discountPercent > 0 || p.tag === "Sale");
    }

    setFilteredProducts(result);
  }, [filters, searchTerm, allProducts]);

  return (
    <div className="home">
      <Header onSearch={handleSearch} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            SAFETY,<br />
            REDEFINED.
          </h1>
          <p>
            Experience the next generation of grip technology.
            Engineered for athletes, designed for life.
          </p>
          <button className="primary-btn">Shop Collection</button>

          <div className="hero-stats">
            <div>
              <h3>10K+</h3>
              <span>Happy Athletes</span>
            </div>
            <div>
              <h3>99.8%</h3>
              <span>Satisfaction Rate</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src="/highgrip.png" alt="Hero Shoe" />
          <div className="iso-badge">
            Medical Grade <br />
            <strong>ISO CERTIFIED</strong>
          </div>
        </div>
      </section>

      {/* Main Shop Section with Sidebar */}
      <div className="shop-layout container" style={{ display: 'flex', gap: '40px', padding: '60px 20px' }}>
        <SidebarFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="shop-main" style={{ flex: 1 }}>
          <section className="collection-compact" style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '10px' }}>EXPLORE COLLECTION</h2>
            <p style={{ color: '#6b7280' }}>{filteredProducts.length} items found based on your filters</p>
          </section>

          <section className="products-grid-container">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <div className="no-results" style={{ textAlign: 'center', padding: '100px 0' }}>
                <h3>No products match your filters</h3>
                <button
                  onClick={() => setFilters({
                    deals: [],
                    delivery: [],
                    maxPrice: 2000,
                    minPrice: 0,
                    minRating: 0,
                    payOnDelivery: false
                  })}
                  className="minimal-logout"
                  style={{ marginTop: '20px' }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="products" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px',
                padding: '0' // Adjusted padding because container handles it
              }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* GRIP TECH */}
      <section className="grip">
        <h2>GRIP-TECH™</h2>
        <p>Revolutionary grip engineered for peak performance</p>

        <div className="grip-content">
          <img src="/highgrip.png" alt="Grip Tech" />
          <div>
            <div className="grip-box">
              <h4>Medical Grade Silicone</h4>
              <p>FDA-approved compound ensures superior traction.</p>
            </div>
            <div className="grip-box">
              <h4>Grip Lock Pattern</h4>
              <p>Hexagonal pattern delivers 3× more grip.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="proof">
        <h2>PROFESSIONAL PROOF</h2>
        <div className="proof-grid">
          <div className="proof-card">“Transformed my training completely.”</div>
          <div className="proof-card">“Doctor recommended – excellent quality.”</div>
          <div className="proof-card">“Perfect for yoga and workouts.”</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>HIGHGRIP</h3>
        <p>Redefining safety through innovative grip technology.</p>
      </footer>

    </div>
  );
}


