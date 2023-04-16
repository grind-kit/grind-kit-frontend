import ProtectedRoute from "@/components/ProtectedRoute";
import getData from "@/data";
import InstanceContentTypeList from "@/components/InstanceContentTypeList";
import { useRouter } from "next/router";

function ClassJobCodePage() {
  const router = useRouter();
  const { classJobCode } = router.query;
  const { arrayOfInstanceContent } = getData();

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Choose an Instance Content Type
        </h1>
        {arrayOfInstanceContent?.map((instanceContent) => {
          return (
            <InstanceContentTypeList
              key={instanceContent.instanceContentId}
              classJobCode={classJobCode}
              {...instanceContent}
            />
          );
        })}
      </div>
    </ProtectedRoute>
  );
}

export default ClassJobCodePage;
