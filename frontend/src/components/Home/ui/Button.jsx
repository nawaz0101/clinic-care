//Reusable UI Components
//Used across the website for consisting button styling

function Button({text, onClick, type="button"}){
    return(
        <button 
            type={type}
            onClick={onclick}
            style={styles.button}
        >
            {text}
        </button>
    );
}

const styles = {
  button: {
    padding: "12px 25px",
    background: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Button;