import React, { useEffect, useState } from "react";
import { getProperties } from "../../services/propertyService";
import PropertyCard from "../../components/property/PropertyCard";
import MapView from "../../components/ui/Map";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
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
