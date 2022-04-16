import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchGithubCode } from "../api";
import HeaderMenu from "../components/HeaderMenu";
import { Container } from "../styles/containerStyle";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { content, GitCallbackModalText, overlay } from "../styles/modalStyle";

function GitLoginCallback() {
  const baseUrl = "http://localhost:3000"; //local 아닐 때는 수정하기
  const code = window.location.href.replace(
    `${baseUrl}/login/github/callback?code=`,
    ""
  );
  const { isLoading, data, isError } = useQuery("fetchGithubCode", () =>
    fetchGithubCode(code)
  );
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  Modal.setAppElement("#root");

  useEffect(() => {
    if (data) {
      const { user } = data;
      const { password, ...rest } = user;
      setLogin({
        loggedIn: true,
        user: rest,
      });

      navigate("/");
    }
  }, [data, setLogin, navigate]);

  return (
    <>
      <HeaderMenu />
      <Container>
        {isLoading && (
          <Modal
            isOpen={true}
            style={{
              overlay,
              content,
            }}
          >
            <GitCallbackModalText>
              서버의 응답을 기다리는 중입니다.
              <br />
              잠시만 기다려주세요...
            </GitCallbackModalText>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default GitLoginCallback;
