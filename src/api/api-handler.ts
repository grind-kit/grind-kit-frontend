import axios from "axios";
import * as queryStrings from "./queryStrings/queryStrings.json";

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

// HandlerContentFinderCondition class

export class HandlerContentFinderCondition {
  ID: number;
  Name: string;
  Image: string;
  Description: string;

  constructor(ID: number, Name: string, Image: string, Description: string) {
    this.ID = ID;
    this.Name = Name;
    this.Image = Image;
    this.Description = Description;
  }

  static async getHandlerContentFinderConditionDetails(id: number) {
    try {
      const response = await axios.get(
        `${process.env.XIVAPI_URL}contentfindercondition/${id}?private_key=${process.env.XIVAPI_KEY}&${queryStrings.GET_HANDLER_CONTENT_FINDER_CONDITION_DETAILS}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
