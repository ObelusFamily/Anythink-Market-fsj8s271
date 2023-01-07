import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import {connect} from "react-redux";
import { FILTER_ITEMS_BY_TITLE, HOME_PAGE_LOADED} from '../../constants/actionTypes';

const ItemSearchBox = ({handleSearchByTitle, handleLoadAllItems}) => {
  const handleSearchChange = async (ev) => {
    const searchValue = ev.target.value.trim();
    if(searchValue.length > 2){
      handleSearchByTitle(searchValue)
    }else{
      handleLoadAllItems()
    }
  }

  return (
    <div style={{paddingLeft: '10px',paddingRight: '10px'}}>
      <input type="text" placeholder="What is it that you truly desire?" id="search-box"
        onChange={handleSearchChange}
       />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  filterItems: (tab, pager, payload, searchedTitle) => dispatch({type: FILTER_ITEMS_BY_TITLE, tab, pager, payload, searchedTitle}),
  loadAllItems: (tab,pager,payload) => dispatch({type: HOME_PAGE_LOADED, tab, pager, payload})
})

const Banner = ({filterItems,loadAllItems}) => {
  const handleSearchByTitle = (title) => {
    const tab = "all"
    const itemsPromise = agent.Items.byTitle;

    filterItems(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(),itemsPromise(title)]),
      title
    )
  }

  const handleLoadAllItems = () => {
    const tab = "all";
    const itemsPromise = agent.Items.all;

    loadAllItems(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );
  }

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className='banner-search  text-white' >
          <span>A place to get </span>
          <ItemSearchBox handleSearchByTitle={handleSearchByTitle} handleLoadAllItems={handleLoadAllItems} />
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(null,mapDispatchToProps)(Banner);
