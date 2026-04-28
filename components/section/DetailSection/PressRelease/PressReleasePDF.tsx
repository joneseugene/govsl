'use client'

import { useMemo } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer'
import { PressReleaseDetail } from '@/libs/interface/press.releases.interface'
import { formatDateSafe } from '@/libs/functions'

interface PressReleasePDFProps {
  pressRelease: PressReleaseDetail
}

interface PressReleasePDFComponent {
  (props: PressReleasePDFProps): null
  download: (pressRelease: PressReleaseDetail) => Promise<void>
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
  title: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  content: { fontSize: 10, lineHeight: 1.5, marginBottom: 10 },
  link: { color: '#003366', textDecoration: 'underline', marginBottom: 5 },
  contact: { marginTop: 5, fontSize: 10, marginBottom: 5 },
  footer: { marginTop: 25, paddingTop: 12 },
  qrContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  qrImage: { width: 60, height: 60 },
})

const PressReleasePDFDocument = ({ pressRelease }: { pressRelease: PressReleaseDetail }) => {
  const { mda, title, content, id, type, refNumber, contact, externalLink, date } = pressRelease
  const docType = type === 'Vacancy' ? 'VACANCY ANNOUNCEMENT' : 'ANNOUNCEMENT'
  const ministry = mda?.name || 'Government of Sierra Leone'
  const acronym = mda?.acronym || 'GoSL'

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
    typeof window !== 'undefined' ? `${window.location.origin}/${id}` : id
  )}`

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
          <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
            <Text>{formatDateSafe(date)}</Text>
            {refNumber && <Text>Ref: {refNumber}</Text>}
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.docType}>{docType}</Text>
        <Text style={styles.title}>{title || 'Untitled'}</Text>
        <View style={styles.divider} />

        <Text style={styles.content}>{content.replace(/\n/g, '\n\n')}</Text>
        {externalLink && <Text style={styles.link}>External Link: {externalLink}</Text>}
        {contact && <Text style={styles.contact}>Contact: {contact}</Text>}

        <View style={styles.divider} />
        <View style={styles.footer}>
          <Text style={{ fontSize: 9 }}>Government of Sierra Leone</Text>
          <Text style={{ fontSize: 9 }}>This is an official document. Scan the QR code to verify.</Text>
          <View style={styles.qrContainer}>
            <Image src={qrUrl} style={styles.qrImage} />
          </View>
        </View>
      </Page>
    </Document>
  )
}

const PressReleasePDF: PressReleasePDFComponent = (props) => {
  return null
}

PressReleasePDF.download = async (pressRelease: PressReleaseDetail) => {
  const docInstance = <PressReleasePDFDocument pressRelease={pressRelease} />
  const asPdf = pdf(docInstance)
  const blob = await asPdf.toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${pressRelease.id}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export { PressReleasePDF }
