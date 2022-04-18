import HeaderMenu from "../components/HeaderMenu";
import JoinForm from "../components/JoinForm";
import OauthBox from "../components/OauthBox";
import { Container } from "../styles/containerStyle";

function Join() {
  return (
    <>
      <HeaderMenu />
      <Container>
        <JoinForm></JoinForm>
        <OauthBox></OauthBox>
      </Container>
    </>
  );
}

export default Join;
