import React, { useState } from "react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../redux/actions/posts";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import NotificationSystem from "react-notification-system";
import { Redirect } from "react-router-dom";
import { CodeSlash } from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGIF from "../assets/loading.gif";
import "../index.css";

const FormComponent = ({ isFromModal, post, onHide }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading, user } = useAuth0();

  const notificationSystem = React.createRef();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState({
    creator: isFromModal ? post.creator : "",
    title: isFromModal ? post.title : "",
    message: isFromModal ? post.message : "",
    tags: isFromModal ? post.tags : [],
    selectedFile: isFromModal ? post.selectedFile : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postData.creator = user.nickname;

    setLoading(true);

    const notification = notificationSystem.current;

    isFromModal
      ? dispatch(updatePost(post._id, postData)).then(() => {
          notification.addNotification({
            // message: "Post created successfully !",
            level: "success",
            autoDismiss: 3,
            position: "br",
            children: (
              <div>
                <h6>Post updated successfully!</h6>
              </div>
            ),
          });

          setLoading(false);
          setTimeout(() => {
            onHide();
            clearTimeout();
          }, 2000);
        })
      : dispatch(createPost(postData)).then(() => {
          if (!postData.selectedFile) {
            setLoading(false);
            notification.addNotification({
              // message: "Post created successfully !",
              level: "error",
              autoDismiss: 3,
              position: "br",
              children: (
                <div>
                  <h6>Please upload a code snippet image !</h6>
                </div>
              ),
            });
          } else {
            setLoading(false);
            notification.addNotification({
              // message: "Post created successfully !",
              level: "success",
              autoDismiss: 3,
              position: "br",
              children: (
                <div>
                  <h6>Post created successfully!</h6>
                </div>
              ),
            });
            setTimeout(() => {
              setMessage("Post created successfully !");
              clearTimeout();
            }, 2000);
          }
        });
  };

  if (!isAuthenticated && !isLoading) {
    return <Redirect to="/login" />;
  } else
    return !message ? (
      <Container
        style={{ marginTop: "40px" }}
        className={!isFromModal ? "col-md-4 col-sm-12" : "col-md"}
      >
        {message && <Alert variant="success">Post Created</Alert>}
        {message && setMessage("")}
        {isFromModal ?? <h2>Create an awesome snippet</h2>}
        <Form onSubmit={(e) => handleSubmit(e)} id="postForm">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg : My MongoDb Post model"
              name="title"
              value={postData.title}
              required
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg : This is the schema"
              name="message"
              value={postData.message}
              required
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eh : #mongodb , #models (seperated by , )"
              name="tags"
              value={postData.tags}
              required
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
          </Form.Group>
          <Form.Label>Code snap</Form.Label>
          <br />
          <FileBase
            type="file"
            required={true}
            multiple={false}
            name="selectedFile"
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <Button variant="dark" type="submit" block className="mt-4">
            Upload <CodeSlash className="ml-1" />
          </Button>

          {loading && (
            <Container className="text-center mt-0">
              <img
                className="max-auto"
                src={loadingGIF}
                alt="loading..."
                style={{ justifyContent: "center" }}
              />
            </Container>
          )}
          <NotificationSystem ref={notificationSystem} />
        </Form>
      </Container>
    ) : (
      <Redirect to="/" />
    );
};

export default FormComponent;
