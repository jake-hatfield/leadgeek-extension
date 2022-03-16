import { render } from '@testing-library/svelte';

// components
import WrapRouter from '@lib/routerHelpers/WrapRouter.svelte';

/**
 * Test-render a component that relies on some of svelte-navigator's features, inside a Router.

 * @param component The component you want to wrap in a Router

 * @param componentProps The props you want to pass to it

 * @param routerOptions Futher configuration (`onNavigate`, `withRoute`, `initialPathname`)
 *
 * @param options Options for testing library's `render` function
 *
 */

const renderWithRouter = (
	component,
	componentProps?: any,
	routerOptions?: any,
	options?: any
) =>
	render(WrapRouter, { component, componentProps, ...routerOptions }, options);

export default renderWithRouter;
