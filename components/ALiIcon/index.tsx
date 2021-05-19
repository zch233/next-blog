import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  icon: string;
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
const Icon = styled.svg`
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`;
const ALiIcon: React.FC<Props> = ({icon, className, onClick}) => {
  useEffect(() => {
    if(typeof window !== 'undefined'){
      require('./svg.js');
    }
  }, [])
  return (
    <Icon className={className} aria-hidden="true" onClick={onClick}>
      <use xlinkHref={`#icon-${icon}`} />
    </Icon>
  );
};

export default ALiIcon;