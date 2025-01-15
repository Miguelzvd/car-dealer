export function LoadingDots({
  className = '',
  dotSize = '0.5rem',
  dotsColor = 'bg-black',
}) {
  const dotStyle = {
    height: dotSize,
    width: dotSize,
  };

  return (
    <div
      className={`flex space-x-2 justify-center items-center min-h-10 rounded-md ${className}`}
    >
      <span className="sr-only">Loading...</span>
      <div
        className={`${dotsColor} rounded-full animate-bounce`}
        style={{ ...dotStyle, animationDelay: '-0.3s' }}
      ></div>
      <div
        className={`${dotsColor} rounded-full animate-bounce`}
        style={{ ...dotStyle, animationDelay: '-0.15s' }}
      ></div>
      <div
        className={`${dotsColor} rounded-full animate-bounce`}
        style={dotStyle}
      ></div>
    </div>
  );
}
