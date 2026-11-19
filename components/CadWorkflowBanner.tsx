import Image from "next/image";

function WorkflowImage({
  className,
  src,
  alt,
}: {
  className: string;
  src: string;
  alt: string;
}) {
  return (
    <div className={`cad-workflow-node ${className}`}>
      <Image src={src} alt={alt} fill className="object-contain" sizes="30vw" />
    </div>
  );
}

export default function CadWorkflowBanner() {
  return (
    <div
      className="cad-workflow"
      role="img"
      aria-label="3D Model에서 Model Review, Customizing PGMs, Plan DWG, Report, ISO DWG 결과물이 순서대로 생성되는 흐름"
    >
      <div className="cad-workflow-stage">
        <svg
          className="cad-workflow-lines"
          viewBox="0 0 1000 620"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="cad-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#16c7ef" />
            </marker>
            {[
              ["review", "M 375 165 L 270 165"],
              ["custom", "M 545 300 L 520 345"],
              ["plan", "M 430 400 L 300 480"],
              ["report", "M 610 300 L 610 470"],
              ["iso", "M 700 300 L 700 390 L 750 470"],
            ].map(([name, path]) => (
              <mask
                key={name}
                id={`cad-mask-${name}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1000"
                height="620"
              >
                <path
                  className={`cad-workflow-mask cad-workflow-mask-${name}`}
                  d={path}
                  pathLength="1"
                />
              </mask>
            ))}
          </defs>

          {[
            ["review", "M 375 165 L 270 165"],
            ["custom", "M 545 300 L 520 345"],
            ["plan", "M 430 400 L 300 480"],
            ["report", "M 610 300 L 610 470"],
            ["iso", "M 700 300 L 700 390 L 750 470"],
          ].map(([name, path]) => (
            <path
              key={name}
              className="cad-workflow-path"
              d={path}
              mask={`url(#cad-mask-${name})`}
              markerEnd="url(#cad-arrow)"
            />
          ))}
        </svg>

        <WorkflowImage
          className="cad-workflow-model"
          src="/images/services/cad-workflow/model.jpg"
          alt="3D Model"
        />
        <WorkflowImage
          className="cad-workflow-review cad-workflow-step-review"
          src="/images/services/cad-workflow/review.jpg"
          alt="Model Review"
        />
        <strong className="cad-workflow-label cad-workflow-review-label cad-workflow-step-review">
          Model Review
        </strong>

        <div className="cad-workflow-custom cad-workflow-step-custom">
          <div className="cad-workflow-cylinder" />
          <span className="cad-workflow-label">Customizing PGMs</span>
        </div>

        <WorkflowImage
          className="cad-workflow-plan cad-workflow-step-plan"
          src="/images/services/cad-workflow/plan.jpg"
          alt="Plan DWG."
        />

        <div className="cad-workflow-report cad-workflow-step-report">
          <span className="cad-workflow-report-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong className="cad-workflow-label">Report</strong>
        </div>

        <WorkflowImage
          className="cad-workflow-iso cad-workflow-step-iso"
          src="/images/services/cad-workflow/iso.jpg"
          alt="ISO. DWG."
        />
      </div>
    </div>
  );
}
