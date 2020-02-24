import React, {Component} from 'react';

class Form extends Component {
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
        if(this.props.showFormAdd === false){
            return null;
        }
        return(
            <form className="form-inline" onSubmit={()=>this.props.handleSubmitFormAdd()}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        value={this.props.newValue}
                        onChange={(event)=> this.props.handleChangeInputNewValue(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select
                        className="form-control"
                        onChange={(event)=>(this.props.handleChangeSelectFormAdd(event.target.value))}
                    >
                        {this.renderLevel()}
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.props.handleSubmitFormAdd}>Submit</button>
                <button type="button" className="btn btn-default" onClick={this.props.handleShowFormAddNew}>Cancel</button>
            </form>
        )
    }
}

export default Form;