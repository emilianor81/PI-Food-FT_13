import React  from 'react';
import "./About.css";
import gatito from '../../img/about1.gif'


const About = () => {
   return(
      <div className='container'>
       <div className='central'>
       <h2>Aplicacion Food PI</h2>
        <p className='p'> Aplicacion creada durante el cursado de Academia Henry, la misma esta realizada utilizando las tecnologias
          HTML, CSS, JavaScript, React, Redux, Express, Sequalize y Postgres DB
        </p>
        <img src='https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif'/>
        <h5>Creado por: Emiliano Rodriguez</h5>
        <h6>https://github.com/emilianor81</h6>
        <h6>emilianor81@gmail.com</h6>

      </div> 
       

        
        
      </div>
     
      
    )
}


export default About 
