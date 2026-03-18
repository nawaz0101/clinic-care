// Reusable section title for consistent headings across pages

function SectionTitle({ title }) {
  return (
    <h2 style={styles.title}>{title}</h2>
  );
}

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "30px"
  }
};

export default SectionTitle;