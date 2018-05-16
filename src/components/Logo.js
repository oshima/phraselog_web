import React from 'react';
import styled from 'styled-components';
import blue from '@material-ui/core/colors/blue';
import lime from '@material-ui/core/colors/lime';

const Root = styled.svg`
  display: block;
  margin: 14px;
`;

function Logo() {
  return (
    <Root width={20} height={20}>
      <rect x={0} y={0} width={10} height={10} fill={lime[200]} />
      <rect x={10} y={0} width={10} height={10} fill={lime[600]} />
      <rect x={0} y={10} width={10} height={10} fill={blue[500]} />
    </Root>
  );
}

export default Logo;
