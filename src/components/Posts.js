import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import moment from "moment";
import loading from "../assets/loading.gif";
import { Pencil, Trash, Heart } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import EditPostModal from "./EditPostModal";
import { useDispatch } from "react-redux";
import {
  deletePost,
  getPosts,
  likePost,
  unlikePost,
} from "../redux/actions/posts";
import ModalImage from "react-modal-image";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

const Posts = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user, isAuthenticated);

  const [modalShow, setModalShow] = useState(false);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [postId, setCurrentId] = useState("");

  useEffect(() => {
    if (postId) {
      setCurrentId("");
    }
    dispatch(getPosts());
    console.log("rendered");
  }, [dispatch, postId, isAuthenticated, user, isLoading]);

  if (!isAuthenticated && !isLoading) {
    return <Redirect to="/login" />;
  } else
    return (
      <Container className="container-md ">
        {!posts.length ? (
          <Container className="text-center mx-auto">
            <img src={loading} alt="loading..." style={{}} />
          </Container>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: "20px",
            }}
          >
            {posts.map((post) => (
              <div key={post.id}>
                <Card
                  style={{ width: "20rem", margin: "10px" }}
                  className="shadow p-0 mb-5 bg-white rounded"
                >
                  <div style={{ objectFit: "fill", backgroundSize: "cover" }}>
                    <ModalImage
                      // className="card-img-top"
                      small={post.selectedFile}
                      medium={post.selectedFile}
                      alt={post.title}
                    />
                  </div>
                  <Card.Body>
                    <Card.Text style={{ fontWeight: "500" }}>
                      {post.tags}
                    </Card.Text>

                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.message}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      {moment(post.createdAt).fromNow()}
                    </small>
                    <br />
                    <small className="text-muted font-italic">
                      {isLoading ? "" : user.name}
                    </small>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
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
                          dispatch(deletePost(post._id));
                        }}
                      >
                        <Trash />
                      </Button>
                      <Button
                        variant={liked ? "info" : "outline-info"}
                        onClick={() => {
                          setLiked(!liked);
                          if (!liked) {
                            dispatch(likePost(post._id));
                          } else {
                            dispatch(unlikePost(post._id));
                          }
                        }}
                      >
                        <span className="mr-1">{post.likeCount}</span>
                        <Heart />
                      </Button>
                    </div>
                  </Card.Footer>
                  <EditPostModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    post={post}
                  />
                </Card>
              </div>
            ))}
          </div>
        )}
      </Container>
    );
};
export default Posts;
