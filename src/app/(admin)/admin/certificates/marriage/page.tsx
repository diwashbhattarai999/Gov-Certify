import { getAllMarriageCertificates } from "@/data/certificates/certificates";

import AdminMarriageTable from "@/components/admin/tables/admin-marriage-table";

const AdminMarriageCertificatePage = async () => {
  const marriageCertificates = await getAllMarriageCertificates();

  return (
    <div>
      <div className="overflow-x-auto">
        <AdminMarriageTable marriageCertificates={marriageCertificates} />
      </div>
    </div>
  );
};

export default AdminMarriageCertificatePage;
