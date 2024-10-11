const mobileAdapter = (setForMobile) => {

  const handleResize = () => {
      if (window.innerWidth <= 576) setForMobile (true);
      if (window.innerWidth > 576) setForMobile (false);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);  
    return () => {
      window.removeEventListener('resize', handleResize);   
    }  
  
  }
  
  export default mobileAdapter;