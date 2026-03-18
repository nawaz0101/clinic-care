//Service card component
//Displays information about a clinic service

function ServiceCard({title, description}){
    return(
        <div style={styles.card}>
            {/* Icon placeholder*/}
            <div style={styles.icon}>🏥</div>

            <h3>{title}</h3>

            <p style={styles.description}>
                {description}
            </p>
        </div>
    );
}

const styles = {

  card: {
    padding: "25px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    transition: "0.2s"
  },

  icon: {
    fontSize: "35px",
    marginBottom: "10px"
  },

  description: {
    color: "#666",
    fontSize: "14px"
  }

};

export default ServiceCard;