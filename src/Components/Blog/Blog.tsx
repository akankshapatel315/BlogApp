import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { axiosGet } from "../../Common/commonAPI";
import { EditDeleteBlog } from "./EditDeleteBlog";
import { useDispatch, useSelector } from "react-redux";
import { AddBlog } from "./AddBlog";
import * as Yup from "yup";
import { getBlogs } from "../../Actions/blogActions";



export const Blog = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [blogs, setBlogs] = useState<any>([]);
  const [userId,setUserId] = useState<any>(null)

  const [editableBlogData, setEditableBlogData] = useState<any>({
    description: "",
    title: "",
    category: "",
    _id: "",
  });
  const [addBlogData, setBlogData] = useState<any>({
    description: "",
    title: "",
    category: "",
  });
  
  const handleModalVisible = () => setModalShow(!modalShow);
  const clearEditableBlogData = () =>
    setEditableBlogData({ description: "", title: "", category: "" });

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  const getUserInfo = useSelector((state:any)=> state.userData.userData)
  const getBlogInfo = useSelector((state:any)=> state)
  console.log('getBlogInfo', getBlogInfo)

  async function getAllArticles() {
    try {
      const response: any = await axiosGet({}, `getAllArticlesOfLoggedInUser`);
      if (response.status == 200) {
        setBlogs(response.data.articles);
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        alert("somee error occured to fetch the data");
      }
    }
  }


  useEffect(() => {
    getAllArticles();
  }, [modalShow]);


  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  
  return (
    <div className="container">
      <div className="row">
        {blogs.map((blogData: any, index: number) => (
          <div key={index} className="col-lg-4 mb-4 mt-2">
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={truncateText(blogData?.title, 20)}
                subheader={blogData?.category}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {truncateText(blogData?.description, 80)}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  style={{ color: "#008000" }}
                  aria-label="add to favorites"
                  onClick={() => {
                    setEditableBlogData({
                      description: blogs[index]?.description,
                      title: blogs[index]?.title,
                      category: blogs[index]?.category,
                      _id: blogs[index]?._id,
                    });
                    handleModalVisible();
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick ={handleButtonClick} style={{color: isActive ? "#FF0000":"#808080"}}><FavoriteIcon /></IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <EditDeleteBlog
        modalShow={modalShow}
        handleModalVisible={handleModalVisible}
        editableBlogData={editableBlogData}
        clearEditableBlogData={clearEditableBlogData}
        setEditableBlogData={setEditableBlogData}
      />
      {/* <AddBlog
        modalShowAdd={modalShowAdd}
        handleModalVisible={handleModalVisible}
        addBlogData={addBlogData}
        setBlogData={setBlogData}
      /> */}
    </div>
  );
};
