import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";
import { ContentList } from "@/components/List";
import { parseCookies } from "nookies";

export default function JobCode() {
  const router = useRouter();
  const { jobCode } = router.query;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Choose a Content Type
        </h1>
        <ContentList jobCode={jobCode} />
      </div>
    </ProtectedRoute>
  );
}
