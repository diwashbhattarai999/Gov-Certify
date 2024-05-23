import { getAllBirthCertificates } from "@/data/certificates/certificates";

import AdminBirthTable from "@/components/admin/tables/admin-birth-table";

const AdminBirthCertificatePage = async () => {
  const birthCertificates = await getAllBirthCertificates();

  return (
    <div>
      <div className="overflow-x-auto">
        <AdminBirthTable birthCertificates={birthCertificates} />
      </div>
    </div>
  );
};

export default AdminBirthCertificatePage;
