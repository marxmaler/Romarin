import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { basicShowVariants } from "../styles/motionVariants";
import {
  LoginPageForm,
  ButtonContainer,
  ErrorMessage,
  JoinFormContainer,
} from "../styles/formStyle";
import { DarkBox } from "../styles/boxStyle";

interface IForm {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IForm>();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = async (data: IForm) => {
    // console.log(data);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    // console.log(response.status);
    if (response.status === 404) {
      setError("email", { message: "등록되지 않은 이메일입니다." });
    } else if (response.status === 400) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
    } else if (response.status === 401) {
      const { user } = await response.json();
      if (user.email === data.email) {
        const { password, ...rest } = user;
        setLogin({
          loggedIn: true,
          user: rest,
        });

        navigate("/");
      } else {
        await fetch("/api/users/logout");
        setLogin({ loggedIn: false, user: null });
        const { user } = await (
          await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
          })
        ).json();
        const { password, ...rest } = user;
        setLogin({
          loggedIn: true,
          user: rest,
        });

        navigate("/");
      }
    } else {
      const { user } = await response.json();
      const { password, ...rest } = user;
      setLogin({
        loggedIn: true,
        user: rest,
      });

      navigate("/");
    }
    setValue("email", "");
    setValue("password", "");
  };
  return (
    <>
      <JoinFormContainer>
        <LoginPageForm
          onSubmit={handleSubmit(onValid)}
          variants={basicShowVariants}
          initial="hidden"
          animate="show"
          custom={{ yValue: -50 }}
        >
          <h3>로그인</h3>
          <ul>
            <DarkBox>
              <li>
                <label>이메일</label>
                <input
                  type={"email"}
                  {...register("email", { required: true })}
                  placeholder="Email"
                ></input>
              </li>
              <ErrorMessage>
                {errors?.email?.message && (
                  <span>{errors?.email?.message}</span>
                )}
              </ErrorMessage>
              <li>
                <label>비밀번호</label>
                <input
                  type={"password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                ></input>
              </li>
            </DarkBox>

            <ErrorMessage>
              {errors?.password?.message && (
                <span>{errors?.password?.message}</span>
              )}
            </ErrorMessage>
          </ul>
          <ButtonContainer>
            <button>로그인</button>
          </ButtonContainer>
        </LoginPageForm>
      </JoinFormContainer>
    </>
  );
}

export default LoginForm;
