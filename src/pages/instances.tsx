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

export default function Instances(props: InstancesProps) {}

export async function getServerSideProps() {
  const res = await axios.get(`https://xivapi.com/InstanceContent`);

  console.log(res.data);

  return {
    props: {
      data: res.data,
    },
  };
}
