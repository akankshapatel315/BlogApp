import React from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { axiosPost } from "../../Common/commonAPI";
export const EditDeleteBlog = (props: any) => {
  const {
    modalShow,
    handleModalVisible,
    editableBlogData,
    clearEditableBlogData,
    setEditableBlogData,
  } = props;
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { "x-access-token": token },
  };

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
  });

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteBlogs/${editableBlogData._id}`,
        config
      );
      toast.success(`${editableBlogData?.title}Deleted successfully`);
      handleModalVisible();
      clearEditableBlogData();
    } catch (error) {
      console.error(error);
      handleModalVisible();
      clearEditableBlogData();
    }
  };

  async function submitData() {
    try {
      await schema.validate(editableBlogData);
      const response: any = await axiosPost(
        {
          title: editableBlogData?.title,
          description: editableBlogData?.description,
          category: editableBlogData?.category,
          _id: editableBlogData?._id,
        },
        "updateArticle"
      );
      if (response.status == 200) {
        toast.success("Article edited successfully submitted with no errors!");
        clearEditableBlogData();
      } else {
        clearEditableBlogData();
        toast.error("Article is not added due to some issue !");
      }
      handleModalVisible();
    } catch (error: any) {
      toast.warning("Please fill mandatory fields!");
    }
  }
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={() => {
          handleModalVisible();
          clearEditableBlogData();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editableBlogData?.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Title"
                autoFocus
                defaultValue={editableBlogData?.title}
                value={editableBlogData?.title}
                name="title"
                onChange={(e) =>
                  setEditableBlogData({
                    ...editableBlogData,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Blog Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={editableBlogData?.description}
                value={editableBlogData?.description}
                name="description"
                onChange={(e) =>
                  setEditableBlogData({
                    ...editableBlogData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              deleteData();
            }}
          >
            Delete
          </Button>
          <Button
            onClick={(e) => {
              submitData();
            }}
          >
            Edit Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
