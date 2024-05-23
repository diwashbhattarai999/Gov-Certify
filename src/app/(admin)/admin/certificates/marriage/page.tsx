import { getAllMarriageCertificates } from "@/data/certificates/certificates";

import AdminMarriageTable from "@/components/admin/tables/admin-marriage-table";

const AdminMarriageCertificatePage = async () => {
  const marriageCertificates = await getAllMarriageCertificates();

  return (
    <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mt-5">
      <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
        View details of applied certificates
      </h1>
      <div className="overflow-x-auto">
        <AdminMarriageTable marriageCertificates={marriageCertificates} />
      </div>
    </div>
  );
};

export default AdminMarriageCertificatePage;
