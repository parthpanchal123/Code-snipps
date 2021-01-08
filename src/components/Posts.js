import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import moment from "moment";
import { Pencil, Trash, HeartFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import EditPostModal from "./EditPostModal";
import { useDispatch } from "react-redux";
import { deletePost, getPosts, likePost } from "../redux/actions/posts";
import ModalImage from "react-modal-image";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import dotenv from "dotenv";
import "../index.css";
import HashLoader from "react-spinners/HashLoader";
import NotificationSystem from "react-notification-system";
import axios from "axios";

dotenv.config();

const Posts = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const notificationSystem = React.createRef();
  const [modalShow, setModalShow] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [postId, setCurrentId] = useState("");

  console.log(user);

  const getToken = async () => {
    const body = {
      client_id: `${process.env.REACT_APP_API_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_API_CLIENT_SECRET}`,
      audience: `${process.env.REACT_APP_API_AUDIENCE}`,
      grant_type: "client_credentials",
    };
    try {
      const jsonData = await axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        body,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const { access_token } = jsonData.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setToken(access_token);
    } catch (e) {
      console.log(e.message);
      setToken("");
    }
  };

  useEffect(() => {
    getToken();
    if (postId) {
      setCurrentId("");
    }
    dispatch(getPosts());
  }, [dispatch, postId, isAuthenticated, user, isLoading, token]);

  if (!isAuthenticated && !isLoading) {
    return <Redirect to="/login" />;
  } else
    return (
      <Container className="container-md ">
        {!posts.length ? (
          <Container
            className="text-center"
            style={{
              marginTop: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <HashLoader />
            <small className="mt-2">Loading Snipps ...</small>
          </Container>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              margin: "20px",
            }}
          >
            {posts.map((post) => (
              <div key={post._id}>
                <Card
                  style={{ width: "20rem", margin: "10px" }}
                  className="shadow p-0 mb-5 bg-white rounded"
                  id={"fade-in"}
                >
                  <div className="text-center" id={"imgdiv"}>
                    <ModalImage
                      small={post.selectedFile}
                      medium={post.selectedFile}
                      alt={post.title}
                    />
                  </div>

                  <Card.Body>
                    <Card.Text
                      style={{
                        color: "white",
                      }}
                    >
                      {post.tags.map((tag) => (
                        <span
                          class="badge rounded-pill bg-secondary mr-1"
                          style={{ fontWeight: "500" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </Card.Text>

                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.message}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      {" "}
                    </div>
                    <small className="text-muted font-italic">
                      {` - By ${post.creator}`}
                    </small>
                    <br />
                    <small className="text-muted">
                      {moment(+post.createdAt).fromNow()}
                    </small>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: "1px",
                      }}
                    >
                      {!isLoading
                        ? post.creator === user.nickname && (
                            <>
                              <Button
                                variant="outline-primary"
                                className="mr-2"
                                onClick={() => setModalShow(true)}
                              >
                                <Pencil />
                              </Button>
                              <Button
                                variant="outline-danger"
                                className="mr-2"
                                onClick={() => {
                                  setCurrentId(post._id);
                                  const notification =
                                    notificationSystem.current;
                                  notification.addNotification({
                                    level: "success",
                                    autoDismiss: 5,
                                    position: "br",
                                    children: (
                                      <div>
                                        <h6>Post deleted successfully!</h6>
                                      </div>
                                    ),
                                  });
                                  dispatch(deletePost(post._id));
                                }}
                              >
                                <Trash />
                              </Button>
                            </>
                          )
                        : ""}

                      <Button
                        variant={
                          !isLoading
                            ? post.likes.includes(user.email)
                              ? "info"
                              : "outline-info"
                            : ""
                        }
                        onClick={() => {
                          const c_post = {
                            id: post._id,
                            email: user.email,
                          };
                          dispatch(likePost(c_post));
                        }}
                      >
                        <span className="mr-1">{post.likeCount}</span>
                        <HeartFill />
                      </Button>
                    </div>
                  </Card.Footer>
                  <EditPostModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    post={post}
                  />
                  <NotificationSystem ref={notificationSystem} />
                </Card>
              </div>
            ))}
          </div>
        )}
      </Container>
    );
};

export default Posts;
