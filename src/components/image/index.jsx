import React, { useState } from "react";

const Image = ({
  src,
  alt,
  wrapperClassName = "",
  imageClassName = "",
  width = "auto",
  height = "auto",
  placeholderSrc = "",
  fallbackSrc = "",
  lazy = true,
  objectFit = "cover",
  onLoad = () => {},
  onError = () => {},
  ...imgProps
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = (e) => {
    setHasError(true);
    if (fallbackSrc) {
      e.target.src = fallbackSrc;
      e.target.alt = alt || "Image failed to load";
    }
    onError(e);
  };

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    onLoad(e);
  };

  return (
    <div
      className={`imageWrapper ${wrapperClassName}`}
      style={{
        "--width": width,
        "--height": height,
        "--objectFit": objectFit,
      }}
    >
      {!isLoaded && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt="placeholder"
          className={"placeholderImage"}
        />
      )}
      <img
        src={hasError ? fallbackSrc || "" : src}
        alt={alt}
        className={`mainImage ${
          isLoaded ? "loaded" : "loading"
        } ${imageClassName}`}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...imgProps}
      />
    </div>
  );
};

export default Image;
