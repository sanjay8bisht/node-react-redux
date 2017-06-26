import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/actionCreators';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    render() {
        const { hasErrored, isLoading, items} = this.props.items
        if (hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div className="row">
                <div className="col-sm-4">
                    {items.map((item) =>
                        <Item key={item.id} id={item.id} item={item} {...this.props} />
                    )}
                </div>
            </div>
        );
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: {
            items: state.items,
            hasErrored: state.itemsHasErrored,
            isLoading: state.itemsIsLoading
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
