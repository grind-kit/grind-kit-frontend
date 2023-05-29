import ProtectedRoute from "@/components/ProtectedRoute";
import getData from "@/data";
import InstanceContentTypeList from "@/components/InstanceContentTypeList";
import { useRouter } from "next/router";
// eslint-disable-next-line import/no-named-default
import * as strings from "@/locales/en/strings.json";

function ClassJobCodePage() {
  const router = useRouter();
  const { level, classJobCode } = router.query;
  const parsedLevel = Number(level);
  const { arrayOfInstanceContent } = getData();
  const header =
    parsedLevel < 90
      ? strings.INSTANCECONTENT_HEADER
      : strings.MAX_LEVEL_HEADER;

  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col items-center">
        <header>
          <h2 className="text-3xl font-bold text-slate-900">{header}</h2>
        </header>
        {parsedLevel < 90 ? (
          <>
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
          <p className="mt-5">{strings.MAX_LEVEL_MESSAGE}</p>
        )}
      </section>
    </ProtectedRoute>
  );
}

export default ClassJobCodePage;
