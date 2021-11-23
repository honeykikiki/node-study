const { addFollowings } = require("./user");
jest.mock("../models/user");
const User = require("../models/user");

describe("addFollowing", () => {
  const req = {
    user: { id: 1 },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test("사용자를 찾아 팔로일을 추가하고 success를 응답해야함", async () => {
    User.findOne.mockReturnValue(
      Promise.resolve({
        id: 1,
        name: "honey",
        addFollowings(value) {
          return Promise.resolve(true);
        },
      })
    );
    await addFollowings(req, res, next);
    expect(res.send).toBeCalledWith("success");
  });

  test("사용자를 못 찾으면 res.status(404).send(no user)을 호출함", async () => {
    User.findOne.mockReturnValue(Promise.resolve(null));
    await addFollowings(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith("no user");
  });

  test("에러가 발생할시 next(error)을 실행함", async () => {
    const error = "테스트 에러";
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowings(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
