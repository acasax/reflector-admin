import {
    useCallback,
    useEffect,
    useState
  }                     from 'react'
  import { useLoading } from 'application/hooks/useLoading'
  
  export type TUseQueryReturn = {
    data: any | undefined;
    refetch?: any
  }
  export const useQuery = (query: any, baseOptions: any): TUseQueryReturn => {
  
    const { setLoading, resetLoading } = useLoading()
    const [isMounted, setMounted] = useState<boolean>(false)
  
    const changeMount = useCallback(() => {
      setMounted(true)
    }, [setMounted])
  
    const _data = query({
      ...baseOptions,
      skip: baseOptions?.skip || !isMounted
    })
  
    const { data, refetch, loading } = _data || []
  
    useEffect(() => {
      changeMount()
    }, [changeMount])
  
    useEffect(() => {
      if (loading) {
        setLoading()
        return
      }
      const th = setTimeout(() => resetLoading(),150)
      return () => {
        clearTimeout(th)
      }
    }, [loading, resetLoading, setLoading])
  
    return {
      data,
      refetch
    }
  }
  