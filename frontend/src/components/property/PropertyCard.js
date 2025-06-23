import React from 'react';
import { PROPERTY_FIELD_RULES } from '../../utils/propertyRules';

const PropertyCard = ({ property }) => {
    const fields = PROPERTY_FIELD_RULES[property.property_type] || [];

    return (
        <div className="property-card">
            <h3>{property.title}</h3>
            {fields.includes('description') && <p>{property.description}</p>}
            {fields.includes('price') && <p>₹{property.price}</p>}
            {fields.includes('square_footage') && <p>{property.square_footage} sqft</p>}
            {fields.includes('bedrooms') && <p>Bedrooms: {property.bedrooms}</p>}
            {fields.includes('bathrooms') && <p>Bathrooms: {property.bathrooms}</p>}
            {fields.includes('year_built') && <p>Built: {property.year_built}</p>}
            {fields.includes('address') && <p>{property.address}</p>}
        </div>
    );
};

export default PropertyCard;