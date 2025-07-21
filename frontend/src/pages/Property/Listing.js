// src/pages/Property/Listing.js

import React, { useEffect, useState } from "react";
import propertyApi from "../../services/property/propertyApi"; // Property service
import PropertyCard from "../../components/property/PropertyCard"; // Grid view card
import MapView from "../../components/ui/Map"; // Map view

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "map"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property list on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await propertyApi.getProperties(); // ✅ Fixed
        setProperties(response.data); // Assumes response shape
      } catch (err) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="property-listing">
      <div className="view-toggle">
        <button onClick={() => setViewMode("grid")}>Grid View</button>
        <button onClick={() => setViewMode("map")}>Map View</button>
      </div>

      {viewMode === "grid" ? (
        <div className="property-grid">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        <MapView properties={properties} />
      )}
    </div>
  );
};

export default PropertyListing;
