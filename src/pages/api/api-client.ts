import axios from "axios";
import { auth } from "@/firebase/firebase";

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

  static async getUserInfo(username: string) {
    try {
      const token = await auth.currentUser?.getIdToken();
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
}

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

  static async getBookmarks(user: number) {
    try {
      const token = await auth.currentUser?.getIdToken();
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
