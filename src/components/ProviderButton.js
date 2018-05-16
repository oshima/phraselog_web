import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Title from '~/components/Title';

const Root = styled.div`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  background-color: ${props => props.color};
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const Label = styled(Title)`
  margin-left: 8px;
  color: #fff;
`;

function ProviderButton({ color, icon, children, ...others }) {
  return (
    <Root color={color} {...others}>
      {icon}
      <Label bold>{children}</Label>
    </Root>
  );
}

export default ProviderButton;
