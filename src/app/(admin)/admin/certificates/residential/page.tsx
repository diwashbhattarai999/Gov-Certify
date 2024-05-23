import { getAllResidentialCertificates } from "@/data/certificates/certificates";

import AdminResidentialTable from "@/components/admin/tables/admin-residential-table";

const AdminResidentialCertificatePage = async () => {
  const residentialCertificates = await getAllResidentialCertificates();

  return (
    <div>
      <div className="overflow-x-auto">
        <AdminResidentialTable
          residentialCertificates={residentialCertificates}
        />
      </div>
    </div>
  );
};

export default AdminResidentialCertificatePage;
