import request from "supertest";

import app from "../app.js";
import db from "../db/Sequelize.js";

import User from "../db/models/User.js";

import { subscriptionList } from "../constants/auth.js";

describe("test /api/auth", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3000, done);
  });

  afterAll(async () => {
    await server.close();
    await db.close();
  });

  const userData = {
    email: "test@gmail.com",
    password: "topSecret1",
  };

  test("register with correct data", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(status).toBe(201);
    expect(body.user.email).toBe(userData.email);
    expect(body.user.subscription).toBe(subscriptionList[0]);
    expect(typeof body.user.avatarURL).toBe("string");
  });

  test("login with correct credentials", async () => {
    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send(userData);

    expect(status).toBe(200);
    expect(typeof body.token).toBe("string");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
    expect(body.user.email).toBe(userData.email);
    expect(subscriptionList).toContain(body.user.subscription);

    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    expect(user).toBeTruthy();

    if (user) {
      await User.destroy({
        where: {
          email: userData.email,
        },
      });
    }
  });
});
