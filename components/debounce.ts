import {useEffect, useState} from "react";

interface UseDebounceInterface {
  value?: string;
  delay?: number;
}


export const useDebounce = ({value='', delay=500}: UseDebounceInterface) => {
  const [inputVal, setInputVal] = useState(value)

  useEffect(() => {
    const search = setTimeout(() => {
      setInputVal(value);
    }, delay);

    return () => {
      clearTimeout(search);
    };
  }, [delay, value]);

  return inputVal;
};
