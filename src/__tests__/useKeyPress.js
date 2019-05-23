import useKeyPress from "../useKeyPress";
import { renderHook, act } from "react-hooks-testing-library";

describe("useKeyPress", () => {
  it("should return an empty array at initialization", () => {
    const { result } = renderHook(() => useKeyPress());
    expect(result.current).toEqual({
      pressedKeys: [],
      setPressedKey: expect.any(Function),
      clearPressedKeys: expect.any(Function),
      removeDuplicateKeys: expect.any(Function)
    });
  });

  it("should add a key to pressedKeys when calling setPressedKey", () => {
    const { result } = renderHook(() => useKeyPress());

    act(() => result.current.setPressedKey("k"));

    expect(result.current.pressedKeys).toHaveLength(1);
    expect(result.current.pressedKeys).toContain("k");

    act(() => result.current.setPressedKey("l"));

    expect(result.current.pressedKeys).toHaveLength(2);
    expect(result.current.pressedKeys).toContain("l");
  });

  it("should clear pressedKeys when calling clearPressedKeys", () => {
    const { result } = renderHook(() => useKeyPress());

    act(() => result.current.setPressedKey("k"));
    act(() => result.current.setPressedKey("l"));

    expect(result.current.pressedKeys).toHaveLength(2);

    act(() => result.current.clearPressedKeys());
    expect(result.current.pressedKeys).toHaveLength(0);
  });

  it("should remove duplicates when calling removeDuplicateKeys", () => {
    const { result } = renderHook(() => useKeyPress());

    act(() => result.current.setPressedKey("l"));
    act(() => result.current.setPressedKey("l"));
    act(() => result.current.setPressedKey("l"));
    act(() => result.current.setPressedKey("f"));

    expect(result.current.pressedKeys).toHaveLength(4);

    act(() => result.current.removeDuplicateKeys());
    expect(result.current.pressedKeys).toHaveLength(2);
    expect(result.current.pressedKeys.filter(p => p === "l")).toHaveLength(1);
  });
});
