import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { axiosPost } from "../../Common/commonAPI";
import { toast } from "react-toastify";

export const AllBlogs = (props:any) => {
    const { modalShow, handleModalVisible } = props;

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
  });
  const [addBlogData, setBlogData] = useState<any>({
    description: "",
    title: "",
    category: "category Name",
  });
  async function submitData() {
    try {
      await schema.validate(addBlogData);
      const response: any = await axiosPost(
        {
          title: addBlogData?.title,
          description: addBlogData?.description,
          category: addBlogData?.category,
        },
        "addArticle"
      );
      if (response.status == 200) {
        toast.success("Article added successfully submitted with no errors!");
      } else {
        toast.error("Article is not added due to some issue !");
      }
      handleModalVisible();
    } catch (error: any) {
      toast.warning("Please fill mandatory fields!");
    }
  }
  return (
    <div>
    <div>
      <Modal show={modalShow} onHide={handleModalVisible}>
        <Modal.Header closeButton>
          <Modal.Title>{addBlogData?.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Title"
                autoFocus
                defaultValue={addBlogData?.title}
                value={addBlogData?.title}
                name="title"
                onChange={(e) =>
                  setBlogData({
                    ...addBlogData,
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
                defaultValue={addBlogData?.description}
                value={addBlogData?.description}
                name="description"
                onChange={(e) =>
                  setBlogData({
                    ...addBlogData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              submitData();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
  )
}
