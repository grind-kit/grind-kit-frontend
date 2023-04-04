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
          name: arrayOfClassJobs[0].Name,
          level: arrayOfClassJobs[0].Level,
          jobCode: "pld",
        },
        {
          jobId: 1,
          name: arrayOfClassJobs[1].Name,
          level: arrayOfClassJobs[1].Level,
          jobCode: "war",
        },
        {
          jobId: 2,
          name: arrayOfClassJobs[2].Name,
          level: arrayOfClassJobs[2].Level,
          jobCode: "drk",
        },
        {
          jobId: 3,
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
          name: arrayOfClassJobs[4].Name,
          level: arrayOfClassJobs[4].Level,
          jobCode: "whm",
        },
        {
          jobId: 1,
          name: arrayOfClassJobs[5].Name,
          level: arrayOfClassJobs[5].Level,
          jobCode: "sch",
        },
        {
          jobId: 2,
          name: arrayOfClassJobs[6].Name,
          level: arrayOfClassJobs[6].Level,
          jobCode: "ast",
        },
        {
          jobId: 3,
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
          name: arrayOfClassJobs[8].Name,
          level: arrayOfClassJobs[8].Level,
          jobCode: "mnk",
        },
        {
          jobId: 1,
          name: arrayOfClassJobs[9].Name,
          level: arrayOfClassJobs[9].Level,
          jobCode: "drg",
        },
        {
          jobId: 2,
          name: arrayOfClassJobs[10].Name,
          level: arrayOfClassJobs[10].Level,
          jobCode: "nin",
        },
        {
          jobId: 3,
          name: arrayOfClassJobs[11].Name,
          level: arrayOfClassJobs[11].Level,
          jobCode: "sam",
        },
        {
          jobId: 4,
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
          name: arrayOfClassJobs[13].Name,
          level: arrayOfClassJobs[13].Level,
          jobCode: "brd",
        },
        {
          jobId: 1,
          name: arrayOfClassJobs[14].Name,
          level: arrayOfClassJobs[14].Level,
          jobCode: "mch",
        },
        {
          jobId: 2,
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
          name: arrayOfClassJobs[16].Name,
          level: arrayOfClassJobs[16].Level,
          jobCode: "blm",
        },
        {
          jobId: 1,
          name: arrayOfClassJobs[17].Name,
          level: arrayOfClassJobs[17].Level,
          jobCode: "smn",
        },
        {
          jobId: 2,
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
