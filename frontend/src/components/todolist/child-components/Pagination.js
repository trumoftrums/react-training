import React, {Component} from 'react';
import { Link} from "react-router-dom";

class Pagination extends Component{
    getUrl(page = 1) {
        let url = `/${this.props.path}?page=${page}`;
        if (this.props.search !== '')
            url += `&search=${this.props.search}`;
        return url;
    }
    render() {
        const data = this.props.data || undefined;

        if(data.last_page > 1) {
            const current_page = data.current_page;
            const last_page = data.last_page;

            let pageLink = [];

            for (let i = 1; i <= last_page; i++) {
                if (current_page === i) {
                    pageLink.push(
                        <li
                            key={i}
                            className='page-item active'

                        >
                            <span className='page-link'>{i}</span>
                        </li>
                    );
                } else {
                    pageLink.push(
                        <li
                            key={i}
                            className="page-item"

                        >
                            <Link to={this.getUrl(i)} className='page-link'>{i}</Link>
                        </li>
                    );
                }
            }
            return (
                <ul className="pagination">
                    {pageLink}
                </ul>
            )
        }

        return null;
    }
}

export default Pagination;