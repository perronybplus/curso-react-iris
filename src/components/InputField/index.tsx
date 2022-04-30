
interface IInputField {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  handleBlur?: (e:any) => void;
  handleChange?: (e:any) => void;
}

const InputField: React.FC<IInputField> = ({type, label, name, placeholder,value,handleBlur,handleChange }) => {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input className="form-control form-control-lg mb-3" 
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
       
        />
    </div>
  );
} 

export default InputField;