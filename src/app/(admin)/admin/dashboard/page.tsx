import { currentUser } from "@/lib/auth";

import { getAllUsers } from "@/data/user";
import {
  getAllBirthCertificates,
  getAllDeathCertificates,
  getAllMarriageCertificates,
  getAllResidentialCertificates,
} from "@/data/certificates/certificates";

import Dashboard from "@/components/admin/dashboard";

const DashboardPage = async () => {
  const users = await getAllUsers();

  // Fetch birth, death, and marriage certificates for the current user
  const birthCertificates = await getAllBirthCertificates();
  const deathCertificates = await getAllDeathCertificates();
  const marriageCertificates = await getAllMarriageCertificates();
  const residentialCertificates = await getAllResidentialCertificates();

  return (
    <Dashboard
      users={users?.length}
      birthCertificate={birthCertificates?.length ?? 0}
      deathCertificate={deathCertificates?.length ?? 0}
      marriageCertificate={marriageCertificates?.length ?? 0}
      residentialCertificate={residentialCertificates?.length ?? 0}
    />
  );
};

export default DashboardPage;
