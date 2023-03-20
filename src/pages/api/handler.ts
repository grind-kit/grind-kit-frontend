import axios from "axios";

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

  static async getDungeon(id: string | string[] | undefined) {
    const res = await axios.get(
      `https://xivapi.com/InstanceContent/${id}?private_key=${process.env.XIVAPI_KEY}&language=en&columns=Name,Description,Banner,InstanceClearExp,InstanceClearGil,ContentType.IconHD,ItemLevelRequired,ContentFinderCondition.ClassJobLevelRequired`
    );

    return res.data;
  }
}
