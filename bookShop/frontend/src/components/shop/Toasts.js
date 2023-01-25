import React, {Component} from 'react';

class Toasts extends Component {
    render() {
        return (
            <div className="position-fixed bottom-0 end-0 p-3 " style={{zIndex: 11}}>
                <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true"
                     data-delay="1500">
                    <div className="toast-header">
                        <strong className="me-auto" id="toast-title"></strong>
                    </div>
                    <div className="toast-body" id="toast-body">
                    </div>
                </div>
            </div>
        );
    }
}

export default Toasts;