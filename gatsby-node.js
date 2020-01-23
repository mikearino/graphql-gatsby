//Path provides utilities for working with file and directory paths.
const path = require(`path`)
//Create usable file path
const { createFilePath } = require("gatsby-source-filesystem")
//To implement an API, export a function
//with the name of the API from gatsby-node.js.
exports.onCreateNode = ({ node, getNode, actions }) => {
  //For creating additional fields on nodes that are created by other
  //plugins
  const { createNodeField } = actions
  //If the nodes internal type is "MarkdownRemark", create a slug
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
//Add implementation of the createPages API which Gatsby calls so
//plugins can add pages.
//The graphql function call returns a Promise
exports.createPages = async ({ graphql, actions }) => {
  //pulling a method from createPages.
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  //Loop through each node and create a page with data.
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    //Create page with the path component and context.
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        //Data passed to context is available
        //in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
