import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // automatically disabled and excluded in production
import { minutesToMs } from '../utils/utils';

const customQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            cacheTime: minutesToMs(10), // default: 5 minutes
            staleTime: minutesToMs(5), // default: 0 (i.e. cached data is considered as stale immediately, always triggering a background refetch)
        },
    }, // default options for react-query hooks, but can also be configured separately for each query, by using their 3rd (options) parameter
}); // Docs: https://tanstack.com/query/v4/docs/guides/important-defaults + https://tanstack.com/query/v4/docs/guides/caching

interface Props {
    devtools: boolean;
    children: React.ReactElement;
}

export const CustomQueryClient: React.FC<Props> = ({ devtools, children }) => {
    return (
        <QueryClientProvider client={customQueryClient}>
            {devtools && <ReactQueryDevtools />}
            {children}
        </QueryClientProvider>
    );
};
