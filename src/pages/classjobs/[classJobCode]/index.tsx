import ProtectedRoute from "@/components/ProtectedRoute";
import getData from "@/data";
import InstanceContentTypeList from "@/components/InstanceContentTypeList";
import { useRouter } from "next/router";
const loadStrings = require("@/locales/en/strings");

function ClassJobCodePage() {
  const strings = loadStrings;
  const router = useRouter();
  const { level, classJobCode } = router.query;
  const parsedLevel = Number(level);
  const { arrayOfInstanceContent } = getData();

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        {parsedLevel < 90 ? (
          <>
            <h2 className="text-3xl font-bold text-slate-900">
              {strings.INSTANCECONTENT_HEADER}
            </h2>
            {arrayOfInstanceContent?.map((instanceContent) => {
              return (
                <InstanceContentTypeList
                  key={instanceContent.instanceContentId}
                  classJobCode={classJobCode}
                  {...instanceContent}
                />
              );
            })}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-slate-900">
              {strings.MAX_LEVEL_HEADER}
            </h2>
            <p className="text-slate-900 mt-5">{strings.MAX_LEVEL_MESSAGE}</p>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default ClassJobCodePage;
