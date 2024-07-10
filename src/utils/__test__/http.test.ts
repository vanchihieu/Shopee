import HttpStatusCode from "src/constants/httpStatusCode.enum";

import { Http } from "src/utils/http";
import { beforeEach, describe, expect, it } from "vitest";

describe("http axios", () => {
  let http = new Http().instance;
  beforeEach(() => {
    localStorage.clear();
    http = new Http().instance;
  });

  it("Gọi API", async () => {
    const res = await http.get("products");
    expect(res.status).toBe(HttpStatusCode.Ok);
  }),
    it("Auth Request", async () => {
      await http.post("login", {
        email: "vanchihieu3@gmail.com",
        password: "123456",
      });

      const res = await http.get("me");
      expect(res.status).toBe(HttpStatusCode.Ok);
    });

  it("Người dùng Hiếu có adddress", async () => {
    await http.post("login", {
      email: "vanchihieu3@gmail.com",
      password: "123456",
    });

    const res = await http.get("me");
    expect(res.data.data.address).toBe("12 Nguyễn Văn Bảo Phường 4 q gò vấp");
  });

  it("Người dùng có email là vanchihieu3@gmail.com", async () => {
    await http.post("login", {
      email: "vanchihieu3@gmail.com",
      password: "123456",
    });

    const res = await http.get("me");
    expect(res.data.data.email).toBe("vanchihieu3@gmail.com");
  });
});
