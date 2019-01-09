import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class CommentForm extends Component {
    state = {
        comment: ''
    }
    render() {
        const { comment } = this.state
        return (
            <form onSubmit={this.addComment}>
                <textarea id="comment" value={comment} onChange={this.handleChange}>Enter your comment ...</textarea>
                <button>Submit</button>
            </form>
        );
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }

    addComment = (event) => {
        event.preventDefault()
        const { comment } = this.state
        this.props.addComment(comment)
        this.setState({
            comment: ''
        })
    }

}

CommentForm.propTypes = {

};

export default CommentForm;