// Call to Action encouraging doctors to book an appointment

import {Link} from "react-router-dom";

function AppointmentCTA(){
    return(
        <section style={styles.section}>
            <h2>Need Medical Assistance?</h2>

            <p>Scheduke an appointment with our doctors today.</p>

            <Link to="/appointment">
                <button style={styles.button}>Book Appointment</button>
            </Link>
        </section>
    );
}

const styles = {
  section: {
    padding: "60px 20px",
    textAlign: "center",
    background: "#1e88e5",
    color: "white"
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    fontSize: "16px",
    border: "none",
    background: "white",
    color: "#1e88e5",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AppointmentCTA;