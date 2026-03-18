// Reusable input field component
// This will be used in forms such as appointment booking

function InputField({ label, type = "text", value, onChange, name }) {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column"
  },

  label: {
    marginBottom: "5px",
    fontWeight: "bold"
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  }
};

export default InputField;