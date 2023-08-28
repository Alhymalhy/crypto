<template>
  <CoinListTable />
</template>

<script setup lang="ts">
// import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
// import { getCoinList } from '@/services/api/coingecko/coins'
// import type { getCoinListParams } from '@/services/api/coingecko/coins'

// const {data} = await CGApi.ping.pingList()

// console.log(data)

// import { realworldApi } from '@/shared/api/realworld'
// import type { PetDto } from '@/shared/api/realworld/Api'

// const pet: PetDto = {
//   id: 0,
//   category: {
//     id: 0,
//     name: 'string'
//   },
//   name: 'doggie',
//   photoUrls: ['string'],
//   tags: [
//     {
//       id: 0,
//       name: 'string'
//     }
//   ],
//   status: 'available'
// }

// const { data } = await realworldApi.pet.addPet(pet)

// console.log(data)

// const params = ref<getCoinListParams>({
//   vs_currency: 'usd',
//   page: 1
// })

// const { isLoading, isError, data, error } = useQuery({
//   queryKey: ['coinList'],
//   queryFn: () => getCoinList(params.value)
// })
</script>

<style scoped></style>
