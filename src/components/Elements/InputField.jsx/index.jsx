export default function InputField({ type, name, placeholder }) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor={name}>{placeholder}</label>
      <input type={type} name={name} id={name} />
    </div>
  );
}
