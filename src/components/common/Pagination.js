import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import PropTypes from 'prop-types';

@observer
class Pagination extends Component {

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className={this.props.currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link"
                                onClick={() => this.props.loadPage(1)}
                                aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Fist</span>
                        </button>
                    </li>
                    <li className={this.props.currentPage === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link"
                                onClick={() => this.props.loadPage(this.props.currentPage - 1)}
                                aria-label="Previous">
                            <span aria-hidden="true">&lsaquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    {
                        _.range(1, this.props.lastPage + 1).map((page) => (
                            <li className={page === this.props.currentPage ? "page-item active" : "page-item"}>
                                <button className="page-link" onClick={() => {
                                    this.props.loadPage(page);
                                }}>{page}</button>
                            </li>
                        ))
                    }

                    <li className={this.props.currentPage === this.props.lastPage ? "page-item disabled" : "page-item"}>
                        <button className="page-link"
                                onClick={() => this.props.loadPage(this.props.currentPage + 1)}
                                aria-label="Previous">
                            <span aria-hidden="true">&rsaquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                    <li className={this.props.currentPage === this.props.lastPage ? "page-item disabled" : "page-item"}>
                        <button className="page-link"
                                onClick={() => this.props.loadPage(this.props.lastPage)}
                                aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Last</span>
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pagination.propTypes = {
    loadPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired
};

export default Pagination;