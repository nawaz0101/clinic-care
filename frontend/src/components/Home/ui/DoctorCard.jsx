//Card components used to display doctor information

function DoctorCard({name, speciality}){
    return(
       <div style={styles.card}>
        {/*Doctor Avatar Placeholder*/}
        <div style={styles.avatar}>
          👨‍⚕️
        </div>
        <h3>{name}</h3>
        <p style={styles.speciality}>{speciality}</p>
       </div>
    );
}

const styles = {
  card: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    background: "white",
    transition: "0.2s"
  },

  avatar: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  specialty: {
    color: "#666"
  }

};

export default DoctorCard;