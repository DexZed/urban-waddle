import { Suspense, type ReactNode } from 'react'
import Skeleton from '../components/skeleton'

type Props = {children: ReactNode}

function SuspenseWrapper({children}: Props) {
  return (
    <Suspense fallback={<Skeleton/>}>
      {children}
    </Suspense>
  )
}

export default SuspenseWrapper