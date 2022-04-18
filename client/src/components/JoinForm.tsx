import styled from "styled-components";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ButtonContainer,
  ErrorMessage,
  JoinFormContainer,
  JoinPageForm,
  JoinPwConfirm,
} from "../styles/formStyle";
import { basicShowVariants } from "../styles/motionVariants";
import { DarkBox } from "../styles/boxStyle";

interface IForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

function JoinForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IForm>();
  const navigate = useNavigate();

  const [login, setLogin] = useRecoilState(loginState);
  if (login.loggedIn) {
    fetch("/api/users/logout");
    setLogin({
      loggedIn: false,
      user: null,
    });
  }

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = (data: IForm) => {
    if (
      !validator.isStrongPassword(data.password, {
        minUppercase: 0,
      })
    ) {
      setError("password", {
        message:
          "최소 8자 이상, 알파벳 소문자, 숫자, 특수문자가 포함된 비밀번호를 입력해주세요.",
      });
    } else if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
    } else if (!validator.isEmail(data.email)) {
      setError("email", { message: "이메일 주소를 확인해주세요." });
    } else {
      fetch("/api/users/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      }).then((response) => {
        const status = response.status;
        if (status === 400) {
          setError("email", { message: "이미 가입된 이메일입니다." });
        } else {
          navigate("/login");
        }
      });
    }

    setValue("email", "");
    setValue("name", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
  };
  return (
    <>
      <JoinFormContainer>
        <JoinPageForm
          onSubmit={handleSubmit(onValid)}
          variants={basicShowVariants}
          initial="hidden"
          animate="show"
          custom={{ yValue: -50 }}
        >
          <h3>환영합니다</h3>
          <ul>
            <DarkBox>
              <li>
                <label>
                  <strong>이메일</strong>
                </label>
                <input
                  type={"email"}
                  {...register("email", {
                    required: "이메일 주소를 입력해주세요.",
                  })}
                  placeholder="required"
                />
              </li>
              <ErrorMessage>
                {errors?.email?.message && (
                  <span>{errors?.email?.message}</span>
                )}
              </ErrorMessage>
            </DarkBox>
            <DarkBox>
              <li>
                <label>
                  <strong>닉네임</strong>
                </label>
                <input
                  type={"text"}
                  {...register("name", {
                    required: "닉네임을 입력해주세요.",
                  })}
                  placeholder="required"
                />
              </li>
              <ErrorMessage>
                {errors?.name?.message && <span>{errors?.name?.message}</span>}
              </ErrorMessage>
            </DarkBox>
            <DarkBox>
              <li>
                <label>
                  <strong>비밀번호</strong>
                </label>
                <span>
                  최소 8자 이상, 알파벳 소문자, 숫자, 특수문자가 포함되어야
                  합니다.
                </span>
                <input
                  type={"password"}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                  placeholder="required"
                />
              </li>
              <ErrorMessage>
                {errors?.password?.message && (
                  <span>{errors?.password?.message}</span>
                )}
              </ErrorMessage>
              <li>
                <label>
                  <JoinPwConfirm>비밀번호 확인</JoinPwConfirm>
                </label>
                <input
                  type={"password"}
                  {...register("passwordConfirm", {
                    required:
                      "비밀번호 확인을 위해 비밀번호를 다시 한 번 입력해주세요.",
                  })}
                  placeholder="required"
                />
              </li>
              <ErrorMessage>
                {errors?.passwordConfirm?.message && (
                  <span>{errors?.passwordConfirm?.message}</span>
                )}
              </ErrorMessage>
            </DarkBox>
          </ul>
          <ButtonContainer>
            <button>가입</button>
          </ButtonContainer>
        </JoinPageForm>
      </JoinFormContainer>
    </>
  );
}

export default JoinForm;
