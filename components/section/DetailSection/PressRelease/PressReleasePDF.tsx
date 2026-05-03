'use client';

import { formatDate, getQRCode } from '@/libs/functions';
import { PressReleaseInterface } from '@/libs/interface/press.releases.interface';
import { supabase_url } from '@/supabase/info';
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';

interface PressReleasePDFProps {
  pressRelease: PressReleaseInterface;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  header: { marginBottom: 15 },
  acronym: { fontSize: 20, fontWeight: 'bold', color: '#0033A0' },
  ministry: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 2 },
  subText: { fontSize: 10, marginTop: 2 },
  refRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  divider: { width: '100%', height: 3, backgroundColor: '#007A33', marginVertical: 12 },
  docType: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  title: { fontSize: 11, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  contentWrapper: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignSelf: 'center',
  },
  content: { fontSize: 10, lineHeight: 1.6, textAlign: 'justify' },
  link: { color: '#003366', textDecoration: 'underline', marginBottom: 5 },
  contact: { marginTop: 5, fontSize: 10, marginBottom: 5 },
  footer: { marginTop: 25, paddingTop: 12 },
  qrContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  qrImage: { width: 60, height: 60 },
  smallText: { fontSize: 8, color: '#333', lineHeight: 1.2 },
  smallMeta: { fontSize: 8, color: '#555', marginBottom: 1 },
});

const PressReleasePDFDocument = ({ pressRelease }: PressReleasePDFProps) => {
  const { id, title, mdas, content, legacy_id, contact_info, date } = pressRelease;
  const ministry = mdas?.name || 'Government of Sierra Leone';
  const acronym = mdas?.acronym || 'GoSL';
  const reference = legacy_id || 'reference_no';

  // SAFE QR (no window dependency)
  const qrUrl = getQRCode(`${supabase_url}/${id}`);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <View>
            <Text style={styles.acronym}>{acronym}</Text>
            <Text style={styles.ministry}>{ministry}</Text>
            <Text style={styles.subText}>Public Relations Unit</Text>
            <Text style={styles.subText}>Republic of Sierra Leone, West Africa</Text>
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: 4 }}>
            <Text style={styles.smallMeta}>{formatDate(date)}</Text>
            {reference && <Text style={styles.smallMeta}>Ref: {reference}</Text>}
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.title}>{title || 'Untitled'}</Text>
        <View style={styles.divider} />

        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{content}</Text>
        </View>

        {contact_info && <Text style={styles.contact}>Contact: {contact_info}</Text>}

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={{ fontSize: 9 }}>Government of Sierra Leone</Text>
          <Text style={{ fontSize: 9 }}>
            This is an official document. Scan the QR code to verify.
          </Text>

          <View style={styles.qrContainer}>
            <Image src={qrUrl} style={styles.qrImage} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

/* =========================
   EXPORT HANDLER ONLY
========================= */

export const PressReleasePDF = {
  download: async (pressRelease: PressReleaseInterface) => {
    const docInstance = <PressReleasePDFDocument pressRelease={pressRelease} />;
    const asPdf = pdf(docInstance);
    const blob = await asPdf.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${pressRelease.id}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  },
};
