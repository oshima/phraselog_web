import React from 'react';
import styled from 'styled-components';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';

const Root = styled.svg`
  display: block;
  margin: 14px;
`;

function Logo() {
  return (
    <Root width={20} height={20}>
      <rect x={0} y={0} width={10} height={10} fill={lime[300]} />
      <rect x={10} y={0} width={10} height={10} fill={lime[600]} />
      <rect x={0} y={10} width={10} height={10} fill={teal[400]} />
    </Root>
  );
}

export default Logo;
