import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import moment from 'moment/moment';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { getUser } from '../../../services/auth';
import { getDomain } from '../../../services/domain';
import { deletePost } from '../../../services/post';
import BlogPostDelete from './BlogPostDelete';
import BlogUpdatePost from './BlogUpdatePost';
// utils

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 2 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  // width: '100%',
  // height: '100%',
  maxHeight: '50vh',
  objectFit: 'cover',
  position: 'absolute',
});

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.COFFEEBEAN[0], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.CIOCCOLATO[0], 0.8),
  },
}));
// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  expanded: PropTypes.bool,
};

export default function BlogPostCard({ post, index, expanded }) {
  const { description, id, image_path: image, title, updatedAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState();
  useEffect(() => {
    getUser().then((res) => {
      console.log({ userRes: res });
      setUser(res.data.data);
    });
  }, []);

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ height: !expanded ? '200px' : undefined, maxHeight: '50vh', objectFit: 'contain' }}
          image={`${process.env.REACT_APP_API_PROTOCOL}${getDomain()}.${process.env.REACT_APP_IMAGE_URL}/${image}`}
          alt={title}
        />

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {moment(updatedAt).format('LLL')}
          </Typography>

          <TitleStyle
            to={`/dashboard/blog/${id}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {title}
          </TitleStyle>
        </CardContent>
        {user && (
          <CardActions>
            <InfoStyle>
              <ColorButton
                id="edit"
                variant="contained"
                onClick={() => {
                  setOpenEdit(true);
                }}
              >
                Edit
              </ColorButton>
              <ColorButton
                sx={{ ml: 2 }}
                id="delete"
                variant="contained"
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                Delete
              </ColorButton>
            </InfoStyle>
          </CardActions>
        )}
      </Card>
      <BlogPostDelete
        handleClose={() => {
          setOpenDelete(false);
        }}
        onAgree={() => {
          deletePost(id)
            .then(() => {
              enqueueSnackbar('Post deleted successfully', { variant: 'success' });
              window.location.reload();
            })
            .catch((err) => {
              enqueueSnackbar('Post deletion failed', { variant: 'error' });
              console.error(err);
            });
        }}
        open={openDelete}
      />
      <BlogUpdatePost
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
        }}
        post={post}
      />
    </Grid>
  );
}
