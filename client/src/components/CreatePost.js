import React, {useState} from 'react';
import {Button, TextField, Container} from '@mui/material';
import axios from "axios";

function CreatePost() {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newPost = {
                text: content
            };
            const body = JSON.stringify(newPost);
            await axios.post('/api/posts', body);

            window.location = '/';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth='md'>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='content'
                    label='Content'
                    name='content'
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                >
                    Post
                </Button>
            </form>
        </Container>
    );
}

export default CreatePost;