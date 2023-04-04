import axios from "axios";

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

// Dungeon class

export class Dungeon {
  Name: string;
  Description: string;
  Banner: string;
  InstanceClearExp: number;
  InstanceClearGil: number;
  ContentType: {
    IconHD: string;
  };
  ItemLevelRequired: number;
  ContentFinderCondition: {
    ClassJobLevelRequired: number;
  };

  constructor(
    Name: string,
    Description: string,
    Banner: string,
    InstanceClearExp: number,
    InstanceClearGil: number,
    ContentType: {
      IconHD: string;
    },
    ItemLevelRequired: number,
    ContentFinderCondition: {
      ClassJobLevelRequired: number;
    }
  ) {
    this.Name = Name;
    this.Description = Description;
    this.Banner = Banner;
    this.InstanceClearExp = InstanceClearExp;
    this.InstanceClearGil = InstanceClearGil;
    this.ContentType = ContentType;
    this.ItemLevelRequired = ItemLevelRequired;
    this.ContentFinderCondition = ContentFinderCondition;
  }

  static async getDungeonInfo(id: string | string[] | undefined) {
    try {
      const response = await axios.get(
        `https://xivapi.com/InstanceContent/${id}?private_key=${process.env.XIVAPI_KEY}&language=en&columns=Name,Description,Banner,InstanceClearExp,InstanceClearGil,ContentType.IconHD,ItemLevelRequired,ContentFinderCondition.ClassJobLevelRequired`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
