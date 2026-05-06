import React from "react";
// @ts-ignore
import sparkleBanner from "../resources/sparkle-banner-4-stars-v0-7hrbaiq57o9c1.webp";

export function Banner() {
  const bannerContainerStyles: React.CSSProperties = {
    position: 'relative',
    marginBottom: '20px',
    width: '100%',
      display: 'flex',
        justifyContent: 'center',
      margin : '0  0 20px 0 ',
    borderBottom: 1, borderColor: 'divider',
  };

  const imageStyles: React.CSSProperties = {
    width: '80%',
    height: 'auto',
    display: 'block',
  };

  // const triangleStyles: React.CSSProperties = {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: 'white',
  //        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
  // };

  return (
    <div className="banner" style={bannerContainerStyles}>
      <img src={sparkleBanner} alt="Sparkle Banner" style={imageStyles} />
      {/*<div style={triangleStyles}></div>*/}
    </div>
  );
}
