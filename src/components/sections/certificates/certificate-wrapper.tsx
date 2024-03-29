"use client";

interface CertificateWrapperProps {
  children: React.ReactNode;
  certificateTitle: string;
}

const CertificateWrapper = ({
  children,
  certificateTitle,
}: CertificateWrapperProps) => {
  return (
    <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md">
      <div className="flex-1">
        <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
          {certificateTitle} Certificate | Application Form
        </h1>
        {children}
      </div>
    </div>
  );
};

export default CertificateWrapper;
