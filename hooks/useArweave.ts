import useSWR from 'swr';
import {AxiosError} from 'axios';
import {PublicConfiguration} from 'swr/dist/types';

import routes from '@/routes';
import {basicFetcher} from '@/fetchers';
import {GetTransactionRespT} from '@/types';

const defaultSwrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
} as PublicConfiguration;

export const useGetTransaction = (
  transactionId: string,
  swrOptions = defaultSwrOptions,
): {
  transaction: GetTransactionRespT | undefined;
  loading: boolean;
  error: AxiosError | undefined;
  refetch: () => void;
} => {
  const {data, error, mutate, isValidating} = useSWR<
    GetTransactionRespT,
    AxiosError
  >(routes.api.arweave.get(transactionId), basicFetcher, swrOptions);

  return {
    transaction: data,
    loading: (!error && !data) || isValidating,
    error: error,
    refetch: mutate,
  };
};