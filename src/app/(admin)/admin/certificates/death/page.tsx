import { getAllDeathCertificates } from "@/data/certificates/certificates";

import AdminDeathTable from "@/components/admin/tables/admin-death-table";

const AdminDeathCertificatePage = async () => {
  const deathCertificates = await getAllDeathCertificates();

  return (
    <div>
      <div className="overflow-x-auto">
        <AdminDeathTable deathCertificates={deathCertificates} />
      </div>
    </div>
  );
};

export default AdminDeathCertificatePage;
