import type { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'

type Props = {
  count: number
}

const Index = (props: Props) => {
  return <div>user count: {props.count}</div>
}

export default Index

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const count = await prisma.user.count()
  return {
    props: {
      count,
    },
  }
}
