import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string
    };
    handleChange = (event) => {
        // 1. Take a copy of the current fish
        const updatedFish = { 
            ...this.props.fish, 
            [event.currentTarget.name]: event.currentTarget.name === 'price' ? parseFloat(event.currentTarget.value) : event.currentTarget.value 
        };
        this.props.updateFish(this.props.index, updatedFish)
    };

    render() {
        return (
            <div className="fish-edit">
                <input 
                    name="name" 
                    value={this.props.fish.name} 
                    type="text" 
                    onChange={this.handleChange} 
                />
                <input 
                    name="price" 
                    value={this.props.fish.price} 
                    type="number" 
                    onChange={this.handleChange} 
                />
                <select name="status" value={this.props.fish.status} onChange={this.handleChange}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea 
                    name="desc" 
                    value={this.props.fish.desc} 
                    onChange={this.handleChange} 
                    placeholder="Desc" 
                />
                <input 
                    name="image" 
                    value={this.props.fish.image} 
                    type="text" 
                    onChange={this.handleChange} 
                    placeholder="Image" 
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Delete Fish</button>
            </div>
        );
    }
}

export default EditFishForm;