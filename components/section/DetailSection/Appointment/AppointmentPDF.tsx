'use client';

import { pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { AppointmentInterface } from '@/libs/interface/appointments.interface';
import { formatDate, getQRCode } from '@/libs/functions';
import { supabase_url } from '@/supabase/info';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  ref: { fontSize: 11, fontWeight: 'bold', color: '#003366' },

  logoWrap: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },

  titleCenter: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#007A33',
    marginVertical: 10,
  },

  section: { marginBottom: 12 },

  name: { fontSize: 11, fontWeight: 'bold', color: '#003366', marginTop: 12 },

  position: { fontSize: 10, color: '#555' },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'flex-end',
  },

  signatureBox: { width: 250 },

  signatureLine: {
    width: 200,
    height: 1,
    backgroundColor: '#999',
    marginBottom: 8,
  },

  signName: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#003366',
  },

  signTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#666',
  },

  dateRight: {
    fontSize: 10,
    textAlign: 'right',
  },

  copy: { marginTop: 15, fontSize: 9, color: '#444' },

  qrWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

  qr: { width: 70, height: 70 },
});

const AppointmentPDFDocument = ({
  notices,
  date,
}: {
  notices: AppointmentInterface[];
  date: string;
}) => {
  const first = notices[0];

  const qr = getQRCode(`${supabase_url}/appointment/${date}`);
  const coatOfArms = `/coat-of-arms.png`;

  // ALL APPOINTEES
  const allAppointees = notices.flatMap((n) => {
    const names = n.appointee_name?.split(',').map((x) => x.trim()) || [];
    const positions = n.position?.split(',').map((x) => x.trim()) || [];

    return names.map((name, i) => ({
      name,
      position: positions[i] || '',
    }));
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.ref}>Ref: {first.reference_number || 'N/A'}</Text>
        </View>

        <View style={styles.logoWrap}>
          <Image src={coatOfArms} style={styles.logo} />
        </View>

        <View style={styles.titleCenter}>
          <Text>GOVERNMENT OF SIERRA LEONE</Text>
          <Text>OFFICE OF THE PRESIDENT</Text>
          <Text>STATE HOUSE</Text>
        </View>

        <View style={styles.divider} />

        {/* BODY */}
        <View style={styles.section}>
          <Text>{first.description}</Text>
        </View>
        <View style={styles.section}>
          {allAppointees.map((a, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.name}>
                {i + 1}. {a.name}
              </Text>

              {a.position && <Text style={styles.position}>{a.position}</Text>}
            </View>
          ))}
        </View>

        {/* SIGNATURE + DATE */}
        <View style={styles.footerRow}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />

            <Text style={styles.signName}>{first.signatory_name}</Text>

            <Text style={styles.signTitle}>{first.signatory_title}</Text>
          </View>

          <Text style={styles.dateRight}>{formatDate(date)}</Text>
        </View>

        {/* COPY TO */}
        {first?.copy_to?.length ? (
          <View style={styles.copy}>
            <Text style={{ fontWeight: 'bold' }}>Copy:</Text>

            {first.copy_to.map((c, i) => (
              <Text key={i}>• {c}</Text>
            ))}
          </View>
        ) : null}

        {/* QR */}
        <View style={styles.qrWrap}>
          <Image src={qr} style={styles.qr} />
        </View>
      </Page>
    </Document>
  );
};

export const AppointmentPDF = {
  download: async (notices: AppointmentInterface[], date: string) => {
    const doc = <AppointmentPDFDocument notices={notices} date={date} />;
    const blob = await pdf(doc).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `appointment-${date}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  },
};
