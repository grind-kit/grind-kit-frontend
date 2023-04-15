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

export class ContentFinderCondition {
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

  static async getContentFinderConditionList(
    classJobLevel: number,
    token: string | undefined
  ) {
    try {
      const minClassJobLevel = classJobLevel - 5;
      console.log("minClassJobLevel ✅", minClassJobLevel, typeof minClassJobLevel)
      console.log("classJobLevel ✅", classJobLevel, typeof classJobLevel)

      const response = await axios.get(
        `${process.env.BACKEND_URL}/conditions`,
        {
          params: {
            minLevel: minClassJobLevel,
            maxLevel: classJobLevel,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
      
    } catch (error) {
      console.error(error);
    }
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
        `${process.env.XIVAPI_URL}InstanceContent/${id}?private_key=${process.env.XIVAPI_KEY}&language=en&columns=Name,Description,Banner,InstanceClearExp,InstanceClearGil,ContentType.IconHD,ItemLevelRequired,ContentFinderCondition.ClassJobLevelRequired`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
