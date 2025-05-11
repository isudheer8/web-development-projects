const Footer = () => {
    return (
      <footer style={styles.footer}>
        <p style={styles.text}>© 2023 Mini Arcade. All rights reserved.</p>
      </footer>
    );
  };
  
  const styles = {
    footer: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      position: 'fixed',
      bottom: '0',
      width: '100%',
    },
    text: {
      margin: '0',
    }
  };
  
  export default Footer;