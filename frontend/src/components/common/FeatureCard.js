/**
 * FeatureCard Component
 * Purpose: Display a single feature with icon, title and description
 * Props:
 * - icon: Image path for the feature icon
 * - title: Feature title
 * - description: Short explanation
 * - comingSoon: Boolean for upcoming features
 */

import React from 'react';

const FeatureCard = ({ icon, title, description, comingSoon }) => {
  return (
    <div className={`feature-card ${comingSoon ? 'coming-soon' : ''}`}>
      <div className="feature-icon">
        {icon ? (
          <img src={icon} alt={title} width="60" height="60" />
        ) : (
          <div className="icon-placeholder">
            <span className="icon-emoji">🌱</span>
          </div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {comingSoon && <span className="badge">Coming Soon</span>}
    </div>
  );
};

export default FeatureCard;