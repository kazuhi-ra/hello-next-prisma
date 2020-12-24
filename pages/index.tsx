import type { GetServerSideProps } from 'next'

import { PostForm } from '../components/PostForm'
import prisma, { Post } from '../lib/prisma'

type Props = {
  posts: Pick<Post, 'id' | 'title' | 'content'>[]
}

const Index = (props: Props) => {
  return (
    <>
      <PostForm />
      <div>post count: {props.posts.length}</div>
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        )
      })}
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
    },
  })

  return {
    props: {
      posts,
    },
  }
}
