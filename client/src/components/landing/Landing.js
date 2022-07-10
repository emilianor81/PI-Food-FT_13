import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets } from '../../redux/Actions';
import style from './Landing.module.css';
import { connect } from 'react-redux';

const Landing = ({ getRecipes, getDiets }) => {
    useEffect(() => {
        getRecipes()
        getDiets();
      }, [getDiets, getRecipes])

    return (
        <div className={style.container}>   
          <div className={style.divH1}>
              <h1 className={style.h1}>Food Recipes</h1>
          </div>
          <div className={style.divButton}>
          <Link to='/Home'> <button className={style.button}> Home </button></Link>
           
          </div>  
         </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      getDiets: () => dispatch(getDiets()),
      getRecipes: () => dispatch(getRecipes())
    }
  }
  
export default connect(null, mapDispatchToProps)(Landing)



