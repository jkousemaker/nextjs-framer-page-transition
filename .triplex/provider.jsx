export default function Provider({ children, dark = false }) {
  return (
    <>
      <color args={[dark ? "#000" : "#fff"]} attach="background" />
      {children}
    </>
  );
}
