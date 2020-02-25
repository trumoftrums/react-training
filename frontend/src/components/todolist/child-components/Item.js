import React, {Component} from 'react';

class Item extends Component {
    render() {
        let {item,index} = this.props;
        if(item === 0) {
            return (
                <tr>
                    <td colSpan="4" className="text-center">
                        <h4>No Item</h4>
                    </td>
                </tr>
            )
        }
        return(
            <tr>
                <td className="text-center">
                    {index}
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    {item.email}
                </td>
                <td>
                    <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.props.handleEditItem(index,item)}>Edit</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>this.props.handleShowAlert(item)}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default Item;