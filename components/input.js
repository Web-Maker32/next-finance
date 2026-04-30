export default function Input(props) {
    const { className, type, ...restProps } = props; 
    return (
      <input 
        {...restProps} 
        type={type} 
        className={`px-1.5 py-1 w-full rounded-md shadow-sm border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className || ''}`}
        style={{
          backgroundColor: 'var(--bg-input)',
          borderColor: 'var(--bg-input-border)'
        }}
      />
    );
}