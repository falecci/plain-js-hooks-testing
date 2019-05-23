import { useState, useCallback } from "react";

const useKeyPress = () => {
  const [pressedKeys, setPressedKeys] = useState([]);

  const clearPressedKeys = useCallback(() => setPressedKeys([]), []);

  const removeDuplicateKeys = useCallback(
    () => setPressedKeys(Array.from(new Set(pressedKeys))),
    [pressedKeys]
  );

  const setPressedKey = useCallback(
    key => setPressedKeys([...pressedKeys, key]),
    [pressedKeys]
  );

  return { pressedKeys, setPressedKey, removeDuplicateKeys, clearPressedKeys };
};

export default useKeyPress;
