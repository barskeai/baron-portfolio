export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={0.8} color="#7cff6b" />
    </>
  );
}
