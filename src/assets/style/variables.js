import styled from "styled-components";

export const colors = {
  softBlue: "hsl(215, 51%, 70%)",
  cyan: "hsl(178, 100%, 50%)",
  cyanHover: "hsl(178, 100%, 50%,0.5)",

  darkBlueCardBG: "hsla(205, 50%, 16%, 1)",
  darkBlueLine: "hsl(215, 32%, 27%)",
  White: "hsl(0, 0%, 100%)",
};

export const responsiveWidths = {
  mabile: "375px",
};

export const fontSize = {
  large: "18px",
  medium: "16px",
  small: "14px",
};
export const fontWidth = {
  light: 300,
  regular: 400,
  semiBold: 600,
};

export const borderRadius = {
  primary: "12px",
};

export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "space-between"};
  flex-direction: ${(props) => props.direction || "row"};
  height: ${({ height }) => height};
  gap: ${(props) => props.gap || "5px"};
`;
