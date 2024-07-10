import { Http } from "src/utils/http";
import { beforeEach, describe, expect, it } from "vitest";

describe("http axios", () => {
  let http = new Http().instance;
  beforeEach(() => {
    localStorage.clear();
    http = new Http().instance;
  });

  it("Lấy tất cả sản phẩm trang đầu", async () => {
    const response = await http.get("/products/?page=1&limit=20");

    expect(response.data.data.products.length).toBe(20);
  });

  it("Kiểm tra sản phẩm đầu tiên có price là 3190000", async () => {
    const response = await http.get("/products");

    expect(response.data.data.products[0].price).toBe(3190000);
  });

  it("Kiểm tra sản phẩm đầu tiên có name là Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng", async () => {
    const response = await http.get("/products");

    expect(response.data.data.products[0].name).toBe(
      "Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng"
    );
  });

  it("Tìm kiếm 4 sản phẩm bán chạy theo khoảng giá từ 20.000 -> 50.000 và sắp xếp giá từ thấp đến cao", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&sort_by=price&order=asc&price_max=50000&price_min=20000"
    );

    expect(response.data.data.products.length).toBe(4);
  });

  it("Tìm kiếm 10 sản phẩm áo thun phổ biến theo khoảng giá từ 100.000 -> 200.000 và sắp xếp giá từ thấp đến cao", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&sort_by=price&order=asc&price_max=200000&price_min=100000&category=60aba4e24efcc70f8892e1c6"
    );

    expect(response.data.data.products.length).toBe(10);
  });

  it("Tìm kiếm tất cả sản phẩm đồng hồ", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&sort_by=view&category=60afacca6ef5b902180aacaf"
    );

    expect(response.data.data.products.length).toBe(5);
  });

  it("Tìm kiếm tất cả sản phẩm điện thoại", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&sort_by=view&category=60afafe76ef5b902180aacb5"
    );

    expect(response.data.data.products.length).toBe(5);
  });

  it("Tìm kiếm tất cả sản phẩm chính hãng", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&name=chính+hãng"
    );

    expect(response.data.data.products.length).toBe(6);
  });

  it("Tìm kiếm tất cả sản phẩm POLO", async () => {
    const response = await http.get(
      "/products?page=1&limit=20&name=polo"
    );

    expect(response.data.data.products.length).toBe(7);
  });
});
