import { createSlice } from "@reduxjs/toolkit";
import AllService from "../services/allService";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentRequested: (state) => {
      state.isLoading = true;
    },
    commentReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addCommentReceved: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    commentRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer: commentReducer, actions } = commentSlice;
const {
  commentRequested,
  commentReceved,
  addCommentReceved,
  commentRequestFiled,
} = actions;
export const loadCommentList = (id) => async (dispatch) => {
  dispatch(commentRequested());
  try {
    const getComment = await AllService.getComment(id);
    dispatch(commentReceved(getComment));
  } catch (e) {
    dispatch(commentRequestFiled(e.message));
  }
};

export const addComment = (payload) => async (dispatch) => {
  dispatch(commentRequested());
  try {
    const comment = await AllService.createComment(payload);
    dispatch(addCommentReceved(comment));
  } catch (e) {
    const { data } = e.response;
    dispatch(commentRequestFiled(data.errors));
  }
};
export const removeComment = (payload) => async (dispatch) => {
  dispatch(commentRequested());
  try {
    const comment = await AllService.deleteComment(payload);
    console.log(comment);

    dispatch(commentReceved(comment));
  } catch (e) {
    const { data } = e.response;
    dispatch(commentRequestFiled(data.errors));
  }
};
export const getCommentStatus = (state) => state.comment.isLoading;
export const getComment = (state) => state.comment.entities;
export const getCommentError = (state) => state.comment.error;
export const getCommentById = (id) => (state) => {
  if (state.comment.entities) {
    return state.comment.entities.find((comment) => comment._id === id);
  }
};
export default commentReducer;
