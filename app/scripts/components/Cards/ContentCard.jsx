import React from 'react';
import Button from '../Button/Button';


function ContentCard(props) {
  const classNames = ['c-content-card'];
  if (props.noBorder) classNames.push('-no-border');
  if (props.background) classNames.push('-bg');
  if (props.size) {
    if (props.size === 'large') classNames.push('-large');
    if (props.size === 'short') classNames.push('-short');
  }

  let legend;
  if (props.header.legend) {
    legend = <span className="legend">{props.header.legend}</span>;
  }

  let subtitle;
  if (props.header.subtitle) {
    subtitle = <span className="legend">{props.header.subtitle}</span>;
  }


  return (
    <div className={classNames.join(' ')}>
      <div className="header">
        <div className="title">
          {legend}
          <h3>{props.header.title}</h3>
          <span>{subtitle}</span>
        </div>
        <div className="card-options">
          {props.share &&
            <Button action click={() => props.setShareModal()}>
              <svg className="icon" width="10" height="12" viewBox="0 0 10 12">
                <title>icon-share</title>
                <g fill="none" fillRule="evenodd">
                  <path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" /><path d="M9 1V0H2v2h5v5h2V1z" />
                </g>
              </svg>
            </Button>
          }
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

ContentCard.propTypes = {
  /**
   * Define the text below the title
   * Accepted values:
   * 	{
   *    title: [String],
   *    legend: [String, optional],
   *    subtitle: [String, optional]
   *  }
   */
  header: React.PropTypes.object.isRequired,
  /**
   * Define it the card size
   * accepted: short or large
   */
  size: React.PropTypes.string,
  /**
   * Define it the card has background
   */
  background: React.PropTypes.bool,
  /**
   * Define it the card has border
   */
  noBorder: React.PropTypes.bool,
  /**
   * Define tooltip content data
   */
  dataTooltip: React.PropTypes.any,
  /**
   * Define the content of the card
   * Required
   */
  children: React.PropTypes.object,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default ContentCard;
