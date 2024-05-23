import { getAllBirthCertificates } from "@/data/certificates/certificates";

import AdminBirthTable from "@/components/admin/tables/admin-birth-table";

const AdminBirthCertificatePage = async () => {
  const birthCertificates = await getAllBirthCertificates();

  return (
    <div className="flex flex-col bg-stone-50 p-4 border border-border shadow-sm rounded-md mt-5">
      <h1 className="text-xl font-medium text-muted-foreground mb-8 border-b border-border pb-2">
        View details of applied certificates
      </h1>
      <div className="overflow-x-auto">
        <AdminBirthTable birthCertificates={birthCertificates} />
      </div>
    </div>
  );
};

export default AdminBirthCertificatePage;
