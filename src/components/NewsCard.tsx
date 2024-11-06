import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import moment from 'moment';

type propsType = {
    title:string;
    thumbnailUrl:string;
    description:string;
    publisherImgUrl:string;
    PublisherName:string;
    authors:string[];
    publishedTime:string;
}

const NewsCard = ({ title, thumbnailUrl, description, publisherImgUrl,PublisherName, authors, publishedTime}:propsType) => {

    const newsDescription = description.length > 130 ? `${description.substring(0,130)}...` : description;

    const articleAuthors = authors.length > 1 ? `${authors[0]} and ${authors.length - 1} more ` : !authors.length ? "Unknown Author" : authors[0];

    return (
        <Card sx={{
            width:"100%", transition:".3s", minHeight:"440px",
            ":hover":{
            transform:"translateY(-5px)",
            boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
            }
        }}>
            <Typography sx={{
                    p:2,textWrap:"nowrap",textOverflow:"ellipsis",overflow:"hidden"
            }}
                variant='h6' >{title}</Typography>
            <CardMedia
                component="img"
                height="194"
                image={thumbnailUrl}
                alt="News Thumbnail"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {newsDescription}
                </Typography>
            </CardContent>
            <Box sx={{width:"100%",px:2,textAlign:"right"}} >
                <Typography sx={{width:"100%"}} variant="caption">-{articleAuthors}</Typography>
            </Box>
            <Box sx={{
                p:2,  display:"flex", alignItems:"center", justifyContent:"space-between"
            }}>
                <Box sx={{
                    display:"flex", alignItems:"center", gap:".5rem"
                    }}>
                        <Box sx={{width:"1.5rem"}}><img className='w-full rounded-full' src={publisherImgUrl} alt="" /></Box>
                        <Typography variant="caption">{PublisherName}</Typography>
                </Box>
                <Typography variant="caption">{moment(publishedTime).startOf("s").fromNow()}</Typography>
            </Box>
        
        </Card>
    );
}

export default NewsCard;