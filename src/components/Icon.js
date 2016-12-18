import React, {PropTypes} from 'react';

const Icon = (props) => {
  const {name, size} = props;
  let pathArray;

  // Extract svg paths per icon into an array and provide a unique name
  switch (name) {
    case 'logo':
      pathArray = [
        "M91.6412602,55.976557 L88.3587398,55.976557 C87.8849085,55.976557 87.5,55.5563403 87.5,55.0359396 L87.5,39.2263317 C87.5,38.7073224 87.8849085,38.2857143 88.3587398,38.2857143 L91.6412602,38.2857143 C92.1150915,38.2857143 92.5,38.7073224 92.5,39.2263317 L92.5,55.0359396 C92.5,55.5563403 92.1150915,55.976557 91.6412602,55.976557 Z M8.35873984,55.976557 L11.6412602,55.976557 C12.1150915,55.976557 12.5,55.5549489 12.5,55.0359396 L12.5,39.2263317 C12.5,38.7073224 12.1150915,38.2857143 11.6412602,38.2857143 L8.35873984,38.2857143 C7.88490854,38.2857143 7.5,38.7073224 7.5,39.2263317 L7.5,55.0359396 C7.5,55.5549489 7.88490854,55.976557 8.35873984,55.976557 Z M49.9994578,73 C29.3617087,73 12.5,62.7849897 12.5,61.2875557 L12.5,30.7139153 C12.5,29.2150103 13.7149744,28 15.2156518,28 L84.7843482,28 C86.2850256,28 87.5,29.2150103 87.5,30.7139153 L87.5,61.2875557 C87.5,62.7849897 70.637207,73 49.9994578,73 Z",
        "M92.5,47.9285714 L100,47.9285714",
        "M7.5,47.9285714 L6.9388939e-17,47.9285714",
        "M25.625,49.8571429 C26.6605339,49.8571429 27.5,48.993692 27.5,47.9285714 C27.5,46.8634508 26.6605339,46 25.625,46 C24.5894661,46 23.75,46.8634508 23.75,47.9285714 C23.75,48.993692 24.5894661,49.8571429 25.625,49.8571429 Z M74.375,49.8571429 C75.4105339,49.8571429 76.25,48.993692 76.25,47.9285714 C76.25,46.8634508 75.4105339,46 74.375,46 C73.3394661,46 72.5,46.8634508 72.5,47.9285714 C72.5,48.993692 73.3394661,49.8571429 74.375,49.8571429 Z"
      ]
      break;
    default:
      break;
  }

  // Map the paths of the selected svg into a readable SVG path element
  const paths = pathArray.map((path) => {
    return(
      <path d={path} key={path.length} />
    )
  });

  // Turn names into readable titles
  const iconTitle = `${name.replace(/-/g, ' ')} icon`;

  // Return the mapped path elements into a <svg /> element
  return (
    <svg viewBox='0 0 100 100' width={size} height={size} {...props}>
      <title>{iconTitle}</title>
      {paths}
    </svg>
  );
};

// Define Icon Prop Types
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number
};

Icon.defaultProps = {
  name: ''
};

export default Icon;
