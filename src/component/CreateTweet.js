import React from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../store/actions/Tweet';
import { Card, CardContent, Button } from '@material-ui/core';

let id = 1;

const TweetUI = (props) => {

    //  React Hook useState instead of state
    const [commentMessage, setCommentMessage] = React.useState('');

    const handleChange = (event) => {

        // set data Using Hook
        setCommentMessage(event.target.value);
    }

    const handlePostComment = (event) => {
        // prevent default submit 
        event.preventDefault();
        let listComments = [];

        // Don't post message if it is blank 
        if (commentMessage) {
            listComments = [...props.comments, { id: id++, value: commentMessage }];
            props.createTweet(listComments);

            // After submit Clear textarea
            setCommentMessage('');
        }
    }

    return (
        <div className='text-wrapper align-center'>
            <Card className='card'>
                <CardContent>
                    <textarea onChange={handleChange} value={commentMessage} />
                    <Button variant="outlined" color='secondary' type="submit" onClick={handlePostComment}>Add Post</Button>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    const comments = state.commentMessages
    return { comments }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTweet: (value) => dispatch({ type: ActionTypes.ADD_TWEET, value })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetUI);
