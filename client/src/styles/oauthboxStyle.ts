import styled from "styled-components";
import { motion } from "framer-motion";

export const OauthWrapper = styled(motion.div)`
  background-color: ${(props) => props.theme.periwinkleTint50};
  color: white;
  padding: 10px 10px;
  flex-direction: column;
  min-height: max-content;
  max-width: 50vw;
  border: 1.5px solid ${(props) => props.theme.periwinkleShade50};
  border-radius: 20px;
  width: 30%;
  min-width: max-content;
  display: flex;
  align-items: center;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background-color: ${(props) => props.theme.periwinkleShade30};
    font-size: 20px;
    font-weight: 600;
  }
`;

export const SocialLoginBtn = styled.button`
  background-color: ${(props) => props.theme.periwinkleTint90};
  width: max-content;

  img {
    width: 40px;
    height: 40px;
  }
`;

export const Positioner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
