function getData() {
  const arrayOfInstanceContent = [
    {
      instanceContentId: 0,
      instanceContentType: "dungeons",
      // The contentTypeId is set by the API
      contentTypeId: 2,
    },
    {
      instanceContentId: 1,
      instanceContentType: "trials",
      contentTypeId: 4,
    },
    {
      instanceContentId: 2,
      instanceContentType: "raids",
      contentTypeId: 5,
    }
  ];

  const data = localStorage.getItem("characterData");

  if (data === null) {
    return { arrayOfInstanceContent };
  }

  const parsedData = JSON.parse(data);
  const arrayOfClassJobs = parsedData.Character.ClassJobs;

  const arrayOfRoles = [
    {
      roleId: 0,
      roleType: "tank",
      bg: "bg-blue-600 shadow-md",
      hover: "hover:bg-blue-700",
      roleData: [
        {
          classJobId: 0,
          // Warrior is the first job in the array
          classJobName: arrayOfClassJobs[0].Name,
          classJobLevel: arrayOfClassJobs[0].Level,
          classJobCode: "pld",
        },
        {
          classJobId: 1,
          // Paladin is the second job in the array
          classJobName: arrayOfClassJobs[1].Name,
          classJobLevel: arrayOfClassJobs[1].Level,
          classJobCode: "war",
        },
        {
          classJobId: 2,
          // Dark Knight is the third job in the array
          classJobName: arrayOfClassJobs[2].Name,
          classJobLevel: arrayOfClassJobs[2].Level,
          classJobCode: "drk",
        },
        {
          classJobId: 3,
          // Gunbreaker is the fourth job in the array
          classJobName: arrayOfClassJobs[3].Name,
          classJobLevel: arrayOfClassJobs[3].Level,
          classJobCode: "gnb",
        },
      ],
    },
    {
      roleId: 1,
      roleType: "healer",
      bg: "bg-green-600 shadow-md",
      hover: "hover:bg-green-700",
      roleData: [
        {
          classJobId: 0,
          // White Mage is the fifth job in the array
          classJobName: arrayOfClassJobs[4].Name,
          classJobLevel: arrayOfClassJobs[4].Level,
          classJobCode: "whm",
        },
        {
          classJobId: 1,
          // Scholar is the sixth job in the array
          classJobName: arrayOfClassJobs[5].Name,
          classJobLevel: arrayOfClassJobs[5].Level,
          classJobCode: "sch",
        },
        {
          classJobId: 2,
          // Astrologian is the seventh job in the array
          classJobName: arrayOfClassJobs[6].Name,
          classJobLevel: arrayOfClassJobs[6].Level,
          classJobCode: "ast",
        },
        {
          classJobId: 3,
          // Sage is the eighth job in the array
          classJobName: arrayOfClassJobs[7].Name,
          classJobLevel: arrayOfClassJobs[7].Level,
          classJobCode: "sge",
        },
      ],
    },
    {
      roleId: 2,
      roleType: "melee DPS",
      bg: "bg-red-600 shadow-md",
      hover: "hover:bg-red-700",
      roleData: [
        {
          classJobId: 0,
          // Monk is the ninth job in the array
          classJobName: arrayOfClassJobs[8].Name,
          classJobLevel: arrayOfClassJobs[8].Level,
          classJobCode: "mnk",
        },
        {
          classJobId: 1,
          // Dragoon is the tenth job in the array
          classJobName: arrayOfClassJobs[9].Name,
          classJobLevel: arrayOfClassJobs[9].Level,
          classJobCode: "drg",
        },
        {
          classJobId: 2,
          // Ninja is the eleventh job in the array
          classJobName: arrayOfClassJobs[10].Name,
          classJobLevel: arrayOfClassJobs[10].Level,
          classJobCode: "nin",
        },
        {
          classJobId: 3,
          // Samurai is the twelfth job in the array
          classJobName: arrayOfClassJobs[11].Name,
          classJobLevel: arrayOfClassJobs[11].Level,
          classJobCode: "sam",
        },
        {
          classJobId: 4,
          // Red Mage is the thirteenth job in the array
          classJobName: arrayOfClassJobs[12].Name,
          classJobLevel: arrayOfClassJobs[12].Level,
          classJobCode: "rpr",
        },
      ],
    },
    {
      roleId: 3,
      roleType: "physical ranged DPS",
      bg: "bg-red-600 shadow-md",
      hover: "hover:bg-red-700",
      roleData: [
        {
          classJobId: 0,
          // Bard is the fourteenth job in the array
          classJobName: arrayOfClassJobs[13].Name,
          classJobLevel: arrayOfClassJobs[13].Level,
          classJobCode: "brd",
        },
        {
          classJobId: 1,
          // Machinist is the fifteenth job in the array
          classJobName: arrayOfClassJobs[14].Name,
          classJobLevel: arrayOfClassJobs[14].Level,
          classJobCode: "mch",
        },
        {
          classJobId: 2,
          // Dancer is the sixteenth job in the array
          classJobName: arrayOfClassJobs[15].Name,
          classJobLevel: arrayOfClassJobs[15].Level,
          classJobCode: "dnc",
        },
      ],
    },
    {
      roleId: 4,
      roleType: "magical ranged DPS",
      bg: "bg-red-600 shadow-md",
      hover: "hover:bg-red-700",
      roleData: [
        {
          classJobId: 0,
          // Black Mage is the seventeenth job in the array
          classJobName: arrayOfClassJobs[16].Name,
          classJobLevel: arrayOfClassJobs[16].Level,
          classJobCode: "blm",
        },
        {
          classJobId: 1,
          // Summoner is the eighteenth job in the array
          classJobName: arrayOfClassJobs[17].Name,
          classJobLevel: arrayOfClassJobs[17].Level,
          classJobCode: "smn",
        },
        {
          classJobId: 2,
          // Red Mage is the nineteenth job in the array
          classJobName: arrayOfClassJobs[18].Name,
          classJobLevel: arrayOfClassJobs[18].Level,
          classJobCode: "rdm",
        },
      ],
    },
  ];

  return { arrayOfRoles, arrayOfInstanceContent };
}

export default getData;
