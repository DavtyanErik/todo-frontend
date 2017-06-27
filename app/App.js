import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

class App extends PureComponent {
    constructor() {
        super();
    }
    render() {
        return (
        <MuiThemeProvider>
            <Provider store={store}>
                <Layout />
            </Provider>
        </MuiThemeProvider>
                
        );
    }
}

render(<App />, document.getElementById('app'));