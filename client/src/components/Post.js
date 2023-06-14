import React, {useState, useContext} from 'react';
import {Typography, Card, CardContent, CardActions, Button, Divider, Box, IconButton} from '@mui/material';
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Post({postData}) {
    const auth = useContext(AuthContext);

    const [post, setPost] = useState(postData)
    const [asset, setAsset] = useState(postData.digitalAsset)
    const [likes, setLikes] = useState(postData.likeCount || 0);
    const [like, setLike] = useState(postData.likes.some(like => like.userId === auth.userId))
    const handleLike = async (e) => {
        try {
            e.preventDefault();
            const updatedPost = await axios.get(`/api/posts/${post.id}/like`);
            setLikes(likes + 1);
            setLike(true);
            setPost(updatedPost.data);
            setAsset(updatedPost.data.digitalAsset);
            setLikes(updatedPost.data.likeCount);
            setLike(updatedPost.data.likes.some(like => like.userId === auth.userId));
        } catch (e) {
            console.log(e)
        }
    };

    const removeLike = async () => {
        try {
            const updatedPost = await axios.delete(`/api/posts/${post.id}/like`);
            setLikes(likes - 1);
            setLike(false)
            setPost(updatedPost.data);
            setAsset(updatedPost.data.digitalAsset);
            setLikes(updatedPost.data.likeCount);
            setLike(updatedPost.data.likes.some(like => like.userId === auth.userId));
        } catch (e) {
            console.log(e)
        }
    };

    const setUpSale = async (e, sale) => {
        try {
            e.preventDefault();

            const postData = {
                forSale: sale,
            };
            const body = JSON.stringify(postData);
            const updatedAsset = await axios.put(`/api/assets/${post.id}`, body);
            setAsset(updatedAsset.data);
        } catch (e) {
            console.log(e)
        }
    };

    const buy = async (e) => {
        try {
            e.preventDefault();
            const transactionData = {
                assetId: asset.id,
                sellerId: asset.ownerId,
            };
            const body = JSON.stringify(transactionData);
            const updatedAsset = await axios.post(`/api/transactions/`, body);
            setAsset(updatedAsset.data);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Card key={post.id} sx={{marginTop: 2}}>
            <CardContent>
                <Typography variant='body1'>@{post?.user?.name}</Typography>
                <Typography variant='h5'>{post.text}</Typography>
            </CardContent>

            <Box style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Typography variant='body2'>{likes}</Typography>
                <Box ml={0.5}>
                    {
                        like
                            ? <IconButton onClick={removeLike}><FavoriteIcon/></IconButton>
                            : <IconButton onClick={handleLike}><FavoriteBorderIcon/></IconButton>
                    }
                </Box>
            </Box>

            <Divider/>

            {(asset.price || asset.ownerId === auth.userId) &&
                <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {(asset.ownerId === auth.userId) ? (
                            asset.forSale ?
                                <Button size='small' onClick={(e) => setUpSale(e, false)}>Remove from sale</Button> :
                                <Button size='small' onClick={(e) => setUpSale(e, true)}>Put up for sale</Button>
                        ) : (
                            asset.forSale ? <Button size='small' onClick={buy}>Buy</Button> : ''
                        )}
                    </div>
                    <Typography variant='body2'>Current price: ${asset.price || 0}</Typography>
                </CardActions>
            }
        </Card>
    );
}

export default Post;