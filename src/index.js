import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, browserHistorys} from 'react-router';
import store, { history } from './store/configureStore';

import App from './component/App'
import ItemList from './components/ItemList';
import Item from './components/Item';

render(
    <Provider store={store}>
    	<Router history={browserHistorys}>
    		<Route path="/" component={App}>
    			<IndexRoute  component={ItemList} />
    			<Route path="/view/:id" component={Item} />
    		</Route>
    	</Router>
    </Provider>,
    document.getElementById('app')
);
