import axios from "axios";

type InstancesProps = {
  level: number;
  data: Array<{
    ID: number;
    Icon: string;
    Name: string;
    Url: string;
  }>;
};

export default function Instances({ level, data }: InstancesProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold">Instance Content</h1>
      {data.map((instance) => (
        <ul>
          <li>{instance.Name}</li>
        </ul>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    `https://xivapi.com/InstanceContent?private_key=${process.env.XIVAPI_KEY}`
  );

  console.log(res.data.Results);

  return {
    props: {
      data: res.data.Results,
    },
  };
}
