import { ApplicationCard } from "@/components/global/applications/ApplicationCard";
import { ApplicationHero } from "@/components/global/applications/ApplicationHero";
import { ApplicationLayout } from "@/layouts/ApplicationLayout";
import { APPLICATION_META } from "@/types/applications";
import { NAVIGATION_ACCENTS } from "@/types/navigation";

const APP_ID = "projects";

function ProjectsPage() {
  const meta = APPLICATION_META[APP_ID];
  const accent = NAVIGATION_ACCENTS[APP_ID];
  const isOddCount = meta.sections.length % 2 === 1;

  return (
    <ApplicationLayout appId={APP_ID}>
      <div className="flex flex-col gap-8">
        <ApplicationHero appId={APP_ID} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {meta.sections.map((section, index) => {
            const isLast = index === meta.sections.length - 1;
            return (
              <ApplicationCard
                key={section}
                title={section}
                accentColor={accent}
                className={isOddCount && isLast ? "sm:col-span-2" : undefined}
              />
            );
          })}
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default ProjectsPage;
