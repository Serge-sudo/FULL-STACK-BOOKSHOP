import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {PropTypes} from 'prop-types';
import {getCarousels} from "../../actions/carousel";


class Carousel extends Component {
    static propTypes = {
        carousels: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getCarousels();
    }

    render() {
        return (
            <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                <div className="carousel-indicators">
                    {this.props.carousels.map((carousel, ind) => (
                        <Fragment key={carousel.id}>
                            <button type="button" aria-current={ind === 0 ? "true" : "false"}
                                    data-mdb-target="#carouselBasicExample" data-mdb-slide-to={ind}
                                    className={ind === 0 ? "active" : ""} aria-label="Slide"/>
                        </Fragment>

                    ))}
                </div>
                <div className="carousel-inner">
                    {this.props.carousels.map((carousel, ind) => (

                        <Fragment key={carousel.id}>
                            <a href={carousel.href}>
                                <div className={ind === 0 ? "active carousel-item" : "carousel-item"}>
                                    <img src={carousel.img}
                                         className="d-block w-100"
                                         alt="Sunset Over the City"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>{carousel.title}</h5>
                                        <p>{carousel.subtitle}</p>
                                    </div>
                                </div>
                            </a>

                        </Fragment>

                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample"
                        data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample"
                        data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        );
    }
}

// export default Carousel;

const mapStateToProps = (state) => ({
    carousels: state.carousels.carousels
});
export default connect(mapStateToProps, {getCarousels})(Carousel);