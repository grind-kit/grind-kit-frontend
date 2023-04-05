function getData() {
  const data = localStorage.getItem("characterData");
  const parsedData = JSON.parse(data!);
  const arrayOfClassJobs = parsedData.Character.ClassJobs;

  const roleData = [
    {
      roleId: 0,
      type: "tank",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      data: [
        {
          jobId: 0,
          // Warrior is the first job in the array
          name: arrayOfClassJobs[0].Name,
          level: arrayOfClassJobs[0].Level,
          jobCode: "pld",
        },
        {
          jobId: 1,
          // Paladin is the second job in the array
          name: arrayOfClassJobs[1].Name,
          level: arrayOfClassJobs[1].Level,
          jobCode: "war",
        },
        {
          jobId: 2,
          // Dark Knight is the third job in the array
          name: arrayOfClassJobs[2].Name,
          level: arrayOfClassJobs[2].Level,
          jobCode: "drk",
        },
        {
          jobId: 3,
          // Gunbreaker is the fourth job in the array
          name: arrayOfClassJobs[3].Name,
          level: arrayOfClassJobs[3].Level,
          jobCode: "gnb",
        },
      ],
    },
    {
      roleId: 1,
      type: "healer",
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      data: [
        {
          jobId: 0,
          // White Mage is the fifth job in the array
          name: arrayOfClassJobs[4].Name,
          level: arrayOfClassJobs[4].Level,
          jobCode: "whm",
        },
        {
          jobId: 1,
          // Scholar is the sixth job in the array
          name: arrayOfClassJobs[5].Name,
          level: arrayOfClassJobs[5].Level,
          jobCode: "sch",
        },
        {
          jobId: 2,
          // Astrologian is the seventh job in the array
          name: arrayOfClassJobs[6].Name,
          level: arrayOfClassJobs[6].Level,
          jobCode: "ast",
        },
        {
          jobId: 3,
          // Sage is the eighth job in the array
          name: arrayOfClassJobs[7].Name,
          level: arrayOfClassJobs[7].Level,
          jobCode: "sge",
        },
      ],
    },
    {
      roleId: 2,
      type: "melee DPS",
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
      data: [
        {
          jobId: 0,
          // Monk is the ninth job in the array
          name: arrayOfClassJobs[8].Name,
          level: arrayOfClassJobs[8].Level,
          jobCode: "mnk",
        },
        {
          jobId: 1,
          // Dragoon is the tenth job in the array
          name: arrayOfClassJobs[9].Name,
          level: arrayOfClassJobs[9].Level,
          jobCode: "drg",
        },
        {
          jobId: 2,
          // Ninja is the eleventh job in the array
          name: arrayOfClassJobs[10].Name,
          level: arrayOfClassJobs[10].Level,
          jobCode: "nin",
        },
        {
          jobId: 3,
          // Samurai is the twelfth job in the array
          name: arrayOfClassJobs[11].Name,
          level: arrayOfClassJobs[11].Level,
          jobCode: "sam",
        },
        {
          jobId: 4,
          // Red Mage is the thirteenth job in the array
          name: arrayOfClassJobs[12].Name,
          level: arrayOfClassJobs[12].Level,
          jobCode: "rpr",
        },
      ],
    },
    {
      roleId: 3,
      type: "physical ranged DPS",
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
      data: [
        {
          jobId: 0,
          // Bard is the fourteenth job in the array
          name: arrayOfClassJobs[13].Name,
          level: arrayOfClassJobs[13].Level,
          jobCode: "brd",
        },
        {
          jobId: 1,
          // Machinist is the fifteenth job in the array
          name: arrayOfClassJobs[14].Name,
          level: arrayOfClassJobs[14].Level,
          jobCode: "mch",
        },
        {
          jobId: 2,
          // Dancer is the sixteenth job in the array
          name: arrayOfClassJobs[15].Name,
          level: arrayOfClassJobs[15].Level,
          jobCode: "dnc",
        },
      ],
    },
    {
      roleId: 5,
      type: "magical ranged DPS",
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
      data: [
        {
          jobId: 0,
          // Black Mage is the seventeenth job in the array
          name: arrayOfClassJobs[16].Name,
          level: arrayOfClassJobs[16].Level,
          jobCode: "blm",
        },
        {
          jobId: 1,
          // Summoner is the eighteenth job in the array
          name: arrayOfClassJobs[17].Name,
          level: arrayOfClassJobs[17].Level,
          jobCode: "smn",
        },
        {
          jobId: 2,
          // Red Mage is the nineteenth job in the array
          name: arrayOfClassJobs[18].Name,
          level: arrayOfClassJobs[18].Level,
          jobCode: "rdm",
        },
      ],
    },
  ];

  const contentData = [
    {
      contentId: 0,
      name: "Dungeons",
      icon: null,
      href: "dungeons",
    },
    {
      contentId: 1,
      name: "Trials",
      icon: null,
      href: "trials",
    },
  ];

  return { roleData, contentData };
}

export default getData;
