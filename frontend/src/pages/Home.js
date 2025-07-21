// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import propertyApi from "../services/property/propertyApi";
import FeatureCard from "../components/common/FeatureCard";
import "../assets/styles/components/_home.scss";

const Home = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    location: ""
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);
      try {
        const response = await propertyApi.getProperties({
          property_type: filters.propertyType,
          min_price: filters.minPrice,
          max_price: filters.maxPrice,
          location: filters.location
        });
        if (Array.isArray(response)) {
          setProperties(response);
        } else {
          console.warn("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Failed to fetch properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [filters]);

  const features = [
    {
      icon: "rupee-graph.webp",
      title: t("home.feature1", "Investment Insights"),
      description: t("home.feature1_desc", "Analyze market trends before investing.")
    },
    {
      icon: "map-icon.webp",
      title: t("home.feature2", "Location Intelligence"),
      description: t("home.feature2_desc", "Get detailed reports on preferred locations.")
    },
    {
      icon: "land-record.webp",
      title: t("home.feature3", "Legal Document Verification"),
      description: t("home.feature3_desc", "Ensure property ownership is legitimate.")
    }
  ];

  const renderPropertyDescription = (property) => {
    const base = `Location: ${property.address}, Price: ₹${property.price}`;
    if (["flat", "apartment"].includes(property.property_type)) {
      return `${base}, Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}`;
    }
    return base;
  };

  return (
    <div className="home">
      {/* 🌟 Hero Section */}
      <section className="hero">
        <h1>{t("home.hero_title", "Find Your Perfect Property")}</h1>
        <p className="hero-subtitle">
          {t("home.hero_subtitle", "Browse verified listings today!")}
        </p>
        <button className="cta-button">
          {t("home.cta_button", "Explore Now")}
        </button>
      </section>

      {/* 🧭 Filter Section */}
      <section className="filter-section">
        <h2>Filter Properties</h2>
        <div className="filter-form">
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type (plot, flat, land)"
            value={filters.propertyType}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section className="features-section">
        <h2>{t("home.features_title", "Our Services")}</h2>
        <div className="features-grid">
          {features.map(({ icon, title, description }, idx) => (
            <FeatureCard
              key={idx}
              icon={
                <img
                  src={`/assets/images/icons/${icon}`}
                  alt={title}
                  width="60"
                  height="60"
                  loading="lazy"
                />
              }
              title={title}
              description={description}
            />
          ))}
        </div>
      </section>

      {/* 🏡 Property Listings */}
      <section className="properties-section">
        <h2>Available Properties</h2>
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="features-grid">
            {properties.length > 0 ? (
              properties.map((property) => (
                <FeatureCard
                  key={property.id}
                  title={property.title}
                  description={renderPropertyDescription(property)}
                />
              ))
            ) : (
              <p>No properties available at the moment.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
