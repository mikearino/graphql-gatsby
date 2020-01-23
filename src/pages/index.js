import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

// Pulling in data from graphql
export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        {/* Pulling in data from graphql and converting it to useable format */}
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {/* Mapping through the data with each edge  */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {/* Adding in the title  */}
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  {/* Add in the date  */}— {node.frontmatter.date}
                </span>
              </h3>
              {/* Add in the excerpt  */}
              <p>{node.excerpt}</p>
              {/* Add a link  */}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
//Using markdown remark to grab the markdown files
export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
