import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(16, 14, 25, 1)
  );

  min-height: 100vh;
  width: 100%;
  color: ${(props) => props.theme.periwinkleTint90};
  padding: 50px;
`;

export const ContainerDiffColor = styled(Container)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(62, 54, 102, 1)
  );
`;

export const ReviewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ul {
    width: max-content;
  }
`;

export const SearchContainer = styled(ContainerDiffColor)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3:first-child {
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

export const StatisticsContainer = styled(ContainerDiffColor)`
  background: linear-gradient(
    to right bottom,
    rgba(156, 136, 255, 1),
    rgba(62, 54, 102, 1)
  );
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  ul {
    padding: 20px;
    border-radius: 30px;
    border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
    background-color: ${(props) => props.theme.periwinkleTint90};
    color: ${(props) => props.theme.periwinkleShade50};
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 33px;
      padding: 20px;
      font-weight: 900;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
    li {
      display: block;
      padding: 1em;
    }
  }
`;

export const LiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props) => props.theme.periwinkle};
  color: white;
  border-radius: 10px;
  min-width: 45%;
  margin: 1.5em;
  margin-bottom: -0.5em;
  padding: 0px 30px;
`;
