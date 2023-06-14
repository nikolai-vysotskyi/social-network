import React, {useState, useEffect} from 'react';
import {Container, Typography, Box} from '@mui/material';
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        try {
            const res = await axios.get('/api/posts');
            setPosts(res.data)
        } catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <Container maxWidth='md'>
            <Typography variant='h4' align='center' mt={5}>Feed</Typography>
            <CreatePost/>
            <Box mb={5} mt={3.5}>
                {posts.map((post) => (
                    <Post key={`post_${post.id}`} postData={post}/>
                ))}
            </Box>
        </Container>
    );
}

export default Feed;