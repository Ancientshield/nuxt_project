<script setup lang="ts">
	import { showError } from '#app';
	const runtimeConfig = useRuntimeConfig();
	const apiKey = runtimeConfig.public.omdbApiKey;
	const route = useRoute();

	// 定義 OMDB API 回傳型別
	interface OmdbMovie {
		Title: string;
		Year: string;
		Rated: string;
		Released: string;
		Runtime: string;
		Genre: string;
		Director: string;
		Writer: string;
		Actors: string;
		Plot: string;
		Language: string;
		Country: string;
		Awards: string;
		Poster: string;
		Ratings: Array<{ Source: string; Value: string }>;
		Metascore: string;
		imdbRating: string;
		imdbVotes: string;
		imdbID: string;
		Type: string;
		DVD: string;
		BoxOffice: string;
		Production: string;
		Website: string;
		Response: string;
	}

	// 使用 useFetch 請求 OMDB API
	// console.log('route.params.id', route.params.id);
	const { data } = await useFetch<OmdbMovie>(
		`https://www.omdbapi.com/?apikey=${apiKey}&i=${route.params.id}`,
		{
			key: `/movies/${route.params.id}`, // 使用路由參數作為緩存鍵
			onResponse({ response }) {
				// console.log('onResponse', response._data);
				if (
					!response._data ||
					response._data.Response === 'False' ||
					response._data.Error === 'Incorrect IMDb ID.' ||
					response._data.Error === 'Movie not found!'
				) {
					throw showError({ statusCode: 404, statusMessage: 'Page Not Found' });
				}
			},
			onResponseError() {
				throw showError({
					statusCode: 500,
					statusMessage: 'Internal Server Error',
				});
			},
		}
	);
	// console.log('data', data.value);

	/* 使用 useAsyncData 請求不同 API，第一個參數 keh 若不改，則會一直請求緩存 */
	// const { data } = useAsyncData<OmdbMovie>(`/movies/${route.params.id}`, () => {
	// 	return $fetch<OmdbMovie>(
	// 		`http://www.omdbapi.com/?apikey=${apiKey}&i=${route.params.id}`
	// 	);
	// });

	// MetaScore 轉數字
	const metaScore = computed(() => Number(data.value?.Metascore ?? 0));
</script>

<template>
	<UCard v-if="data && data.Title" class="max-w-3xl mx-auto p-6">
		<!-- 電影封面 -->
		<img
			:src="data?.Poster"
			:alt="data?.Title"
			class="w-full max-w-xs mx-auto rounded shadow mb-6"
		/>

		<!-- 標題與年份 -->
		<div class="text-center mb-4">
			<h1 class="text-3xl font-bold">{{ data?.Title }}</h1>
			<div class="text-gray-500">{{ data?.Year }}・{{ data?.Runtime }}</div>
		</div>

		<!-- 導演、演員 -->
		<div class="mb-2">
			<span class="font-semibold">導演：</span>{{ data?.Director }}
		</div>
		<div class="mb-2">
			<span class="font-semibold">演員：</span>{{ data?.Actors }}
		</div>

		<!-- 劇情 -->
		<div class="mb-4">
			<span class="font-semibold">劇情：</span>
			<span>{{ data?.Plot }}</span>
		</div>

		<!-- Metascore 百分比進度條 -->
		<div class="mb-4">
			<span class="font-semibold">Metascore：</span>
			<UProgress
				v-model="metaScore"
				:max="100"
				class="w-40 inline-block align-middle"
			/>
			<span class="ml-2 text-green-700 font-bold">{{ data?.Metascore }}%</span>
		</div>

		<!-- imdbRating -->
		<div class="mb-4 flex items-center gap-2">
			<span class="font-semibold">IMDb：</span>
			<span class="text-gray-600">{{ data?.imdbRating }}/10</span>
			<span class="text-gray-400">({{ data?.imdbVotes }} 票)</span>
		</div>

		<!-- 語言、國家 -->
		<div class="mb-2">
			<span class="font-semibold">語言：</span>{{ data?.Language }}
		</div>
		<div><span class="font-semibold">國家：</span>{{ data?.Country }}</div>
	</UCard>
	<div v-else class="text-center py-20">
		<h1 class="text-4xl font-bold mb-4">404 Not Found</h1>
		<p class="text-gray-500">找不到你要的電影</p>
		<NuxtLink to="/" class="text-primary underline mt-4 block">回首頁</NuxtLink>
	</div>
</template>

<style scoped></style>
