import React, {Component} from 'react';

class ItemEdit extends Component {
    renderLevel = () => {
        let {arrayLevel} = this.props;
        return arrayLevel.map((level,index)=>{
            switch (level) {
                case 0:
                    return <option key={index} value={level}>Low</option>
                case 1:
                    return <option key={index} value={level}>Medium</option>
                default:
                    return <option key={index} value={level}>High</option>
            }
        });
    };
    render() {
        return(
            <tr>
                <td className="text-center">{this.props.indexEdit}</td>
                <td><input
                    type="text"
                    className="form-control"
                    value={this.props.nameEdit}
                    onChange={(event) => this.props.handleEditNameInput(event.target.value)}
                /></td>
                <td>{this.props.emailEdit}</td>
                <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.props.handleCancelEditClick}>Cancel</button>
                    <button type="button" className="btn btn-success btn-sm" onClick={this.props.handleEditClickSubmit}>Save</button>
                </td>
            </tr>
        )
    }
}

export default ItemEdit;