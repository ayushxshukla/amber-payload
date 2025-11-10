import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Fetch the home-featured collection (should only have 1 document)
    const homeFeatured = await payload.find({
      collection: 'home-featured',
      limit: 1,
    })

    // If no featured blogs configuration exists
    if (!homeFeatured.docs.length || !homeFeatured.docs[0].featuredBlogs) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: 'No featured blogs configured',
        },
        { status: 200 }
      )
    }

    const featuredBlogsConfig = homeFeatured.docs[0].featuredBlogs

    // Extract blog IDs from the featured blogs array
    const blogIds = featuredBlogsConfig
      .map((item: any) => {
        if (typeof item.blog === 'string') {
          return item.blog
        } else if (item.blog && typeof item.blog === 'object' && item.blog.id) {
          return item.blog.id
        }
        return null
      })
      .filter(Boolean)

    // Fetch the full blog post details
    const blogs = await payload.find({
      collection: 'blog-posts',
      where: {
        id: {
          in: blogIds,
        },
      },
      limit: 10,
    })

    // Create a map of blog posts by ID for easy lookup
    const blogMap = new Map(blogs.docs.map((blog) => [blog.id, blog]))

    // Build the response maintaining the order from featuredBlogs
    const orderedBlogs = blogIds
      .map((id) => {
        const blog = blogMap.get(id)
        if (!blog) return null

        return {
          id: blog.id,
          name: blog.name,
          slug: blog.slug,
          category:
            typeof blog.category === 'object'
              ? {
                id: blog.category.id,
                name: blog.category.name,
              }
              : blog.category,
          date: blog.date,
          mainImage:
            typeof blog.mainImage === 'object'
              ? {
                id: blog.mainImage.id,
                url: blog.mainImage.url,
                alt: blog.mainImage.alt,
                filename: blog.mainImage.filename,
              }
              : blog.mainImage,
          postBody: blog.postBody,
          readTime: blog.readTime,
        }
      })
      .filter(Boolean)

    return NextResponse.json(
      {
        success: true,
        data: orderedBlogs,
        count: orderedBlogs.length,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error fetching home featured blogs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch featured blogs',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
