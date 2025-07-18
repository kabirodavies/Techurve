import { client } from '@/sanity/lib/client'
import { GET_ALL_SOLUTIONS, GET_ALL_SOLUTION_INDUSTRIES, GET_TESTIMONIALS } from '@/sanity/queries/query'
import SolutionsPageClient from './SolutionsPageClient'

export default async function SolutionsPage() {
  const solutions = await client.fetch(GET_ALL_SOLUTIONS)
  let industries = await client.fetch(GET_ALL_SOLUTION_INDUSTRIES)
  industries = ['All', ...industries]
  const testimonials = await client.fetch(GET_TESTIMONIALS)

  return <SolutionsPageClient solutions={solutions} industries={industries} testimonials={testimonials} />
} 