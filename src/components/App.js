import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import fishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    };

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        // First reinstate local storage
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
    
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({fishes});
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Update that fish
        fishes[key] = updatedFish;
        // 3. Set the new state
        this.setState({fishes});
    };

    deleteFish = (key) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Update to null for firebase synchronization
        fishes[key] = null;
        // 3. Update the state
        this.setState({fishes});
    };

    loadSampleFishes = () => {
        this.setState({fishes});
    };

    addToOrder = (key) => {
        // 1. Take a copy of the existing state
        const order = {...this.state.order};
        // 2. Increment by one or add to order if fish doesn't exist
        order[key] = order[key] + 1 || 1;
        // 3. Set the new orders object to state
        this.setState({order});
    };

    deleteOrder = (key) => {
        // 1. Take a copy of the existing state
        const order = { ...this.state.order };
        // 2. Delete order
        delete order[key];
        // 3. Update the state
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        { Object.keys(this.state.fishes).map(
                            key => <Fish 
                                        key={key} 
                                        index={key} 
                                        details={this.state.fishes[key]} 
                                        addToOrder={this.addToOrder} 
                                    />
                            )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    deleteOrder={this.deleteOrder}
                />
                <Inventory 
                    fishes={this.state.fishes} 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;
