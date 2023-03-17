import axios from "axios";

export default function Trials() {
  return <h1>Test</h1>;
}

export async function getServerSideProps() {
  const maxLevel = 55;
  const minLevel = maxLevel - 2;
  // Change this to get dungeons for a specific level
  // Implement item level required later
  const res = await axios.get(
    `https://xivapi.com/search?private_key=${process.env.XIVAPI_KEY}&filters=ContentFinderCondition.ClassJobLevelRequired<=${maxLevel},ContentFinderCondition.ClassJobLevelRequired>=${minLevel},InstanceClearExp>0,InstanceClearGil>0&columns=ID,Name,InstanceClearExp,InstanceClearGil,ContentFinderCondition.ClassJobLevelRequired&language=en`
  );

  return {
    props: {
      initialResults: res.data.Results,
    },
  };
}