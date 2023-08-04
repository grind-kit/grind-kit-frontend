import axios from "axios";
import camelcaseKeys from "camelcase-keys";

// User class

export class User {
  id: number;
  username: string;
  email: string;
  created: string;
  lodestoneId: number | null;

  constructor(
    id: number,
    username: string,
    email: string,
    created: string,
    lodestoneId: number | null
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.created = created;
    this.lodestoneId = lodestoneId;
  }

  static async create(userData: {
    username: string;
    email: string;
    password: string;
    idToken: string;
    refreshToken: string;
  }) {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/users/auth/signup/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${userData.idToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async retrieve(
    userData: {
      userId: number;
    },
    token: string | null
  ) {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/users/${userData.userId}/`,
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

  static async refreshIdToken(
    userData: {
      username: string;
    },
    token: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/users/auth/login/`,
        {
          username: userData.username,
          idToken: token,
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

  static async updateLodestoneId(
    userData: {
      userId: number;
      lodestoneId: number | undefined;
    },
    token: string | null
  ) {
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_URL}/users/${userData.userId}/`,
        {
          lodestone_id: userData.lodestoneId,
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

// InstanceContentBookmark class

export class InstanceContentBookmark {
  userId: number;
  contentTypeId: number;
  contentFinderConditionId: number;
  value: number;
  created: string;

  constructor(
    userId: number,
    contentTypeId: number,
    contentFinderConditionId: number,
    value: number,
    created: string
  ) {
    this.userId = userId;
    this.contentTypeId = contentTypeId;
    this.contentFinderConditionId = contentFinderConditionId;
    this.value = value;
    this.created = created;
  }

  static async patchBookmark(
    userId: number,
    token: string,
    bookmarkId: number,
    value: number
  ) {
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_URL}/users/${userId}/bookmarks/${bookmarkId}`,
        {
          value: value,
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

  static async postBookmark(
    userId: number,
    token: string,
    contentTypeId: number,
    contentFinderConditionId: number
  ) {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/users/${userId}/bookmarks`,
        {
          content_type_id: contentTypeId,
          content_finder_condition: contentFinderConditionId,
          value: 1,
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

// ClientContentFinderCondition class

export class ClientContentFinderCondition {
  Name: string;
  ClassJobLevelRequired: number;
  ItemLevelRequired: number;

  constructor(
    Name: string,
    ClassJobLevelRequired: number,
    ItemLevelRequired: number
  ) {
    this.Name = Name;
    this.ClassJobLevelRequired = ClassJobLevelRequired;
    this.ItemLevelRequired = ItemLevelRequired;
  }

  static async getClientContentFinderConditionList(
    classJobLevel: number,
    contentTypeId: number,
    token: string | undefined
  ) {
    try {
      let minClassJobLevel;

      if (classJobLevel <= 2) {
        minClassJobLevel = 0;
      } else minClassJobLevel = classJobLevel - 2;

      const response = await axios.get(
        `${process.env.BACKEND_URL}/conditions`,
        {
          params: {
            type: contentTypeId,
            min: minClassJobLevel,
            max: classJobLevel,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data === undefined) return null;

      const data = camelcaseKeys(response.data, { deep: true });

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
