import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"

export default ({ data }) => {
  //Pull in data from markdownRemark
  const post = data.markdownRemark
  return (
    <Layout>
      {/* Pass in props to SEO for the title and description */}
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        {/* Add title and post  */}
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`
