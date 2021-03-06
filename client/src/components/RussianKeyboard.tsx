import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  BackSlashKey,
  BACKSPACEKey,
  CAPSLOCKKey,
  ENTERKey,
  Key,
  keyBoardVar,
  RightSHIFTKey,
  Row,
  SHIFTKey,
  TABKey,
  KeyboardWrapper,
} from "../styles/keyboardStyle";
import { onKeyClick } from "../util/keyboard";

interface IRussianKeyboardProps {
  keyboardRef: React.RefObject<HTMLDivElement>;
  inputRef: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >;
  lastInput: string;
  setLastInput: React.Dispatch<React.SetStateAction<string>>;
  shiftOn: boolean;
  setShiftOn: React.Dispatch<React.SetStateAction<boolean>>;
  capsLockOn: boolean;
  setCapsLockOn: React.Dispatch<React.SetStateAction<boolean>>;
  backSpaceOn: boolean;
  setBackSpaceOn: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function RussianKeyboard({
  keyboardRef,
  inputRef,
  lastInput,
  setLastInput,
  shiftOn,
  setShiftOn,
  capsLockOn,
  setCapsLockOn,
  backSpaceOn,
  setBackSpaceOn,
  className,
}: IRussianKeyboardProps) {
  const [cap, setCap] = useState(
    (!shiftOn && capsLockOn) || (shiftOn && !capsLockOn)
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let pressedKey: HTMLElement | null = null;
    if (!backSpaceOn) {
      pressedKey = document.getElementById(`rus_key_${lastInput}`);
      // console.log(pressedKey);
    } else if (backSpaceOn || lastInput === "backSpace") {
      pressedKey = document.getElementById("backSpace");
      if (backSpaceOn) setBackSpaceOn(false);
    }

    if (pressedKey?.classList.contains("pressed") && timeoutId.current) {
      clearTimeout(timeoutId.current);
      pressedKey.classList.remove("pressed");
    }
    pressedKey?.classList.add("pressed");
    timeoutId.current = setTimeout(() => {
      pressedKey?.classList.remove("pressed");
    }, 100);
    setLastInput("");
    if (backSpaceOn) setBackSpaceOn(false);
  }, [lastInput, setLastInput, backSpaceOn, setBackSpaceOn]);

  //CapsLock
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "CapsLock") {
        setCapsLockOn(event.getModifierState("CapsLock"));
      }
      if (event.key === "Shift") {
        setShiftOn(event.getModifierState("Shift"));
      }
      if (event.key === "Backspace") {
        setBackSpaceOn(true);
      }
    });
    document.addEventListener("keyup", (event) => {
      setShiftOn(event.getModifierState("Shift"));
    });
  }, [setCapsLockOn, setShiftOn]);

  useEffect(() => {
    setCap((!shiftOn && capsLockOn) || (shiftOn && !capsLockOn));
  }, [shiftOn, capsLockOn, setCap]);
  return (
    <KeyboardWrapper
      className={className}
      ref={keyboardRef}
      variants={keyBoardVar}
      initial="hidden"
      animate="appear"
      exit="disappear"
    >
      <Row>
        {cap
          ? [
              "??",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "0",
              "-",
              "??",
            ].map((key) => (
              <Key
                key={`rus_key_${key}`}
                id={`rus_key_${key}`}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))
          : [
              "??",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "0",
              "-",
              "??",
            ].map((key) => (
              <Key
                key={`rus_key_${key}`}
                id={`rus_key_${key}`}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))}
        <BACKSPACEKey id="backSpace">???</BACKSPACEKey>
      </Row>
      <Row>
        <TABKey>TAB</TABKey>
        {cap
          ? ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??"].map(
              (key) => (
                <Key
                  key={`rus_key_${key}`}
                  id={`rus_key_${key}`}
                  onClick={(event) => onKeyClick(event, inputRef)}
                >
                  {key}
                </Key>
              )
            )
          : ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??"].map(
              (key) => (
                <Key
                  key={`rus_key_${key}`}
                  id={`rus_key_${key}`}
                  onClick={(event) => onKeyClick(event, inputRef)}
                >
                  {key}
                </Key>
              )
            )}
        <BackSlashKey>{cap ? "??" : "??"}</BackSlashKey>
      </Row>
      <Row>
        <CAPSLOCKKey
          onClick={() => {
            setCapsLockOn((prev) => !prev);
          }}
        >
          CAPS
          <br />
          LOCK
        </CAPSLOCKKey>
        {cap
          ? ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??"].map(
              (key) => (
                <Key
                  key={`rus_key_${key}`}
                  id={`rus_key_${key}`}
                  onClick={(event) => onKeyClick(event, inputRef)}
                >
                  {key}
                </Key>
              )
            )
          : ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??"].map(
              (key) => (
                <Key
                  key={`rus_key_${key}`}
                  id={`rus_key_${key}`}
                  onClick={(event) => onKeyClick(event, inputRef)}
                >
                  {key}
                </Key>
              )
            )}
        <ENTERKey>ENTER</ENTERKey>
      </Row>
      <Row>
        <SHIFTKey
          onClick={() => {
            setShiftOn((prev) => !prev);
            setTimeout(() => {
              setShiftOn((prev) => !prev);
            }, 100);
          }}
        >
          SHIFT
        </SHIFTKey>
        {cap
          ? ["??", "??", "??", "??", "??", "??", "??", ",", ".", "/"].map((key) => (
              <Key
                key={`rus_key_${key}`}
                id={`rus_key_${key}`}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))
          : ["??", "??", "??", "??", "??", "??", "??", ",", ".", "/"].map((key) => (
              <Key
                key={`rus_key_${key}`}
                id={`rus_key_${key}`}
                onClick={(event) => onKeyClick(event, inputRef)}
              >
                {key}
              </Key>
            ))}
        <RightSHIFTKey
          onClick={() => {
            setShiftOn((prev) => !prev);
            setTimeout(() => {
              setShiftOn((prev) => !prev);
            }, 100);
          }}
        >
          SHIFT
        </RightSHIFTKey>
      </Row>
    </KeyboardWrapper>
  );
}

export default RussianKeyboard;
