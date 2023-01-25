import React, {Component} from 'react';

class Book extends Component {

    render() {
        return (
            <a href={"/books/" + this.props.data.id}>
                <div className="card" style={{backgroundImage: `url(${this.props.data.imgSrc})`}}>
                    <div className="content">
                        <h2 className="title">{this.props.data.name}</h2>
                        <p className="copy">{this.props.data.description}</p>
                    </div>
                </div>
            </a>

        );
    }
}

export default Book;