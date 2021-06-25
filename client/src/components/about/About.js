import React  from 'react';
import "./About.css";
import gatito from '../../img/about1.gif'
// src='https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif'

const About = () => {
   return(
      <div className='container'>
            <h2>Aplicacion Food PI</h2>
        <div className='central'>
          <img className='img' src={gatito} />    
          <div className='parrafos'>
            <p>Aplicacion Creada con las siguientes tecnologias: HTML -CSS -JavaScript - React - Redux - Hooks - Express -Sequalize - Postgres DB </p>
            <div className='p'>
              <p>Creado por: Emiliano Rodriguez -- </p>
              <p>Mail :emilianor81@gmail.com--</p>
              <p> <a href='https://github.com/emilianor81' target='blank'> GitHub</a></p> 
            </div>
            
          </div>    
        </div> 
          
                 
      </div>
   )
}


export default About 
