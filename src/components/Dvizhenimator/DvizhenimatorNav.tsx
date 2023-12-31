import React, {
  Dispatch,
  SetStateAction,
  memo,
  useState,
} from "react";
import "./Dvizhenimator.scss";
import Input from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { useMediaQueries } from "../../hooks/useMediaQuery";

type DvizhenimatorNavTypes = {
  setPic: (input: string, offset: number, setDisabled: Dispatch<SetStateAction<boolean>>) => void
}

const DvizhenimatorNav = memo(({setPic}: DvizhenimatorNavTypes) => {
  const { lg } = useMediaQueries()
  const [input, setInput] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  let randomOffset = Math.floor(Math.random() * 4);
  return (
    <div className="dvizhenimator__item">
    <div className="dvizhenimator__nav">
      <Input<string>
        value={input}
        autoFocus={lg}
        type="text"
        placeholder="Мысль..."
        onKeyDown={(e) =>
          e.key === "Enter" &&
          setPic(input as string, randomOffset, setDisabled)
        }
        onChange={setInput}
      />
      <Button
        disabled={disabled}
        onClick={() => setPic(input as string, randomOffset, setDisabled)}>
        Поиск
      </Button>
    </div>
  </div>
  );
});

export default DvizhenimatorNav;
