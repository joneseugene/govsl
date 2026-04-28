// 'use client'

// import { useRouter, useParams } from 'next/navigation'
// import { PressReleaseDetailUI } from '@/components/section/DetailSection/PressRelease/PressReleaseDetail'

// export default function PressReleasePage() {
//   const router = useRouter()
//   const { id } = useParams<{ id: string }>()

//   const pressRelease = mockPressReleaseDetails[id]

//   if (!pressRelease) {
//     return (
//       <div className="max-w-4xl mx-auto px-6 py-20 text-center">
//         <h1 className="text-2xl font-bold mb-4">Document not found</h1>
//         <p className="mb-6 text-gray-600">
//           The requested document could not be located.
//         </p>
//         <button
//           onClick={() => router.push('/')}
//           className="px-6 py-3 bg-[#003366] text-white rounded"
//         >
//           Go back home
//         </button>
//       </div>
//     )
//   }

//   return (
//     <PressReleaseDetailUI
//       pressRelease={pressRelease}
//       onBack={() => router.back()}
//     />
//   )
// }
