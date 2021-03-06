import HeaderMenu from "../components/HeaderMenu";
import styled from "styled-components";
import { fetchWords } from "../api";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  loginState,
  testResultsState,
  weeklyWordsCntState,
  weeklyWordsState,
  wordsState,
} from "../atoms";
import { useEffect } from "react";
import { basicShowVariants } from "../styles/motionVariants";
import { ContainerDiffColor } from "../styles/containerStyle";
import OauthBox from "../components/OauthBox";

const ContentSection = styled(motion.div)`
  background-color: ${(props) => props.theme.periwinkleTint90};
  border-radius: 30px;
  padding-bottom: 50px;
  max-width: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: ${(props) => props.theme.periwinkleTint70} 0.5px solid;

  div {
    display: flex;
    justify-content: center;
    ul {
      width: max-content;
      text-align: center;
      color: ${(props) => props.theme.periwinkleShade30};
      margin-top: 50px;
      li {
        padding: 20px;
        margin-bottom: 1em;
        border-bottom: rgba(109, 95, 179, 0) 1px solid;
        border-top: rgba(109, 95, 179, 0) 1px solid;
        display: flex;
        align-items: center;
        svg {
          width: 1.5em;
          height: 1.5em;
          margin-right: 1em;
          path {
            fill: ${(props) => props.theme.periwinkleShade30};
          }
        }
        a {
          font-size: 25px;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }
`;

const Noti = styled.h3`
  padding: 50px 0px;
  background-color: ${(props) => props.theme.periwinkleShade10};
  color: ${(props) => props.theme.periwinkleTint90};
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

function Home() {
  const { user } = useRecoilValue(loginState);
  const { isLoading, data, isError } = useQuery("fetchWords", () =>
    fetchWords(user?._id)
  );
  const [words, setWords] = useRecoilState(wordsState);

  const navigate = useNavigate();
  const resetLogin = useResetRecoilState(loginState);
  const resetWords = useResetRecoilState(wordsState);
  const resetWeeklyWords = useResetRecoilState(weeklyWordsState);
  const resetWeeklyWordsCnt = useResetRecoilState(weeklyWordsCntState);
  const resetTestResults = useResetRecoilState(testResultsState);
  useEffect(() => {
    if (isError) {
      //???????????? ???????????? ???????????? ????????? ?????????????????? ???????????? ???????????? ??????(?????? ?????? ??? ????????? ????????? ?????? ?????? ?????????)
      //????????????
      resetWords();
      resetWeeklyWords();
      resetWeeklyWordsCnt();
      resetLogin();
      navigate("/login");
    } else if (data) {
      const { words: receivedWords } = data;
      setWords(receivedWords);
      resetTestResults();
    }
  }, [
    isError,
    data,
    navigate,
    resetLogin,
    resetWeeklyWords,
    resetWeeklyWordsCnt,
    resetWords,
    resetTestResults,
    setWords,
  ]);

  return (
    <>
      <HeaderMenu />
      <ContainerDiffColor>
        <ContentSection
          variants={basicShowVariants}
          initial="hidden"
          animate="show"
        >
          <Noti>
            {isLoading
              ? "????????? ?????? ???????????? ???"
              : `?????? ????????? ??????: ${words?.length}???`}
          </Noti>
          <div>
            <ul>
              <motion.li
                whileHover={{
                  scale: 1.2,
                  borderTop: "solid 1px rgba(109, 95, 179, 1)",
                  borderBottom: "solid 1px rgba(109, 95, 179, 1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z" />
                </svg>
                <Link to={words?.length > 0 ? "/words/review" : "/"}>
                  ?????? ????????????
                </Link>
              </motion.li>
              <motion.li
                whileHover={{
                  scale: 1.2,
                  borderTop: "solid 1px rgba(109, 95, 179, 1)",
                  borderBottom: "solid 1px rgba(109, 95, 179, 1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                </svg>
                <Link to={words?.length > 0 ? "/words/test/setting" : "/"}>
                  ?????? ??????
                </Link>
              </motion.li>
            </ul>
          </div>
        </ContentSection>
      </ContainerDiffColor>
    </>
  );
}

export default Home;
