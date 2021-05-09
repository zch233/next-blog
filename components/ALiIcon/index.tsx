import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  icon: string;
  className?: string;
}
const Icon = styled.svg`
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`;
const ALiIcon: React.FC<Props> = ({icon, className}) => {
  useEffect(() => {
    if(typeof window !== 'undefined'){
      require('./svg.js');
    }
  }, [])
  return (
    <Icon className={className} aria-hidden="true">
      <use xlinkHref={`#icon-${icon}`}></use>
    </Icon>
  );
};

export default ALiIcon;