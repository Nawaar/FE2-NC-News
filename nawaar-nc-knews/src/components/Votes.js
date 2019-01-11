import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import { Button, Glyphicon } from 'react-bootstrap';

class Votes extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { votes } = this.props
        const { voteChange } = this.state
        return (
            <div className="votesArtCom">
                <Button onClick={() => { this.updateVotes(1) }} disabled={voteChange === 1} bsSize="xsmall">
                    <Glyphicon glyph="arrow-up" />
                </Button>
                <p>{votes + voteChange}</p>
                <Button onClick={() => { this.updateVotes(-1) }} disabled={voteChange === -1} bsSize="xsmall">
                    <Glyphicon glyph="arrow-down" />
                </Button>
            </div>
        );
    }


    updateVotes = (increment) => {
        this.setState((state) => {
            return { voteChange: state.voteChange + increment }
        })
        const { article_id, comment_id } = this.props;
        api.patchVotes(increment, article_id, comment_id).catch(() => {
            this.setState((state) => {
                return { voteChange: state.voteChange - increment }
            })
        })
    }
}

Votes.propTypes = {
    votes: PropTypes.number,
    article_id: PropTypes.number,
    comment_id: PropTypes.number
};

export default Votes;