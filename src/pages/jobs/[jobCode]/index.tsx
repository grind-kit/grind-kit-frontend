import { useRouter } from "next/router";

export default function JobCode() {
  const router = useRouter();
  const { jobCode } = router.query;

  return (
    <div>
      <h1>You selected {jobCode}</h1>
      <div>
        <p>Next, choose a content type:</p>
        <div
          className="hover:cursor-pointer"
          onClick={() => router.push(`/jobs/${jobCode}/dungeons/`)}
        >
          <p>Dungeons</p>
        </div>
      </div>
    </div>
  );
}
