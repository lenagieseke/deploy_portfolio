import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components
        // you can override markdown elements here later, for example:
        // h1: props => <h1 className="text-3xl font-bold" {...props} />
        // https://en.nextjs.im/docs/app/guides/mdx#using-custom-styles-and-components
    }
}