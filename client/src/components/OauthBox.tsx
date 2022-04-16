import { basicShowVariants } from "../styles/motionVariants";
import {
  OauthWrapper,
  Positioner,
  SocialLoginBtn,
} from "../styles/oauthboxStyle";

function OauthBox() {
  const onGithubClick = async () => {
    const { finalUrl } = await (await fetch("/api/users/login/github")).json();
    window.location.href = finalUrl;
  };
  return (
    <Positioner>
      <OauthWrapper
        variants={basicShowVariants}
        initial="hidden"
        animate="show"
        custom={{ yValue: 50 }}
      >
        <h3>소셜 계정으로 계속하기</h3>
        <SocialLoginBtn onClick={onGithubClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        </SocialLoginBtn>
      </OauthWrapper>
    </Positioner>
  );
}

export default OauthBox;
