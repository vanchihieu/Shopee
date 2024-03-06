import { beforeEach, describe, expect, it } from "vitest";
import { getAccessTokenFromLS, setAccessTokenToLS } from "../auth";

const access_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2RkYzM1YjExNDAwODkzZGY2ZjFkZCIsImVtYWlsIjoiY2hpaGlldUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTEwLTI5VDA0OjE0OjU4Ljg2NVoiLCJpYXQiOjE2OTg1NTI4OTgsImV4cCI6MTY5OTE1NzY5OH0.1RmZmBYFw5epUrjxEMNj3b8ZR0xKrrS4hWPnOHAvAbc";

// const refresh_token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRhNjExNWZkYzVmMDM3ZTZmNjk0YiIsImVtYWlsIjoiZDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xMlQwODoxMjo1NS4xOTZaIiwiaWF0IjoxNjcwODMyNzc1LCJleHAiOjE2ODQ2NTY3NzV9.exhtfRyvl2Z5uAAfEQKtIyyUhP8q-K5wvHvHpWZz128";

// const profile = {
//     _id: "653ddc35b11400893df6f1dd",
//     roles: ["User"],
//     email: "chihieu@gmail.com",
//     createdAt: "2023-10-29T04:14:45.028Z",
//     updatedAt: "2023-10-29T04:14:45.028Z",
//     __v: 0,
// };

beforeEach(() => {
  localStorage.clear();
});

describe("access_token", () => {
  it("access_token được set vào localStorage", () => {
    setAccessTokenToLS(access_token);
    expect(getAccessTokenFromLS()).toBe(access_token);
  });
});

// describe("refresh_token", () => {
//     it("refresh_token được set vào localStorage", () => {
//         setRefreshTokenToLS(refresh_token);
//         expect(getRefreshTokenFromLS()).toEqual(refresh_token);
//     });
// });

// describe("clearLS", () => {
//     it("Xóa hết access_token, refresh_token, profile", () => {
//         setRefreshTokenToLS(refresh_token);
//         setAccessTokenToLS(access_token);
//         // setProfile tại đây
//         // ...
//         clearLS();
//         expect(getAccessTokenFromLS()).toBe("");
//         expect(getRefreshTokenFromLS()).toBe("");
//     });
// });
