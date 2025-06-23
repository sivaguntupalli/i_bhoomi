import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import FeatureCard from "../components/common/FeatureCard";
import "../assets/styles/components/_home.scss";

const Home = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ propertyType: "", minPrice: "", maxPrice: "", location: "" });
  const [properties, setProperties] = useState([]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/properties/?property_type=${filters.propertyType}&min_price=${filters.minPrice}&max_price=${filters.maxPrice}&location=${filters.location}`
        );
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error("Invalid API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [filters]);

  const features = [
    {
      icon: "rupee-graph.webp",
      title: t("home.feature1") || "Investment Insights",
      description: t("home.feature1_desc") || "Analyze market trends before investing.",
    },
    {
      icon: "map-icon.webp",
      title: t("home.feature2") || "Location Intelligence",
      description: t("home.feature2_desc") || "Get detailed reports on preferred locations.",
    },
    {
      icon: "land-record.webp",
      title: t("home.feature3") || "Legal Document Verification",
      description: t("home.feature3_desc") || "Ensure property ownership is legitimate.",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>{t("home.hero_title") || "Find Your Perfect Property"}</h1>
        <p className="hero-subtitle">{t("home.hero_subtitle") || "Browse verified listings today!"}</p>
        <button className="cta-button">{t("home.cta_button") || "Explore Now"}</button>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <h2>Filter Properties</h2>
        <div className="filter-form">
          <input type="text" name="propertyType" placeholder="Property Type (plot, flat, land)" value={filters.propertyType} onChange={handleFilterChange} />
          <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
          <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} />
          <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>{t("home.features_title") || "Our Services"}</h2>
        <div className="features-grid">
          {features.map(({ icon, title, description }, index) => (
            <FeatureCard
              key={`feature-${index}`}
              icon={<img src={`/assets/images/icons/${icon}`} alt={title} width="60" height="60" loading="lazy" />}
              title={title}
              description={description}
            />
          ))}
        </div>
      </section>

      {/* Property Listings */}
      <section className="properties-section">
        <h2>Available Properties</h2>
        <div className="features-grid">
          {properties.length > 0 ? (
            properties.map((property) => (
              <FeatureCard
                key={property.id}
                title={property.title}
                description={
                  property.property_type === "land" || property.property_type === "plot"
                    ? `Location: ${property.address}, Price: ${property.price}`
                    : property.property_type === "flat" || property.property_type === "apartment"
                    ? `Location: ${property.address}, Price: ${property.price}, Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}`
                    : `Location: ${property.address}, Price: ${property.price}`
                }
              />
            ))
          ) : (
            <p>No properties available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
