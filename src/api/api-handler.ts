import axios from "axios";
const loadQueryStrings = require("./queryStrings/queryStrings");
const queryStrings = loadQueryStrings;

// Character class

export class Character {
  Name: string;
  Server: string;

  constructor(Name: string, Server: string) {
    this.Name = Name;
    this.Server = Server;
  }

  static async getCharacterInfo(url: string) {
    return fetch(url).then((res) => res.json());
  }
}

// ContentFinderCondition class

export class HandlerContentFinderCondition {
  ID: number;
  Name: string;
  Image: string;

  constructor(ID: number, Name: string, Image: string) {
    this.ID = ID;
    this.Name = Name;
    this.Image = Image;
  }

  static async getHandlerContentFinderCondition(id: number) {
    try {
      const response = await axios.get(
        `${process.env.XIVAPI_URL}contentfindercondition/${id}?private_key=${process.env.XIVAPI_KEY}&${queryStrings.GET_HANDLER_CONTENT_FINDER_CONDITION}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
