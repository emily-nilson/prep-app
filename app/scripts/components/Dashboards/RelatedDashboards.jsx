import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';

function RelatedDasboards(props) {
  if (!props.data.length) return null;

  return (
    <div className="l-related-dashboards -inverse">
      <div className="row">
        <div className="columns small-12">
          <h2 className="-left"> Other dashboards </h2>
        </div>
      </div>
      <div className="row">
        {props.data.map((item, index) => (
          <div
            className="columns small-12 medium-6 align-stretch"
            key={`dashboard-item-${index}`}
            style={{ display: 'flex' }}
          >
            <Card border>
              <h3>
                <Link to={`/dashboard/${item.slug}/data`}>
                  {item.title}
                </Link>
              </h3>
              <p>
                {item.summary}
              </p>
              {item.partner &&
              <a href={item.partner.url} target="_blank">
                <img
                  src={config.assetsUrl + item.partner.images.logo}
                  className="logo"
                  alt={item.partner.name}
                />
              </a>
                }
            </Card>
          </div>
          ))}
      </div>
    </div>
  );
}

RelatedDasboards.propTypes = {
  data: React.PropTypes.array
};

export default RelatedDasboards;
