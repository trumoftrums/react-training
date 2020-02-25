import React, {Component} from 'react';

class Form extends Component {

    render() {
        if (this.props.showFormAdd === false) {
            return null;
        }
        return (
            <form className="form-inline" onSubmit={() => this.props.handleSubmitFormAdd()}>
                <div className="form-group">
                    <p>Name:</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={this.props.newValueName}
                        onChange={(event) => this.props.handleChangeInputNewValueName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <p>Email:</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={this.props.newValueEmail}
                        onChange={(event) => this.props.handleChangeInputNewValueEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.props.handleSubmitFormAdd}>Submit
                    </button>
                    <button type="button" className="btn btn-default" onClick={this.props.handleShowFormAddNew}>Cancel
                    </button>
                </div>
            </form>
        )
    }
}

export default Form;