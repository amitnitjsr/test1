import React from 'react';
import { connect } from 'react-redux'
import * as ActionTypes from '../store/actions/Tweet'
import { Card, CardContent, Button, Typography } from '@material-ui/core';

const ShowTweets = (props) => {

    // React Hooks for Editing the Text and updating the values
    const [editFieldId, setEditId] = React.useState(0);
    const [newText, setNewText] = React.useState('');

    const handleEdit = (item, check) => {

        // set default text in EditBox
        if (check === 'edit') {
            setNewText(item.value);
        }

        // onClick of Edit Button set the id of item in text area using react hook
        check === 'edit' ? setEditId(item.id) : setEditId(0);
        const updateValue = { id: item.id, value: newText }

        // onClick of Ok set value in redux
        if (check === 'ok') {
            props.handleUpdate(updateValue);
        }
    }

    const handleTextChange = (event) => {
        // onChange update the value using hook
        setNewText(event.target.value);
    }

    if (!props.comments) {
        return null;
    }

    return (
        <React.Fragment>
            {
                props.comments.map((item) => {
                    return (
                        <div className='card-wrapper' key={item.id}>
                            <Card className='card'>
                                <CardContent>
                                    {editFieldId === item.id ?
                                        <React.Fragment>
                                            <textarea onChange={handleTextChange} >{newText}</textarea>
                                            <Button size="small" color="primary" onClick={() => handleEdit(item, 'ok')}>Ok</Button>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Typography gutterBottom variant="h5" component="h2"> {item.value}</Typography>
                                            <Button size="small" color="primary" onClick={() => handleEdit(item, 'edit')}>Edit</Button>
                                        </React.Fragment>
                                    }
                                    <Button size="small" color="primary" onClick={() => props.handleDelete(item.id)}>Delete</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        comments: state.commentMessages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDelete: (id) => dispatch({ type: ActionTypes.DELETE_TWEET, id }),
        handleUpdate: (item) => dispatch({ type: ActionTypes.EDIT_TWEET, item })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTweets);