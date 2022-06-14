import React from 'react'; 
import './Filter.css';
import { connect } from 'react-redux';
import { searchRecipes } from '../../redux/Actions';

function Filter (props) {
  return (
    <div id='OrderingAndFiltering'>
        <div className='Ordering'>
          <button className='DropdownButton'>Sort</button>
          <div className='Orders'>
            <button onClick={(e) => {e.preventDefault(); props.order('')}}>More Relevants</button>
            <button onClick={(e) => {e.preventDefault(); props.order('A-Z')}}>A - Z</button>
            <button onClick={(e) => {e.preventDefault(); props.order('Z-A')}}>Z - A</button>
            <button onClick={(e) => {e.preventDefault(); props.order('BestScore')}}>Best Score</button>
            <button onClick={(e) => {e.preventDefault(); props.order('WorstScore')}}>Worst Score</button>
          </div>
        </div>
        <div className='Filtering'>
          <button className='DropdownButton'>Filter</button>
            <div className='Filters'>
              {props.diets.map(d => <button key={d.id}
                onClick={(e) => {e.preventDefault(); props.filter(d.name)}}>{d.name}</button>)}
            </div>
         
        </div>
        <div>
           <button className='DropdownButton clear' onClick={(e) => {e.preventDefault(); props.order('')}}>Reset Filter</button>
        </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    diets: state.allDiets,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (data) => dispatch(searchRecipes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)