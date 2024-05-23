import { getAllResidentialCertificates } from "@/data/certificates/certificates";

import AdminResidentialTable from "@/components/admin/tables/admin-residential-table";

const AdminResidentialCertificatePage = async () => {
  const residentialCertificates = await getAllResidentialCertificates();

  return (
    <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mt-5">
      <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
        View details of applied certificates
      </h1>
      <div className="overflow-x-auto">
        <AdminResidentialTable
          residentialCertificates={residentialCertificates}
        />
      </div>
    </div>
  );
};

export default AdminResidentialCertificatePage;
