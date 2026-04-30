export default function Select(props) {
    return <select {...props} className="w-full rounded-md shadow-sm px-1.5 py-1 border"
    style={{
      backgroundColor: 'var(--bg-input)',
      borderColor: 'var(--bg-input-border)'
    }}></select>
}