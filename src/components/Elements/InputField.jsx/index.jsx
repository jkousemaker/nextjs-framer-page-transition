export default function InputField({ type, name, placeholder }) {
  return (
    <div className="flex flex-col items-start">
      <label for={name}>{placeholder}</label>
      <input
        onBeforeInput={() => console.log(true)}
        type={type}
        name={name}
        id={name}
      />
    </div>
  );
}
