import axios from "axios";

// User class

export class User {
  id: number;
  username: string;
  email: string;
  created: string;
  lodestone_id: number | null;

  constructor(
    id: number,
    username: string,
    email: string,
    created: string,
    lodestone_id: number | null
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.created = created;
    this.lodestone_id = lodestone_id;
  }

  static async getUserInfo(username: string, token: string | null | undefined) {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async putUserInfo(
    username: string,
    token: string | undefined,
    lodestoneId: number | undefined
  ) {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_URL}/users/${username}`,
        {
          username: username,
          lodestone_id: lodestoneId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

// Bookmark class

export class Bookmark {
  user: number;
  instance_id: number;
  value: boolean;
  created: string;

  constructor(
    user: number,
    instance_id: number,
    value: boolean,
    created: string
  ) {
    this.user = user;
    this.instance_id = instance_id;
    this.value = value;
    this.created = created;
  }

  static async getBookmarks(user: number, token: string) {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/bookmarks/${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
